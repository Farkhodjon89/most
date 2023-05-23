import { Box, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import Breadcrumbs from '../../components/Breadcrumbs';
import { ToggleButton } from '../../components/Button';
import Pagination from '../../components/Pagination';
import ProductList from '../../containers/products/components/ProductList';
import { useStore } from '../../context/StoreContext';
import { mainBlue400, mainBlue900, monoDarkGrey, monoGrey, monoLightGrey1, monoWhite } from '../../styles/colorPalette';
import MainLayout from '../layouts/main';
import { getCategoryByIdV2 } from '../modules/seller/products/lib/utils';
import CatalogTable from './components/CatalogTable';
import FilterAttributes from './components/Filters';
import FilterCategory from './components/Filters/FilterCategory';
import FilterGroup from './components/Filters/FilterGroup';
import FilterInput from './components/Filters/FilterInput';
import FilterPage from './components/Filters/FilterPage';
import FilterRange from './components/Filters/FilterRange';
import FilterSelected from './components/Filters/FilterSelected';
import FilterUnit from './components/Filters/FilterUnit';
import { useProducts } from './lib/hooks';

export const useStyles = makeStyles()((theme) => ({
  content: {
    'color': monoDarkGrey,
    'position': 'absolute',
    'top': 30,
    'right': 0,
    'left': 0,
    'borderRadius': theme.spacing(2),
    'padding': theme.spacing(1),
    'width': 150,
    'backgroundColor': 'white',
    'boxShadow': '0px 6px 20px rgba(0, 0, 0, 0.08);',
    'maxHeight': 200,
    'overflow': 'hidden',
    'overflowY': 'auto',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: monoLightGrey1,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: monoDarkGrey,
      borderRadius: 10,
    },
  },
  button: {
    'padding': `${theme.spacing(1)} ${theme.spacing(2)}`,
    ':hover': {
      backgroundColor: mainBlue400,
    },
    'borderRadius': 12,
    'color': mainBlue900,
  },
  label: {
    color: monoGrey,
    fontSize: 14,
    cursor: 'pointer',
    height: '100%',
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    // borderRight: `2px solid ${monoLightGrey1}`,
  },
  showMore: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
  },
}));

const Products = () => {
  const [viewType, setViewType] = useState('products');
  const { branches, attributes } = useStore();
  const { query } = useRouter();

  const categoryId = parseInt(query.categoryId);

  const { products, loading, meta, onCategoryChange, onFilterChange, onFilterRemove, onClearParams, queryParams } =
    useProducts();

  const currentCategory = getCategoryByIdV2(branches, categoryId);

  return (
    <MainLayout sx={{ paddingTop: 0 }}>
      <Breadcrumbs />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontSize: 26, fontWeight: 700 }}>
            {currentCategory?.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2}>
            <FilterCategory categoryTitle={currentCategory?.name} onCategoryChange={onCategoryChange} />
            <FilterUnit onFilterChange={onFilterChange} queryParams={queryParams} />
            <FilterInput onFilterChange={onFilterChange} title={'Минимальный заказ'} queryParams={queryParams} />
            <FilterRange
              title={'Цена за единицу (₽)'}
              minName={'min_price'}
              maxName={'max_price'}
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <FilterAttributes attributes={attributes} queryParams={queryParams} onFilterChange={onFilterChange} />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <FilterGroup title={'Товары для отображения'} queryParams={queryParams} onFilterChange={onFilterChange} />
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={8}>
              <FilterSelected queryParams={queryParams} onFilterRemove={onFilterRemove} />
            </Grid>
            {products.length !== 0 ? (
              <Grid item xs={2.5}>
                <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <FilterPage queryParams={queryParams} onFilterChange={onFilterChange} />
                  <ToggleButton viewType={viewType} setViewType={setViewType} />
                </Stack>
              </Grid>
            ) : null}
          </Grid>
          {viewType === 'products' ? (
            <ProductList
              onClearParams={onClearParams}
              queryParams={queryParams}
              loading={loading}
              products={products}
            />
          ) : (
            <CatalogTable loading={loading} products={products} />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={4} mb={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {meta && meta.lastPage > 1 && products.length > 0 && (
                <Pagination
                  backgroundColor={monoWhite}
                  count={meta.lastPage}
                  page={meta.currentPage}
                  onChange={(e, value) => onFilterChange('page', value)}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Products;
