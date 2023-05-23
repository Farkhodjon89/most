import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../../../../components/Button';
import { blue, monoDarkBlack } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  sum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 24px',
    cursor: 'pointer',
  },
  totalText: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    lineHeight: '24px',
    color: blue,
  },
  totalNumber: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
}));

const DealTotal = ({ sum, handleSaveProducts, loading, isShowSaveButton }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.sum}>
      <Stack direction={'row'} display={'flex'} alignItems={'center'} spacing={1}>
        <Typography className={classes.totalText}>Сумма договора</Typography>
        <Typography className={classes.totalNumber}>{sum} ₽</Typography>
      </Stack>
      <Button loading={loading} onClick={handleSaveProducts} extraSmall disabled={!isShowSaveButton}>
        Сохранить
      </Button>
    </Box>
  );
};

export default DealTotal;
