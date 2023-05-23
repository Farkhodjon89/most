import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '../../../../components/Button';
import EmptyInfo from '../../../../components/EmptyInfo';
import WhiteContainer from '../../../../components/WhiteContainer';
import SellerLayout from '../../../layouts/seller';
import { ProductsFilterParams, useProductInteractions } from '../../../products/lib/hooks';
import DealsHeader from './components/DealsHeader';
import DealsTable from './components/DealsTable';
import FilterGroup from './components/Filters/FilterGroup';

const Deals = () => {
  const [{ products, loading, productsMeta }, { fetchProducts }] = useProductInteractions();
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFilterChange = useCallback(
    (params: ProductsFilterParams) => {
      setFilters({ ...filters, ...params });
    },
    [filters],
  );

  const handleSave = useCallback(() => Object.values(filters).length && fetchProducts(filters), [filters]);

  const handleClear = useCallback(() => {
    if (!Object.values(filters).length) return;
    setFilters({});
    fetchProducts({});
  }, [filters]);

  return (
    <SellerLayout>
      <Grid mb={3} item xs={12}>
        <DealsHeader title={'Сделки'} price={'25000000'} />
      </Grid>
      {products?.length !== 0 ? (
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={9}>
            <WhiteContainer>
              <DealsTable meta={productsMeta} loading={loading} onFilterChange={onFilterChange} deals={products} />
            </WhiteContainer>
          </Grid>
          <Grid item xs={3}>
            <WhiteContainer>
              <FilterGroup
                filters={filters}
                handleClear={handleClear}
                handleSave={handleSave}
                onFilterChange={onFilterChange}
                title={'Фильтровать'}
              />
            </WhiteContainer>
          </Grid>
        </Grid>
      ) : (
        <WhiteContainer>
          <EmptyInfo
            title={'Вы пока не совершили ни одной сделки'}
            description={
              'Чтобы совершить сделку, необходимо выбрать интересующий товар, добавить его в закупку и отправить запрос поставщикам'
            }
            Buttons={[
              <Button key={1} onClick={() => router.push('/')}>
                Перейти на главную
              </Button>,
            ]}
            image={'/img/dealsImg.svg'}
          />
        </WhiteContainer>
      )}
    </SellerLayout>
  );
};

export default Deals;
