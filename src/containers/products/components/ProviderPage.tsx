import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { ToggleButton } from '../../../components/Button';
import CheckoutTable from '../../../components/CheckoutTable';
import Chip from '../../../components/Chip';
import { mainBlue400, mainBlue900, monoDarkBlack, monoDarkGrey, monoLightGrey1 } from '../../../styles/colorPalette';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import CompanyDescription from './CompanyDescription';
import FilterInput from './Filters/FilterInput';
import FilterRange from './Filters/FilterRange';
import ProviderData from './ProviderData';

const useStyles = makeStyles()((theme) => ({
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
  title: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
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
    color: monoDarkGrey,
    fontSize: 14,
    cursor: 'pointer',
    height: '100%',
    paddingRight: theme.spacing(1),
  },
}));

const categories = [
  {
    id: 0,
    name: 'ТВ и мультимедиа',
    value: 'ТВ и мультимедиа',
    link: '/',
  },
  {
    id: 1,
    name: 'Смартфоны и гаджеты',
    value: 'Смартфоны и гаджеты',
    link: '/',
  },
  {
    id: 2,
    name: 'Компьютеры',
    value: 'Компьютеры',
    link: '/',
  },
  {
    id: 3,
    name: 'Офис и сеть',
    value: 'Офис и сеть',
    link: '/',
  },
  {
    id: 4,
    name: 'Мультимедиа',
    value: 'Мультимедиа',
    link: '/',
  },
  {
    id: 5,
    name: 'Гаджеты',
    value: 'Гаджеты',
    link: '/',
  },
  {
    id: 6,
    name: 'Компьютеры',
    value: 'Компьютеры',
    link: '/',
  },
  {
    id: 7,
    name: 'Сеть',
    value: 'Сеть',
    link: '/',
  },
];

const ProviderPage = () => {
  const [viewType, setViewType] = useState('products');
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ProviderData />
      </Grid>
      <Grid item xs={8}>
        <CompanyDescription title={'Описание компании'} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h4">
          Все товары
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={3}>
          <Filter title={'Ед. измерения товара'} />
          <FilterInput title={'Минимальный заказ'} />
          <FilterRange title={'Цена за единицу (₽)'} />
          <FilterRange title={'Сроки доставки (дней)'} />
          <Filter title={'Условия оплаты'} />
        </Stack>
      </Grid>
      <Grid item xs={9}>
        {/*<FilterGroup title={'Товары для отображения'} categories={categories} />*/}
        <Grid container alignItems={'center'} justifyContent="space-between" mb={3} spacing={2}>
          <Grid item xs={8}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component={'ul'}
            >
              <Chip label="Размер компании: Малый" onDelete={() => console.log('remove action')} />
              <Chip label="Рейтинг надежности: Средний, Высокий" onDelete={() => console.log('remove action')} />
              <Chip label="Регион отгрузки: Москва, Московская область" onDelete={() => console.log('remove action')} />
              <Chip label="Сроки доставки: От 4 до 10 дней" onDelete={() => console.log('remove action')} />
              <Chip label="Сбросить фильтры" onDelete={() => console.log('remove action')} customColor={mainBlue900} />
            </Box>
          </Grid>
          <Grid item xs={9.5}>
            <Stack direction={'row'} spacing={2}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: 'relative' }}>
                  <Typography onClick={handleClick} className={classes.label}>
                    Сотрировать по: Цене <i className="ui_down-arrow" style={{ fontSize: 12 }} />
                  </Typography>
                  {open ? (
                    <Box className={classes.content}>
                      <MenuItem value={10}>Товары</MenuItem>
                      <MenuItem value={10}>Тендеры</MenuItem>
                      <MenuItem value={10}>Сделки</MenuItem>
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: 'relative' }}>
                  <Typography onClick={handleClick} className={classes.label}>
                    Отображать по:{' '}
                    <Typography style={{ color: mainBlue900 }} component={'span'}>
                      15
                    </Typography>{' '}
                    <i className="ui_down-arrow" style={{ fontSize: 12 }} />
                  </Typography>
                  {open ? (
                    <Box className={classes.content}>
                      <MenuItem value={10}>Товары</MenuItem>
                      <MenuItem value={10}>Тендеры</MenuItem>
                      <MenuItem value={10}>Сделки</MenuItem>
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </Stack>
          </Grid>
          <Grid item xs={2.5}>
            <Stack direction={'row'} display={'flex'} justifyContent={'flex-end'}>
              <ToggleButton viewType={viewType} setViewType={setViewType} />
            </Stack>
          </Grid>
        </Grid>
        {viewType === 'products' ? <ProductList products={products} /> : <CheckoutTable />}
      </Grid>
    </Grid>
  );
};

export default ProviderPage;
