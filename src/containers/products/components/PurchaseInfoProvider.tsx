import { Box, Paper, Typography } from '@mui/material';
import cx from 'classnames';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import Counter from '../../../components/Counter';
import Select from '../../../components/Select';
import { monoBlack, monoDarkBlack, monoGrey, monoLightGrey1, monoWhite } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    cursor: 'pointer',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    padding: '24px',
  },
  characteristic: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    'position': 'relative',
    'marginBottom': '16px',
    '&:before': {
      content: '""',
      height: '0.5px',
      backgroundColor: monoLightGrey1,
      position: 'absolute',
      width: '100%',
      top: '50%',
      zIndex: 1,
    },
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
  deliveryText: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoBlack,
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  truckIcon: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(14),
    marginRight: '8px',
  },
  typography: {
    fontSize: theme.typography.pxToRem(14),
    color: monoBlack,
    padding: '0 8px',
    backgroundColor: monoWhite,
    position: 'relative',
    zIndex: 2,
  },
}));

const PurchaseInfoProvider = ({ price }: any) => {
  const { classes } = useStyles();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant={'h3'}>
        {price} руб.
      </Typography>
      <Box className={classes.characteristic}>
        <Typography style={{ color: monoDarkBlack }} className={classes.typography}>
          Кол-во товаров
        </Typography>
        <Box sx={{ position: 'relative', zIndex: 2, backgroundColor: monoWhite, padding: '0 8px' }}>
          <Counter />
        </Box>
      </Box>
      <Box className={classes.characteristic}>
        <Typography style={{ color: monoDarkBlack }} className={classes.typography}>
          Стоимость товаров
        </Typography>
        <Typography className={classes.typography}>{price} руб.</Typography>
      </Box>
      <Box className={classes.characteristic}>
        <Typography style={{ color: monoDarkBlack }} className={classes.typography}>
          Стоимость доставки
        </Typography>
        <Typography className={classes.typography}>{price} руб.</Typography>
      </Box>
      <Select
        label={'Цифра'}
        size={'small'}
        value={selected}
        onChange={(e) => setSelected(e.target.value as string)}
        options={[
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
          { value: 3, label: 'Three' },
        ]}
      />
      <Typography className={classes.deliveryText}>
        <i className={cx('ui_truck', classes.truckIcon)}></i>
        Доставка: от 10 дней
      </Typography>
      <Button
        onClick={() => setAddedToCart((prev) => !prev)}
        sx={{ marginTop: '14px' }}
        variant={addedToCart ? 'outlined' : 'contained'}
        fullWidth
        // startIcon={<i className={!addedToCart ? cx('ui_bag-filled', classes.icon) : cx('ui_tick', classes.icon)}></i>}
      >
        {'Уточнить условия сделки'}
      </Button>
    </Paper>
  );
};

export default PurchaseInfoProvider;
