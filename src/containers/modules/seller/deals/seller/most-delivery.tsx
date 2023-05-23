import { Accordion, AccordionSummary, Box, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { PageTitle } from 'components/Typography';
import WhiteContainer from 'components/WhiteContainer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { SecondaryButton } from '../../../../../components/Button';
import DealsModal from '../../../../../components/DealsModal';
import BillIcon from '../../../../../components/icons/BillIcon';
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
import DealsContent from './components/DealsContent';
import DealsHeader from './components/DealsHeader';
import DealTotal from './components/DealTotal';
import OrdersCard from './components/OrdersCard';

const data = [
  {
    id: 0,
    name: 'Компания',
    icon: <ShopIcon />,
    value: 'ООО «Зёрна России»',
  },
  {
    id: 1,
    name: 'Кол-во товаров',
    icon: <CubeIcon />,
    value: '11 223',
  },
  {
    id: 2,
    name: 'Предоплата',
    icon: <DoubleCircleIcon />,
    value: '12 %',
  },
  {
    id: 3,
    name: 'Сумма',
    icon: <BillIcon />,
    value: '123 122 200 ₽',
  },
];

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

const MostDelivery: FC<any> = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
              122 200 ₽ · Исполнение договора
            </Typography>
          </Stack>
          {/*<Stack direction={'row'} spacing={1} display={'flex'} alignItems={'center'}>*/}
          {/*  <Button extraSmall variant={'outlined'}>*/}
          {/*    Отклонить сделку*/}
          {/*  </Button>*/}
          {/*  <Button onClick={() => router.push(`/seller/deals/seller/signin`)} extraSmall small>*/}
          {/*    Договор подписан*/}
          {/*  </Button>*/}
          {/*</Stack>*/}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {/*<Alert*/}
              {/*  className={classes.alert}*/}
              {/*  variant="outlined"*/}
              {/*  severity="success"*/}
              {/*  icon={<i className={cx('ui_warning', classes.warningIcon)}></i>}*/}
              {/*>*/}
              {/*  Отправьте груз после получения денег за товар. Сделка будет совершена когда покупатель подтвердит*/}
              {/*  получение товара.*/}
              {/*</Alert>*/}
              {/*<StatusesWrapper>*/}
              {/*  <CheckStatus text={'Оплата получена'} />*/}
              {/*  <CheckStatus text={'Товар получен'} />*/}
              {/*</StatusesWrapper>*/}

              <WhiteContainer></WhiteContainer>

              <WhiteContainer>
                <Stack spacing={1}>
                  <Typography className={classes.date}>23.10.2022</Typography>
                  <Typography
                    sx={{ fontSize: 20, lineHeight: '24px', fontWeight: 700, color: monoDarkBlack }}
                    variant={'h4'}
                    mb={2}
                  >
                    Договоры подписаны
                  </Typography>
                </Stack>
              </WhiteContainer>

              <WhiteContainer>
                <Accordion className={classes.accordion} disableGutters elevation={0} square>
                  <DealsHeader data={data} />
                  <DealsContent items={items} />
                  <SecondaryButton
                    onClick={() => setOpen(!open)}
                    extraSmall
                    startIcon={<i className={cx('ui_plus', classes.plusIcon)}></i>}
                    fullWidth
                  >
                    Добавить товар
                  </SecondaryButton>
                  <DealsModal title={'Добавить товар'} open={open} handleClose={handleClose}>
                    <Box>
                      <Typography mb={1} sx={{ fontSize: 16, fontWeight: 600, lineHeight: '24px' }}>
                        Ваши товары
                      </Typography>
                      <TextField
                        mb={1}
                        size={'extraSmall'}
                        // onChange={handleChangeSearch}
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
                    {items.map((item) => (
                      <OrdersCard item={item} key={item.id} />
                    ))}
                  </DealsModal>
                  <DealTotal />
                </Accordion>
              </WhiteContainer>
              <WhiteContainer>
                <Accordion disableGutters elevation={0} square>
                  <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
                    <Stack spacing={1}>
                      <Typography className={classes.date}>23.10.2022</Typography>
                      <Typography
                        sx={{ fontSize: 20, lineHeight: '24px', fontWeight: 700, color: monoDarkBlack }}
                        variant={'h4'}
                        mb={2}
                      >
                        Согласованы условия доставки
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                </Accordion>

                {/*<Divider />*/}
                {/*<Typography mt={2} sx={{ fontSize: 16, lineHeight: '24px', fontWeight: 600, color: monoDarkBlack }}>*/}
                {/*  Дождитесь выбора адреса доставки покупателем.*/}
                {/*</Typography>*/}
              </WhiteContainer>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <WhiteContainer>Chat</WhiteContainer>
          </Grid>
        </Grid>
      </Stack>
    </SellerLayout>
  );
};

export default MostDelivery;
