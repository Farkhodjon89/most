import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import cx from 'classnames';
import { Loader } from 'components/Loaders';
import { PageTitle } from 'components/Typography';
import WhiteContainer from 'components/WhiteContainer';
import { STATUSES } from 'containers/products/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button, SecondaryButton } from '../../../../../components/Button';
import DealsModal from '../../../../../components/DealsModal';
import BillIcon from '../../../../../components/icons/BillIcon';
import CheckedStatus from '../../../../../components/icons/CheckedStatus';
import CubeIcon from '../../../../../components/icons/CubeIcon';
import DoubleCircleIcon from '../../../../../components/icons/DoubleCircleIcon';
import ShopIcon from '../../../../../components/icons/ShopIcon';
import { TextField } from '../../../../../components/Textfield';
import { useSession } from '../../../../../context/UserContext';
import {
  blue,
  mainBlue900,
  mainGreen900,
  monoDarkBlack,
  monoDarkGrey,
  monoLightGrey2,
  monoWhite,
} from '../../../../../styles/colorPalette';
import SellerLayout from '../../../../layouts/seller';
import { useProductInteractions } from '../../../../products/lib/hooks';
import Chat from './Chat';
import CheckStatus from './components/CheckStatus';
import DealConditions from './components/DealConditions';
import DealsContent from './components/DealsContent';
import DealsHeader from './components/DealsHeader';
import DealTotal from './components/DealTotal';
import OrdersCard from './components/OrdersCard';
import ProductItem from './components/ProductItem';
import StatusesWrapper from './components/StatusesWrapper';

const items = [
  {
    id: 0,
    img: '/square.png',
    price: '₽90.000-120.000 ',
    description: 'Зерно первого сорта. Лучшее в Индии',
    text: 'Мин. заказ 1 шт.',
  },
  {
    id: 1,
    img: '/square.png',
    price: '₽90.000-120.000 ',
    description: 'Зерно первого сорта. Лучшее в Индии',
    text: 'Мин. заказ 1 шт.',
  },
  {
    id: 2,
    img: '/square.png',
    price: '₽90.000-120.000 ',
    description: 'Зерно первого сорта. Лучшее в Индии',
    text: 'Мин. заказ 1 шт.',
  },
  {
    id: 3,
    img: '/square.png',
    price: '₽90.000-120.000 ',
    description: 'Зерно первого сорта. Лучшее в Индии',
    text: 'Мин. заказ 1 шт.',
  },
  {
    id: 4,
    img: '/square.png',
    price: '₽90.000-120.000 ',
    description: 'Зерно первого сорта. Лучшее в Индии',
    text: 'Мин. заказ 1 шт.',
  },
];

const useStyles = makeStyles()((theme) => ({
  leftArrow: {
    fontSize: theme.typography.pxToRem(12),
    color: mainBlue900,
  },
  warningIcon: {
    fontSize: theme.typography.pxToRem(20),
    color: mainGreen900,
  },
  downArrowIcon: {
    fontSize: theme.typography.pxToRem(12),
    color: mainBlue900,
  },
  plusIcon: {
    fontSize: theme.typography.pxToRem(10),
  },
  alert: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '20px',
    color: monoDarkBlack,
    backgroundColor: monoWhite,
    borderRadius: '16px',
  },
  dealTitle: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
  date: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: blue,
  },
  accordion: {
    '& 	.MuiAccordionSummary-content': {
      flexDirection: 'column',
    },
    '& 	.MuiAccordionDetails-root': {
      'height': '472px',
      'overflowY': 'auto',
      '&::-webkit-scrollbar': {
        width: 4,
      },
      '&::-webkit-scrollbar-track': {
        background: '#F5F5F7',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
      },
      '&::-webkit-scrollbar-thumb': {
        background: monoLightGrey2,
        borderRadius: 10,
      },
    },
    '& .MuiAccordionDetails-root': {
      padding: '8px 0',
    },
    '&.Mui-expanded .MuiAccordionSummary-root': {
      'position': 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        height: `1px`,
        width: 'calc(100% + 65px)',
        left: -32,
        backgroundColor: monoLightGrey2,
      },
    },
  },
}));

