import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from 'tss-react/mui';

import { monoDarkBlack } from '../../../styles/colorPalette';
import ProductInfo from './ProductInfo';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: '22px',
    color: monoDarkBlack,
  },
}));

const ProviderDetails = ({ description, readOnly = false, title }: any) => {
  const { classes } = useStyles();

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={7}>
        <Typography mb={2} className={classes.title} variant={'h3'}>
          {title}
        </Typography>
        <ProductInfo id={'characteristics'} title={'Все характеристики'} />
        <Typography mt={4} mb={1} className={classes.subtitle} variant={'h5'}>
          Описание компании
        </Typography>
        <Typography className={classes.text} mb={2}>
          {description}
        </Typography>
        <Image src="/detailImage.png" alt="Image" width={411} height={250} />
      </Grid>
    </Grid>
  );
};

export default ProviderDetails;
