import { Box, Grid, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { OverlayLoader } from '../../../components/Loaders';
import { companyTypes } from '../../../const';
import { useStore } from '../../../context/StoreContext';
import { mainBlue900, monoDarkBlack, monoGrey } from '../../../styles/colorPalette';
import { pluralize } from '../../../utils/common';
import MainLayout from '../../layouts/main';
import FilterCheckbox from '../components/Filters/experemental/FIlterCheckbox';
import FilterInput from '../components/Filters/experemental/FilterInput';
import FilterRangeInput from '../components/Filters/experemental/FilterRangeInput';
import MyReactImageMagnify from '../components/MyReactImageMagnify';
import ProductInfo from '../components/ProductInfo';
import PurchaseInfo from '../components/PurchaseInfo';
import SellersTable from '../components/SellersTable';
import { useCart, useSellers } from '../lib/hooks';

const useStyles = makeStyles()((theme) => ({
  productTitle: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginBottom: '12px',
  },
  modal: {
    position: 'absolute',
    top: '0',
    zIndex: 9,
    left: '33%',
    width: '200px',
  },
  smallText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '32px',
    color: monoGrey,
  },
  searchSuppliers: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    marginBottom: '20px',
  },
}));

const images = [
  {
    original: '/productImage.png',
    thumbnail: '/productImage.png',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ViewProduct = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const productId = parseInt(router.query.slug);
  const {
    sellers,
    loading: sellerLoading,
    onFilterChange,
    queryParams,
    meta,
    fastRequest,
  } = useSellers({ productId, pushUrl: `/products/${productId}` });
  const [{ data, loading, error }] = useAxios(`/store/union-products/${productId}`);
  const { commonUnits } = useStore();
  useEffect(() => {
    fastRequest([productId]);
  }, []);

  if (loading) {
    return <OverlayLoader />;
  }
  const product = data?.data?.unionProduct;
  const sellingTerms = [];
  if (queryParams['is_prepayment']) {
    sellingTerms.push(1);
  }
  if (queryParams['is_postpayment']) {
    sellingTerms.push(1);
  }

  return (
    <MainLayout sx={{ paddingTop: 4 }}>
      <Typography mb={1} className={classes.productTitle}>
        {product.name}
      </Typography>
      <Typography mb={1} className={classes.searchSuppliers}>
        Найдено {pluralize(product.countSeller, ['поставщик', 'поставщика', 'поставщиков'])}
      </Typography>
      <Grid container spacing={2} sx={{ position: 'relative' }}>
        <Grid item xs={4}>
          <ImageGallery
            items={data.data.unionProduct.photos.map((photo) => ({
              original: photo.originalUrl,
              thumbnail: photo.originalUrl,
            }))}
            thumbnailPosition="left"
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay={false}
            showNav={false}
            renderItem={(item) => <MyReactImageMagnify item={item} />}
          />
        </Grid>
        <Grid container className={classes.modal} spacing={2}>
          <Grid item xs={12}>
            <div id="portal" />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <ProductInfo title={'Характеристики'} attributes={data.data.attributes} />
          <Link href={'#characteristics'}>
            <a>
              <Button variant={'text'} small>
                Все характеристики
              </Button>
            </a>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <PurchaseInfo product={product} />
        </Grid>
      </Grid>
      <Grid mt={4} mb={4} container spacing={2}>
        <Grid item xs={12}>
          <Typography component={'div'} className={classes.productTitle}>
            Поставщики{' '}
            <Box display={'inline'} className={classes.smallText}>
              {meta?.total}
            </Box>
          </Typography>
        </Grid>

        <Grid item xs={2.5}>
          <Stack spacing={3}>
            <FilterCheckbox
              attribute={{
                values: queryParams['u[1]'] || [],
                name: 'u[1]',
                title: 'Ед. измерения поставки',
                options: commonUnits.map((item) => ({ value: item.id, label: item.name })),
              }}
              onAttributeChange={onFilterChange([productId])}
            />
            <FilterCheckbox
              chooseOne
              attribute={{
                values: queryParams['company_type'],
                name: 'company_type',
                title: 'Тип поставщика',
                options: companyTypes,
              }}
              onAttributeChange={onFilterChange([productId])}
            />
            <FilterRangeInput
              title={'Цена за единицу товара (₽)'}
              attributes={[
                { value: queryParams['min_price'] || '', name: 'min_price' },
                { value: queryParams['max_price'] || '', name: 'max_price' },
              ]}
              onAttributeChange={onFilterChange([productId])}
            />
            <FilterRangeInput
              title={'Срок отгрузки (часы)'}
              attributes={[
                { value: queryParams['min_shipment_time'], name: 'min_shipment_time' },
                { value: queryParams['max_shipment_time'], name: 'max_shipment_time' },
              ]}
              onAttributeChange={onFilterChange([productId])}
            />
            <FilterCheckbox
              chooseOne
              attribute={{
                values: queryParams['is_prepayment'] || [],
                name: 'is_prepayment',
                title: '',
                options: [{ value: 1, label: 'Товар с предоплатой' }],
              }}
              onAttributeChange={onFilterChange([productId])}
            />
            {queryParams['is_prepayment'] ? (
              <FilterInput
                attribute={{
                  value: queryParams['prepayment_value'],
                  name: 'prepayment_value',
                  title: 'Сумма предоплаты',
                }}
                onAttributeChange={onFilterChange([productId])}
              />
            ) : null}
            <FilterCheckbox
              chooseOne
              attribute={{
                values: queryParams['is_postpayment'] || [],
                name: 'is_postpayment',
                title: '',
                options: [{ value: 1, label: 'Товар с постоплатой' }],
              }}
              onAttributeChange={onFilterChange([productId])}
            />
            {/*<PaymentTerms queryParams={queryParams} onAttributeChange={onFilterChange([productId])} />*/}
          </Stack>
        </Grid>

        <Grid item xs={9.5}>
          <SellersTable
            sellers={sellers}
            loading={sellerLoading}
            onFilterChange={onFilterChange}
            queryParams={queryParams}
            ids={[productId]}
            meta={meta}
          />
        </Grid>
      </Grid>
      {/*<ProductsSlider title={'Похожие предложения'} />*/}
      <Grid mt={5} container>
        <Grid item xs={6}>
          <ProductInfo id={'characteristics'} title={'Характеристики'} attributes={data.data.attributes} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ViewProduct;
