import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { useCart } from 'containers/products/lib/hooks';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../components/Button';
import { monoDarkBlack } from '../../styles/colorPalette';
import MainLayout from '../layouts/main';
import ProductItem from './components/ProductItem';

const useStyles = makeStyles()((theme) => ({
  typography: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginTop: '24px',
    marginBottom: '17px',
  },
}));

const Checkout = () => {
  const { classes } = useStyles();
  const {
    carts,
    loading,
    isCheckedAll,
    checkIsCheckedCart,
    toggleCheckCartById,
    checkedsCartsIds,
    updateQuantityByProductId,
    filteredCartsByChecked,
    deleteProducts,
    toggleCheckAllCarts,
  } = useCart();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <MainLayout sx={{ paddingTop: 4 }}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography className={classes.typography} variant="h4">
          Список закупок
        </Typography>
        {filteredCartsByChecked.length !== 0 && (
          <Button onClick={() => deleteProducts({ all: 1 })} variant={'text'}>
            Очистить список
          </Button>
        )}
      </Box>
      {filteredCartsByChecked.length !== 0 ? (
        <>
          <FormControlLabel
            onChange={toggleCheckAllCarts}
            sx={{ marginBottom: '10px' }}
            control={<Checkbox checked={isCheckedAll} />}
            label={isCheckedAll ? 'Отменить выделение' : 'Выбрать всё'}
          />
          <Stack spacing={3} mb={4}>
            {filteredCartsByChecked.map((cart, idx) => {
              const hideSellers = cart.checked && filteredCartsByChecked[idx + 1]?.checked;
              return (
                <ProductItem
                  handleUpdateQuantity={updateQuantityByProductId}
                  ids={checkedsCartsIds}
                  carts={carts}
                  hideSellers={hideSellers}
                  id={cart.id}
                  handleChecked={toggleCheckCartById}
                  checked={checkIsCheckedCart(cart.id)}
                  key={cart.id}
                  product={{ ...cart.product, quantity: cart.quantity }}
                  onDelete={() => deleteProducts({ union_product_ids: [cart.product.id] })}
                />
              );
            })}
          </Stack>
        </>
      ) : (
        <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 600 }}>
            <Stack spacing={3} display={'flex'} alignItems={'center'}>
              <img src="/img/logo_only.svg" alt="" style={{ width: 155 }} />
              <Typography component={'h1'} sx={{ fontWeight: 700, fontSize: 24 }}>
                Список закупок пуст
              </Typography>
              <Typography align={'center'}>Выберите товары на витрине и добавьте их в список закупок</Typography>
              {/*<Button>Выбрать товары</Button>*/}
            </Stack>
          </Box>
        </Box>
      )}
    </MainLayout>
  );
};

export default Checkout;
