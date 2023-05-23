import { Box, Paper, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { useSession } from '../../../context/UserContext';
import { monoDarkBlack, monoLightGrey2 } from '../../../styles/colorPalette';
import { getShipmentDays } from '../../../utils/common';

const useStyles = makeStyles()((theme) => ({
  root: {
    cursor: 'pointer',
    boxShadow: 'none',
    border: `1px solid ${monoLightGrey2}`,
    borderRadius: '16px',
    padding: '24px',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
    marginBottom: '8px',
  },
  icon: {
    fontSize: theme.typography.pxToRem(15),
    marginRight: '8px',
  },
  title: {
    marginBottom: '17px',
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
  },
}));

const PurchaseInfo = ({ product }: any) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { companyId, me } = useSession();
  const [addedToCart, setAddedToCart] = useState(false);

  const [{ loading }, addToCart] = useAxios(
    { url: `/sales/${companyId}/cart/${product.id}`, method: 'post' },
    { manual: true },
  );

  const handleAddToCart = () => {
    if (me) {
      addToCart({
        data: { quantity: 1 },
      })
        .then(() => {
          toast.success('Товар успешно добавлен в список закупок');
        })
        .catch(() => {});
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant={'h3'}>
        {product.minPriceForOneProduct} - {product.maxPriceForOneProduct} ₽
      </Typography>
      <Box>
        <Box className={classes.box}>
          <i className={cx('ui_notes', classes.icon)}></i>
          <Typography>мин. заказ: {product.minOrder}</Typography>
        </Box>
        <Box className={classes.box}>
          <i className={cx('ui_cube', classes.icon)}></i>
          <Typography>единица измерения товара: {product.units[0].name}</Typography>
        </Box>
        <Box className={classes.box}>
          <i className={cx('ui_truck', classes.icon)}></i>
          <Typography>минимальный срок отгрузки товара: {getShipmentDays(product.minShipmentTime)}</Typography>
        </Box>
      </Box>
      <Button
        onClick={handleAddToCart}
        sx={{ marginTop: '14px' }}
        variant={addedToCart ? 'outlined' : 'contained'}
        fullWidth
        loading={loading}
        startIcon={<i className={!addedToCart ? cx('ui_bag-filled', classes.icon) : cx('ui_tick', classes.icon)}></i>}
      >
        Добавить в закупку
      </Button>
    </Paper>
  );
};

export default PurchaseInfo;
