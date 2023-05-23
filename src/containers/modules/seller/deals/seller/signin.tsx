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
import { useProductInteractions } from 'containers/products/lib/hooks';
import { STATUSES } from 'containers/products/lib/types';
import { useSession } from 'context/UserContext';
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
import Chat from './Chat';
import CheckStatus from './components/CheckStatus';
import DealsContent from './components/DealsContent';
import DealsHeader from './components/DealsHeader';
import DealTotal from './components/DealTotal';
import OrdersCard from './components/OrdersCard';
import StatusesWrapper from './components/StatusesWrapper';

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

const notifyBuyer = 'Подпишите договор и нажмите «Договор подписан» для перехода к исполненеию сделки.';
const notifySeller = 'Подпишите договор и нажмите «Договор подписан» для перехода к исполненеию сделки.';

const signedDeal =
  'Отправьте груз после получения денег за товар. \n Сделка будет завершена когда покупатель подтвердит получение товара.';

const termsBuyer = 'Условия доставки';
const termsSeller = 'Согласованы условия доставки';

const SignIn: FC<any> = () => {
  const { classes } = useStyles();
  const { me } = useSession();
  const router = useRouter();
  const [{ product, loading, productsToAdd }, { fetchProductById, fetchProductsToAdd, fetchUpdateProduct }] =
    useProductInteractions();
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [notifyLabel, setNotifyLabel] = useState('Loading..');
  const [dealsHeaderContent, setDealsHeaderContent] = useState(dealsHeaderData);
  const [added, setAdded] = useState<number[]>([]);
  const [productsToSave, setProductsToSave] = useState<Array<any>>([]);
  const [searchProducts, setSearchToProducts] = useState('');

  // loading
  const [isLoadingSendStatus, setLoadingSendStatus] = useState(false);
  const [isLoadingCancelStatus, setLoadingCancelStatus] = useState(false);
  const [isLoadingConfirmPay, setLoadingConfirmPay] = useState(false);
  const [isLoadingSave, setLoadingSave] = useState(false);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<STATUSES | string>(product?.status || '');
  const termsTitle = isBuyer ? termsBuyer : termsSeller;

  const signedBySeller = useMemo(
    () => product?.statuses?.some((item) => item.status === STATUSES['signed_by_seller']),
    [product],
  );
  const signedByBuyer = useMemo(
    () => product?.statuses?.some((item) => item.status === STATUSES['signed_by_buyer']),
    [product],
  );

  useEffect(() => {
    fetchProductsToAdd();
  }, []);

  useEffect(() => {
    if (product?.orderProducts?.length) {
      setProductsToSave(product?.orderProducts);
    }
  }, [product]);

  const currentUserStatus = isBuyer ? signedByBuyer : signedBySeller;

  const handleClose = () => {
    setOpen(false);
    setAdded([]);
  };

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
    const newStatus = isBuyer ? STATUSES['signed_by_buyer'] : STATUSES['signed_by_seller'];

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
          toast.success('Договор успешно подписан!');
        } else {
          toast.error('Не удалось отправить запрос!');
        }
      },
    );
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }
    if (product.buyerId === me.id) {
      setNotifyLabel(notifyBuyer);
      setIsBuyer(true);
    } else {
      setNotifyLabel(notifySeller);
    }

    if (signedBySeller && signedByBuyer) {
      setNotifyLabel(signedDeal);
    }

    if (product.sellerId === me.id) {
      setIsSeller(true);
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
          if (status) {
            setLoadingSave(false);
            setProductsToSave([]);
            fetchProductById(router.query.dealId as string);
          }
        },
      );
    }
  }, [added, product, productsToSave]);

  const handleConfirmPay = useCallback(() => {
    const newStatus = isBuyer ? STATUSES['payment_sent'] : STATUSES['payment_received'];

    if (!product || status === newStatus || product?.status === (newStatus as any)) {
      return;
    }
    setLoadingConfirmPay(true);
    fetchUpdateProduct(
      {
        orderId: product.id,
        status: newStatus as any,
      },
      (status) => {
        setLoadingConfirmPay(false);
        if (status) {
          setStatus(newStatus);
          toast.success('Статус успешно изменен!');
        } else {
          toast.error('Не удалось отправить запрос!');
        }
      },
    );
  }, [product]);

  const handleConfirmProduct = useCallback(() => {
    const newStatus = isBuyer ? STATUSES['shipment_received'] : STATUSES['shipment_sent'];

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
          toast.success('Статус успешно изменен!');
        } else {
          toast.error('Не удалось отправить запрос!');
        }
      },
    );
  }, [product]);

  const renderButtons = useCallback(() => {
    if (signedByBuyer && signedBySeller) {
      if (isBuyer) {
        return (
          <>
            <Button loading={isLoadingConfirmPay} onClick={handleConfirmPay} extraSmall>
              Оплата отправлена
            </Button>
            <Button
              disabled={product?.statuses.some((item) => item.status === STATUSES['shipment_received'])}
              loading={isLoadingSendStatus}
              onClick={handleConfirmProduct}
              extraSmall
              variant={'outlined'}
              small
            >
              Товар получен
            </Button>
          </>
        );
      }

      return (
        <>
          <Button loading={isLoadingConfirmPay} onClick={handleConfirmPay} extraSmall>
            Оплата получена
          </Button>
          <Button
            disabled={product?.statuses.some((item) => item.status === STATUSES['shipment_sent'])}
            loading={isLoadingSendStatus}
            onClick={handleConfirmProduct}
            extraSmall
            variant={'outlined'}
            small
          >
            Товар отправлен
          </Button>
        </>
      );
    }

    return (
      <>
        <Button loading={isLoadingCancelStatus} onClick={handleCancelDeal} extraSmall variant={'outlined'}>
          Отклонить сделку
        </Button>
        <Button disabled={currentUserStatus} loading={isLoadingSendStatus} onClick={handleSendStatus} extraSmall small>
          Договор подписан
        </Button>
      </>
    );
  }, [currentUserStatus, isLoadingConfirmPay, isLoadingSendStatus]);

  if (!router.query.dealId) {
    router.push(`/seller/deals`);
    return null;
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
            {renderButtons()}
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
                  color={signedBySeller ? mainGreen900 : undefined}
                  icon={signedBySeller ? <CheckedStatus /> : undefined}
                  text={'Подписано покупателем'}
                />
                <CheckStatus
                  color={signedByBuyer ? mainGreen900 : undefined}
                  icon={signedByBuyer ? <CheckedStatus /> : undefined}
                  text={'Подписано продавцом'}
                />
              </StatusesWrapper>
              {signedByBuyer && signedBySeller && (
                <WhiteContainer>
                  <Typography className={classes.date}>{product?.creationDate}</Typography>
                  <Typography mt={2} sx={{ fontSize: 16, lineHeight: '24px', fontWeight: 600, color: monoDarkBlack }}>
                    Договоры подписаны
                  </Typography>
                </WhiteContainer>
              )}
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
                    isShowSaveButton={Boolean(productsToSave.length)}
                    handleSaveProducts={handleSaveProducts}
                    sum={product?.orderSum}
                    loading={isLoadingSave}
                  />
                </Accordion>
              </WhiteContainer>
              {signedByBuyer && signedBySeller ? null : (
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
                      <Typography
                        mt={2}
                        sx={{ fontSize: 16, lineHeight: '24px', fontWeight: 600, color: monoDarkBlack }}
                      >
                        Дождитесь выбора адреса доставки покупателем.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </WhiteContainer>
              )}
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

export default SignIn;
