import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import { SimpleModalV2 } from 'components/modals';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { useSession } from '../../../context/UserContext';
import {
  helpYellow,
  mainBlue900,
  mainGreen900,
  monoBgGreyLight,
  monoBlack,
  monoDarkBlack,
  monoGrey,
} from '../../../styles/colorPalette';
import { getShipmentDays, pluralize } from '../../../utils/common';
import AuthorizationModal from './AuthorizationModal';

const useStyles = makeStyles()((theme) => ({
  root: {
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    // 'maxWidth': '206px',
    'padding': '8px',
    'cursor': 'pointer',
    'border': 'none',
    'borderRadius': '18px',
    'boxShadow': 'none',
    'color': monoDarkBlack,

    '&:hover': {
      backgroundColor: monoBgGreyLight,
    },

    '&	.MuiCardActions-root': {
      padding: 'unset',
      marginTop: '15px',
    },
  },
  cardContent: {
    'marginTop': '8px',
    'padding': 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  image: {
    width: '100%',
    height: '190px',
    borderRadius: '16px',
  },
  productName: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: '20px',
    marginBottom: '12px',
    whiteSpace: 'pre-line',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    color: monoDarkBlack,
  },
  minOrder: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '14px',
    color: monoGrey,
    marginBottom: '9px',
  },
  starFilled: {
    color: helpYellow,
    marginRight: '5px',
    fontSize: theme.typography.pxToRem(12),
  },
  priceInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  price: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoBlack,
    marginTop: '2px',
    marginBottom: '5px',
  },
  truckIcon: { marginRight: '4px', color: mainGreen900, fontSize: theme.typography.pxToRem(14) },
  chatting: {
    // marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: mainGreen900,
  },
  typography: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    textAlign: 'center',
    color: mainBlue900,
  },
  startIcon: {
    '> i': {
      fontSize: '16px !important',
    },
  },
  endIcon: {
    fontSize: '16px !important',
  },
}));

export const ProductCard = ({ product, slider }: any) => {
  const { classes } = useStyles();
  const [filled, setFilled] = useState(false);

  const [showUnverifyModal, setShowUnverifyModal] = useState(false);
  const [showVerifyInProgressModal, setShowVerifyInProgressModal] = useState(false);
  const [showUnregisteredUserModal, setShowUnregisteredUserModal] = useState(false);

  const router = useRouter();
  const { companyId, me } = useSession();
  const [, addToCart] = useAxios({ url: `/sales/${companyId}/cart/${product.id}`, method: 'post' }, { manual: true });
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    if (me) {
      if (me.companies[0].status === 'draft') {
        setShowUnverifyModal(true);
      } else if (me.companies[0].status === 'on_verification') {
        setShowVerifyInProgressModal(true);
      } else {
        addToCart({
          data: { quantity: 1 },
        })
          .then(() => {
            toast.success('Товар успешно добавлен в список закупок');
          })
          .catch(() => {});
      }
    } else {
      setShowUnregisteredUserModal(true);
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <NextLink href={`/products/${product.id}`}>
        <a>
          <CardMedia
            style={{ height: slider === 'slider' ? '140px' : '' }}
            className={classes.image}
            image={product.images?.[0]?.originalUrl || '/img/default_image.svg'}
          />
          <CardContent className={classes.cardContent}>
            <Box className={classes.priceInfo}>
              <Typography className={classes.price}>
                {product.minPriceForOneProduct} - {product.maxPriceForOneProduct} ₽
              </Typography>
            </Box>
            <Typography className={classes.productName}>{product.name}</Typography>
            {slider !== 'slider' && (
              <div className={classes.chatting}>
                <i className={cx('ui_truck', classes.truckIcon)}></i>
                <Typography>{getShipmentDays(product.minShipmentTime)}</Typography>
              </div>
            )}
            <Typography className={classes.minOrder}>
              Мин. заказ ({product.quantityUnit?.name}): {product.minOrder}
            </Typography>
          </CardContent>
        </a>
      </NextLink>

      <CardActions>
        <Button
          sx={{ marginBottom: '12px' }}
          fullWidth
          small
          onClick={me ? handleAddToCart : handleModal}
          variant={!filled ? 'outlined' : 'contained'}
          color={'grey'}
        >
          {/*!filled ?*/ 'Добавить в закупку' /* : 'Добавлено в закупку'*/}
        </Button>
        <AuthorizationModal handleClose={handleClose} open={open} />
      </CardActions>
      <Typography className={classes.typography}>
        {pluralize(product.countSeller, ['продавец', 'продавца', 'продавцов'])}
      </Typography>
      <SimpleModalV2
        open={showUnverifyModal}
        onSubmit={() => router.push('/seller/profile')}
        onCancel={() => setShowUnverifyModal(false)}
        title={'Вы не можете добавить товар в закупку'}
        desc={
          'Для просмотра подробной информации о товаре и предложениях поставщиков и уточнить условия закупки необходимо пройти проверку вашего профиля'
        }
        submitLabel={'Перейти в профиль'}
        loading={false}
        cancelLabel={'Отмена'}
      />
      <SimpleModalV2
        open={showVerifyInProgressModal}
        onSubmit={() => router.push('/seller/profile')}
        onCancel={() => setShowVerifyInProgressModal(false)}
        title={'Вы не можете добавить товар в закупку'}
        desc={'Данные вашего профиля проходят проверку. Когда она завершится вы сможете добавлять товары в закупку'}
        submitLabel={'Перейти в профиль'}
        loading={false}
        cancelLabel={'Отмена'}
      />
      <SimpleModalV2
        open={showUnregisteredUserModal}
        onSubmit={() => router.push('/auth/login')}
        onSubmit2={() => router.push('/auth/register')}
        onCancel={() => setShowUnregisteredUserModal(false)}
        title={'Вы не можете добавить товар в закупку'}
        desc={
          'Для просмотра подробной информации о товаре и предложениях поставщиков необходимо войти или зарегистрироваться'
        }
        submitLabel={'Войти'}
        loading={false}
        cancelLabel={'Зарегистрироваться'}
      />
    </Card>
  );
};

export default ProductCard;
