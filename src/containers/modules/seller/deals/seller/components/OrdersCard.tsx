import { Box, IconButton, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue800,
  mainBlue900,
  monoBgGrey,
  monoDarkBlack,
  monoGrey,
  monoLightGrey1,
  monoWhite,
} from '../../../../../../styles/colorPalette';
import { OrderProduct } from '../../../../../products/lib/types';

const useStyles = makeStyles()((theme) => ({
  root: {
    'padding': '12px',
    'borderRadius': '18px',
    'cursor': 'pointer',
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    'borderBottom': `2px solid ${monoBgGrey}`,
    '& .MuiFormControlLabel-root': {
      marginRight: '0',
    },
    '&	.MuiIconButton-root': {
      'width': 24,
      'height': 24,
      'borderRadius': '8px',
      '&:hover': {
        backgroundColor: mainBlue800,
      },
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '12px',
  },
  plusIcon: {
    fontSize: theme.typography.pxToRem(12),
    color: monoWhite,
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    fontWeight: 600,
    color: monoDarkBlack,
    marginBottom: 4,
  },
  text: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoGrey,
    textTransform: 'uppercase',
  },
  closeIcon: {
    fontSize: theme.typography.pxToRem(12),
    color: monoLightGrey1,
  },
  activeIcon: {
    transform: 'rotate(180deg)',
    transition: '0.3s',
  },
  price: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '22px',
    color: monoDarkBlack,
    fontWeight: 600,
  },
  img: {
    borderRadius: theme.spacing(1),
  },
}));

const OrdersCard = ({ item, added, setAdded }: { item: any; added: number[]; setAdded: (n: number[]) => void }) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Box sx={{ display: 'flex' }}>
        {!!item.photos.length && (
          <Image alt={'Product'} width={32} height={32} className={classes.img} src={item.photos[0].originalUrl} />
        )}
        <Box className={classes.cardContent}>
          <Typography className={classes.description}>{item.name}</Typography>
          <Typography className={classes.text}>Арт. 199288390</Typography>
        </Box>
      </Box>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'end' }}>
          <Typography className={classes.price}>{item.price} ₽</Typography>
          {!added.some((id) => item.id === id) ? (
            <IconButton
              style={{ backgroundColor: mainBlue900 }}
              onClick={() => setAdded(Array.from(new Set([...added, item.id])))}
              sx={{ marginLeft: '12px' }}
            >
              <i className={cx('ui_plus', classes.plusIcon)}></i>
            </IconButton>
          ) : (
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              onClick={() => setAdded(added.filter((id) => id !== item.id))}
              sx={{ marginLeft: '12px' }}
            >
              <i className={cx('ui_close', classes.closeIcon)}></i>
            </IconButton>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default OrdersCard;
