import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { SecondaryButton } from '../../../components/Button';
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

const ProductDetails = ({ description, readOnly = false, title }: any) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={7}>
        <Typography mb={2} className={classes.title} variant={'h3'}>
          {title}
        </Typography>
        <Typography mb={1} className={classes.subtitle} variant={'h5'}>
          Заголовок
        </Typography>
        <Typography className={classes.text} mb={2}>
          {description}
        </Typography>
        <Typography mb={1} className={classes.subtitle} variant={'h5'}>
          Заголовок
        </Typography>
        <Image src="/detailImage.png" alt="Image" width={411} height={250} />
        <Typography className={classes.text} mt={2} mb={2}>
          {description}
        </Typography>
        <Typography mb={1} className={classes.subtitle}>
          Дополнительные файлы
        </Typography>
        <Stack component={'div'} spacing={1} mb={4} direction={'row'}>
          <SecondaryButton disabled={readOnly} loading={loading} startIcon={<i className="ui_upload-cloud" />} small>
            {/*documents?.length > 0 ? 'Загрузить другой файл' :*/ 'Загрузить файл'}
          </SecondaryButton>
          <SecondaryButton disabled={readOnly} loading={loading} startIcon={<i className="ui_upload-cloud" />} small>
            {/*documents?.length > 0 ? 'Загрузить другой файл' :*/ 'Загрузить файл'}
          </SecondaryButton>
          {/*{info && <SmallGrayDescr>Отсканированный документ с двух сторон</SmallGrayDescr>}*/}
        </Stack>
        <ProductInfo id={'characteristics'} title={'Все характеристики'} />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
