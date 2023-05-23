import { Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { black, mainBlue900, monoGrey } from '../../../../../styles/colorPalette';
import { MadFormatter } from '../../../../../utils/common';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(32),
    color: black,
  },
  price: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(22),
    fontWeight: 700,
    color: mainBlue900,
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20),
    fontWeight: 600,
    color: monoGrey,
  },
}));

const DealsHeader = ({ title, price }) => {
  const { classes } = useStyles();

  return (
    <Grid container alignItems={'center'} justifyContent="space-between">
      <Grid item>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Stack direction={'row'} spacing={1}>
          <Typography className={classes.text}>Сумма сделок</Typography>
          <Typography className={classes.price}>{MadFormatter.toCurrency(price)}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DealsHeader;
