import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { monoDarkBlack } from '../../../styles/colorPalette';
import TabPage from '../../modules/seller/profile/TabPage';
import TabsHeader from '../../modules/seller/profile/TabsHeader';
import ContactProvider from './ContactProvider';
import MyReactImageMagnify from './MyReactImageMagnify';
import ProductDetails from './ProductDetails';
import ProductInfo from './ProductInfo';
import ProviderDetails from './ProviderDetails';
import PurchaseInfoProvider from './PurchaseInfoProvider';

const useStyles = makeStyles()((theme) => ({
  productTitle: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginBottom: '32px',
  },
  modal: {
    position: 'absolute',
    top: '0',
    zIndex: 9,
    left: '33%',
  },
}));

const images = [
  {
    original: '/productImage.png',
    thumbnail: '/productImage.png',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ProviderProductPage = ({ product }: any) => {
  const { classes } = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography mb={1} className={classes.productTitle}>
        {product.name}
      </Typography>
      <Grid container spacing={2} sx={{ position: 'relative' }}>
        <Grid item xs={4}>
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay={false}
            showNav={false}
            renderItem={(item) => <MyReactImageMagnify item={item} />}
          />
        </Grid>
        <Grid container className={classes.modal} spacing={2} item xs={6}>
          <Grid item>
            <div id="portal" />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <ProductInfo title={'Характеристики'} />
          <Link href={'#characteristics'}>
            <a>
              <Button variant={'text'} small>
                Все характеристики
              </Button>
            </a>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <PurchaseInfoProvider price={product.price} />
          <ContactProvider />
        </Grid>
      </Grid>
      <Grid mt={4} item xs={12}>
        <Box sx={{ padding: '4px 8px', border: '1px solid #E0E0FF', borderRadius: '10px', width: 'fit-content' }}>
          <TabsHeader
            tabs={[
              {
                label: 'Детали товара',
                index: 0,
              },
              {
                label: 'Данные поставщика',
                index: 1,
              },
            ]}
            value={value}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TabPage value={value} index={0}>
          <ProductDetails title={'Описание товара'} description={product.description} />
        </TabPage>
        <TabPage value={value} index={1}>
          <ProviderDetails title={'Данные компании'} description={product.description} />
        </TabPage>
      </Grid>
    </>
  );
};

export default ProviderProductPage;
