import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import Counter from '../../../components/Counter';
import DeleteIconDanger from '../../../components/icons/DeleteIcon';
import { companyTypes } from '../../../const';
import { useStore } from '../../../context/StoreContext';
import { mainBlue900, monoBgGreyLight, monoDarkBlack, monoGrey } from '../../../styles/colorPalette';
import { MadFormatter } from '../../../utils/common';
import FilterCheckbox from '../../products/components/Filters/experemental/FIlterCheckbox';
import FilterInput from '../../products/components/Filters/experemental/FilterInput';
import FilterRangeInput from '../../products/components/Filters/experemental/FilterRangeInput';
import SellersTable from '../../products/components/SellersTable';
import { useSellers } from '../../products/lib/hooks';

const useStyles = makeStyles()((theme) => ({
  root: {
    'padding': '12px',
    'backgroundColor': monoBgGreyLight,
    'borderRadius': '18px',
    'cursor': 'pointer',
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    '& .MuiFormControlLabel-root': {
      marginRight: '0',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '8px',
  },
  price: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
  },
  text: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoGrey,
  },
  activeIcon: {
    transform: 'rotate(180deg)',
    transition: '0.3s',
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    cursor: 'pointer',
  },
  img: {
    borderRadius: theme.spacing(2),
  },
}));

const ProductItem = ({
  product,
  ids,
  carts,
  handleChecked,
  checked,
  id,
  hideSellers,
  handleUpdateQuantity,
  onDelete,
}: any) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(product.quantity || 0);
  const { commonUnits } = useStore();

  const {
    sellers,
    loading: sellerLoading,
    onFilterChange,
    queryParams,
    meta,
    request,
    fastRequest,
  } = useSellers({ productIds: null, pushUrl: '/checkout' });

  const handleChangeCounter = useCallback(
    (nextCounter: number) => {
      setCounter(nextCounter);
      handleUpdateQuantity(product.id, nextCounter);
    },
    [setCounter],
  );

  useEffect(() => {
    if (product.quantity !== counter) {
      setCounter(counter);
    }
  }, [product.quantity]);

  useEffect(() => {
    if (checked && !hideSellers && ids?.length > 1) {
      request(ids);
    } else if (open) {
      fastRequest([product.id]);
    }
  }, [open, ids]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={classes.root}>
        <Box sx={{ display: 'flex' }}>
          <FormControlLabel onChange={() => handleChecked(id)} checked={checked} control={<Checkbox />} />
          <Image
            alt={'Product'}
            width={72}
            height={72}
            className={classes.img}
            src={product.photos?.[0]?.originalUrl || '/img/default_image.svg'}
          />
          <Box className={classes.cardContent}>
            <Typography className={classes.price}>
              {MadFormatter.toCurrency(product.minPriceForOneProduct)} -{' '}
              {MadFormatter.toCurrency(product.maxPriceForOneProduct, '')}
            </Typography>
            <Typography className={classes.description}>{product.name}</Typography>
            <Typography className={classes.text}>Мин. заказ: {product.minOrder}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Counter setCounter={handleChangeCounter} counter={counter} />
          <IconButton onClick={onDelete}>
            <DeleteIconDanger />
          </IconButton>
        </Box>
      </Box>
      {!hideSellers ? (
        <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
              <Typography onClick={handleClick} className={classes.label}>
                <i
                  className={open ? cx('ui_down-arrow', classes.activeIcon) : 'ui_down-arrow'}
                  style={{ fontSize: 12, marginRight: '10px' }}
                />
                Есть у {ids?.length > 1 ? sellers.length : product.countSeller} поставщика(-ов)
              </Typography>
              {open ? (
                <Grid mt={3} container spacing={2}>
                  <Grid item xs={2.5}>
                    <Stack spacing={3}>
                      <FilterCheckbox
                        attribute={{
                          values: queryParams['u[1]'] || [],
                          name: 'u[1]',
                          title: 'Ед. измерения поставки',
                          options: commonUnits.map((item) => ({ value: item.id, label: item.name })),
                        }}
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                      <FilterCheckbox
                        chooseOne
                        attribute={{
                          values: queryParams['company_type'],
                          name: 'company_type',
                          title: 'Тип поставщика',
                          options: companyTypes,
                        }}
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                      <FilterRangeInput
                        title={'Цена за единицу товара (₽)'}
                        attributes={[
                          { value: queryParams['min_price'], name: 'min_price' },
                          { value: queryParams['max_price'], name: 'max_price' },
                        ]}
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                      <FilterRangeInput
                        title={'Срок отгрузки (часы)'}
                        attributes={[
                          { value: queryParams['min_shipment_time'], name: 'min_shipment_time' },
                          { value: queryParams['max_shipment_time'], name: 'max_shipment_time' },
                        ]}
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                      <FilterCheckbox
                        chooseOne
                        attribute={{
                          values: queryParams['is_prepayment'] || [],
                          name: 'is_prepayment',
                          title: '',
                          options: [{ value: 1, label: 'Товар с предоплатой' }],
                        }}
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                      {queryParams['is_prepayment'] ? (
                        <FilterInput
                          attribute={{
                            value: queryParams['prepayment_value'],
                            name: 'prepayment_value',
                            title: 'Сумма предоплаты',
                          }}
                          onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
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
                        onAttributeChange={onFilterChange(ids?.length ? ids : [product.id])}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={9.5}>
                    <SellersTable
                      ids={ids?.length ? ids : [product.id]}
                      sellers={sellers}
                      loading={sellerLoading}
                      onFilterChange={onFilterChange(ids?.length ? ids : [product.id])}
                      queryParams={queryParams}
                      carts={carts.map((item) =>
                        item.product.id === product.id ? { ...item, quantity: counter } : item,
                      )}
                      meta={meta}
                    />
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          </ClickAwayListener>
        </Stack>
      ) : null}
    </>
  );
};

export default ProductItem;