const dealsHeaderData = [
  {
    id: 0,
    name: 'Компания',
    icon: <ShopIcon />,
    value: 'No data',
  },
  {
    id: 1,
    name: 'Кол-во товаров',
    icon: <CubeIcon />,
    value: 'No data',
  },
  {
    id: 2,
    name: 'Предоплата',
    icon: <DoubleCircleIcon />,
    value: 'No data',
  },
  {
    id: 3,
    name: 'Сумма',
    icon: <BillIcon />,
    value: 'No data',
  },
];

const notifyBuyer = 'Согласуйте условия сделки в чате с продавцом.';
const notifySeller =
  'Покупатель ожидает вашего ответа. Согласуйте условия сделки в чате, отредактируйте их и нажмите «Договор предсогласован»';

const termsBuyer = 'Условия доставки';
const termsSeller = 'Согласованы условия доставки';

const Seller: FC<any> = () => {
  const { classes } = useStyles();
  const { me } = useSession();
  const router = useRouter();
  const [{ product, productsToAdd, loading }, { fetchProductById, fetchProductsToAdd, fetchUpdateProduct }] =
    useProductInteractions();
  const [isBuyer, setIsBuyer] = useState(false);
  const [notifyLabel, setNotifyLabel] = useState('Loading..');
  const [dealsHeaderContent, setDealsHeaderContent] = useState(dealsHeaderData);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<STATUSES | string>(product?.status || '');
  const [added, setAdded] = useState<number[]>([]);
  const [productsToSave, setProductsToSave] = useState<Array<any>>([]);
  const [searchProducts, setSearchToProducts] = useState('');

  // loading
  const [isLoadingSendStatus, setLoadingSendStatus] = useState(false);
  const [isLoadingCancelStatus, setLoadingCancelStatus] = useState(false);
  const [isLoadingSave, setLoadingSave] = useState(false);

  const approvedBySeller = useMemo(
    () => product?.statuses?.some((item) => item.status === STATUSES['approved_by_seller']),
    [product],
  );
  const approvedByBuyer = useMemo(
    () => product?.statuses?.some((item) => item.status === STATUSES['approved_by_buyer']),
    [product],
  );

  const isBlockSendStatus = isBuyer ? approvedByBuyer : approvedBySeller;

  const termsTitle = isBuyer ? termsBuyer : termsSeller;

  const handleClose = () => {
    setOpen(false);
    setAdded([]);
  };

  useEffect(() => {
    fetchProductsToAdd();
  }, []);

  useEffect(() => {
    if (product?.orderProducts?.length) {
      setProductsToSave(product?.orderProducts);
    }
  }, [product]);

  useEffect((): any => {
    if (!product) {
      return;
    }
    if (isBuyer) {
      if (approvedByBuyer) {
        router.push(`/seller/deals/seller/signin?dealId=${router.query.dealId}`);
        return;
      }
    } else if (approvedBySeller) {
      router.push(`/seller/deals/seller/signin?dealId=${router.query.dealId}`);
      return;
    }
    if (product.statuses)
      if (product.buyerId === me.id) {
        setNotifyLabel(notifyBuyer);
        setIsBuyer(true);
      } else {
        setNotifyLabel(notifySeller);
      }

    setDealsHeaderContent(
      dealsHeaderData.map((item) => {
        if (item.id === 0) {
          return {
            ...item,
            value: product.sellerCompanyName,
          };
        }

        if (item.id === 1) {
          return {
            ...item,
            value: String(product.orderProducts.length),
          };
        }

        if (item.id === 2) {
          return {
            ...item,
            value: String(product.prepaymentAmount),
          };
        }

        if (item.id === 3) {
          return {
            ...item,
            value: String(product.orderSum),
          };
        }

        return item;
      }),
    );
  }, [product, approvedBySeller, approvedByBuyer]);

  const handleCancelDeal = useCallback(() => {
    const newStatus = isBuyer ? STATUSES['rejected_by_buyer'] : STATUSES['rejected_by_seller'];

    if (!product || status === newStatus || product?.status === (newStatus as STATUSES)) {
      return;
    }
    setLoadingCancelStatus(true);
    fetchUpdateProduct(
      {
        orderId: product.id,
        status: newStatus as any,
      },
      (status) => {
        setLoadingCancelStatus(false);
        if (status) {
          setStatus(newStatus);
          toast.success('Успешно отменено!');
          fetchProductById(router.query.dealId as string);
        } else {
          toast.error('Не удалось отправить запрос!');
        }
      },
    );
  }, [product, fetchProductById]);

  const handleSendStatus = useCallback(() => {
    const newStatus = isBuyer ? STATUSES['approved_by_buyer'] : STATUSES['approved_by_seller'];

    if (!product || status === newStatus || product?.status === (newStatus as any)) {
      return;
    }
    setLoadingSendStatus(true);
    fetchUpdateProduct(
      {
        orderId: product.id,
        status: newStatus as any,
      },
      (status) => {
        setLoadingSendStatus(false);
        if (status) {
          setStatus(newStatus);
        } else {
          toast.error('Не удалось отправить запрос!');
        }
      },
    );
  }, [product]);

  useEffect(() => {
    fetchProductById(router.query.dealId as string);
  }, [fetchProductById]);

  const handleAddProducts = useCallback(() => {
    if (!added.length) {
      setProductsToSave([]);
    }
    if (added.length && Array.isArray(productsToAdd)) {
      const ids = added.filter((id) => !productsToSave.some((item) => item.productId === id));
      const list: any = productsToSave.map((item) => {
        if (added.some((id) => id === item.productId)) {
          return {
            ...item,
            quantity: item.quantity + 1,
            updatedByFront: true,
            price: item.productPrice,
          };
        }

        return item;
      });
      const newList = ids.map((id) => {
        const item = productsToAdd?.find((item) => item.id === id);
        return {
          ...item,
          product_id: item.id,
          quantity: item.quantity || 1,
          price: Number(item.price),
          productPrice: Number(item.price),
          prepayment_amount: 0,
          productImg: item.photos ? item.photos[0]?.originalUrl : '',
          productName: item.name,
          newProduct: true,
        };
      });
      setProductsToSave([...list, ...newList]);
      setAdded([]);
    }
    setOpen(false);
  }, [added, productsToAdd, productsToSave]);

  const handleSaveProducts = useCallback(() => {
    const toUpdate = productsToSave.filter((item) => item.updatedByFront);
    const toCreate = productsToSave.filter((item) => item.newProduct);

    if (product && (toUpdate.length || toCreate.length)) {
      setLoadingSave(true);
      fetchUpdateProduct(
        {
          orderId: product.id,
          added_products: toCreate,
          updated_products: toUpdate,
        },
        (status) => {
          setLoadingSave(false);
          if (status) {
            setProductsToSave([]);
            fetchProductById(router.query.dealId as string);
          }
        },
      );
    }
  }, [added, product, productsToSave]);

  if (!router.query.dealId) {
    router.push(`/seller/deals`);
    return null;
  }

  if (approvedBySeller && approvedByBuyer) {
    router.push(`/seller/deals/seller/signin?dealId=${router.query.dealId}`);
    return;
  }

  return (
    <SellerLayout>
      <Stack spacing={2}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={1} display={'flex'} alignItems={'center'}>
            <Link href={`/seller/deals`}>
              <a>
                <IconButton>
                  <i className={cx('ui_left-arrow', classes.leftArrow)}></i>
                </IconButton>
              </a>
            </Link>
            <PageTitle text="Сделка №12345" />
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: monoDarkGrey }}>
              {product?.orderSum} ₽ · Подписание договора
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1} display={'flex'} alignItems={'center'}>
            <Button loading={isLoadingCancelStatus} onClick={handleCancelDeal} extraSmall variant={'outlined'}>
              Отклонить сделку
            </Button>
            <Button
              disabled={isBlockSendStatus}
              loading={isLoadingSendStatus}
              onClick={handleSendStatus}
              extraSmall
              small
            >
              Договор предсогласован
            </Button>
          </Stack>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                className={classes.alert}
                variant="outlined"
                severity="success"
                icon={<i className={cx('ui_warning', classes.warningIcon)}></i>}
              >
                {notifyLabel}
              </Alert>
              <StatusesWrapper>
                <CheckStatus
                  color={approvedByBuyer ? mainGreen900 : undefined}
                  icon={approvedByBuyer ? <CheckedStatus /> : undefined}
                  text={'Согласовано покупателем'}
                />
                <CheckStatus
                  icon={approvedBySeller ? <CheckedStatus /> : undefined}
                  color={approvedBySeller ? mainGreen900 : undefined}
                  text={'Согласовано продавцом'}
                />
              </StatusesWrapper>

              <WhiteContainer>
                <Accordion className={classes.accordion} disableGutters elevation={0} square>
                  <DealsHeader date={product?.creationDate} data={dealsHeaderContent} />
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                      <Loader />
                    </div>
                  ) : (
                    <DealsContent
                      onChangeProduct={(id, params) =>
                        setProductsToSave(
                          productsToSave.map((item) => (item.id === id ? { ...item, ...params } : item)),
                        )
                      }
                      product={product}
                      items={productsToSave.filter((product) => !product.deleted)}
                    />
                  )}
                  <SecondaryButton
                    onClick={() => setOpen(!open)}
                    extraSmall
                    startIcon={<i className={cx('ui_plus', classes.plusIcon)}></i>}
                    fullWidth
                  >
                    Добавить товар
                  </SecondaryButton>
                  <DealsModal
                    handleAddProducts={handleAddProducts}
                    added={added}
                    title={'Добавить товар'}
                    open={open}
                    handleClose={handleClose}
                  >
                    <Box>
                      <Typography mb={1} sx={{ fontSize: 16, fontWeight: 600, lineHeight: '24px' }}>
                        Ваши товары
                      </Typography>
                      <TextField
                        mb={1}
                        size={'extraSmall'}
                        onChange={(e) => setSearchToProducts(e.target.value)}
                        value={searchProducts}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton tabIndex={-1} aria-label="toggle password visibility" size="large">
                                <i className="ui_search" style={{ fontSize: 16 }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Поиск..."
                      />
                    </Box>
                    {Array.isArray(productsToAdd) &&
                      productsToAdd
                        .filter((item) => item.name.toLowerCase().includes(searchProducts.toLowerCase()))
                        .map((item) => <OrdersCard added={added} setAdded={setAdded} item={item} key={item.id} />)}
                  </DealsModal>
                  <DealTotal
                    loading={isLoadingSave}
                    isShowSaveButton={Boolean(productsToSave.length)}
                    handleSaveProducts={handleSaveProducts}
                    sum={product?.orderSum}
                  />
                </Accordion>
              </WhiteContainer>
              <WhiteContainer>
                <Accordion disableGutters elevation={0} square>
                  <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
                    <Stack sx={{ verticalAlign: 'middle' }} spacing={1}>
                      {!isBuyer && <Typography className={classes.date}>{product?.creationDate}</Typography>}
                      <Typography
                        sx={{
                          fontSize: 20,
                          lineHeight: '24px',
                          fontWeight: 700,
                          marginBottom: 0,
                          color: monoDarkBlack,
                        }}
                        variant={'h4'}
                        mb={2}
                      >
                        {termsTitle}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider />
                    <Typography mt={2} sx={{ fontSize: 16, lineHeight: '24px', fontWeight: 600, color: monoDarkBlack }}>
                      Дождитесь выбора адреса доставки покупателем.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </WhiteContainer>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Chat />
          </Grid>
        </Grid>
      </Stack>
    </SellerLayout>
  );
};

export default Seller;
