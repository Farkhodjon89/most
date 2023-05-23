import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { Button } from '../../../components/Button';
import EmptyInfo from '../../../components/EmptyInfo';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, queryParams, onClearParams }: any) => {
  const router = useRouter();
  if (loading) {
    return <Typography>Loading...</Typography>;
  }c
  return products.length !== 0 ? (
    <Grid container rowSpacing={5} spacing={2}>
      {products.map((product: any) => (
        <Grid key={product.id} item xs={2.4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  ) : products.length === 0 && queryParams.ids ? (
    <EmptyInfo
      title={'Нет подходящих товаров'}
      description={'Выберите другие фильтры для поиска'}
      Buttons={[
        <Button key={1} onClick={() => onClearParams && onClearParams(queryParams?.categoryId)}>
          Сбросить фильтры
        </Button>,
      ]}
    />
  ) : (
    <EmptyInfo
      title={'В этой категории пока нет товаров'}
      description={'Вы можете вернуться назад, и выбрать другую категорию для поиска'}
      Buttons={[
        <Button key={1} onClick={() => router.push('/catalogs/1')}>
          Назад
        </Button>,
      ]}
    />
  );
};

export default ProductList;
