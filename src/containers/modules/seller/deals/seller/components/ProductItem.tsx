import { Box, IconButton, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import Counter from '../../../../../../components/Counter';
import DeleteIcon from '../../../../../../components/icons/DeleteIcon';
import { OutlinedTextField } from '../../../../../../components/Textfield';
import { useSession } from '../../../../../../context/UserContext';
import { mainBlue900, monoBgGrey, monoDarkBlack, monoGrey } from '../../../../../../styles/colorPalette';
import { ProductUpdateParams, useProductInteractions } from '../../../../../products/lib/hooks';
import { OrderProduct, ProductOrderType } from '../../../../../products/lib/types';

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
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '12px',
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
    marginBottom: 4,
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
  price: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '22px',
    color: monoDarkBlack,
    fontWeight: 600,
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    cursor: 'pointer',
  },
  img: {
    borderRadius: theme.spacing(1),
  },
}));

const ProductItem = ({
  item,
  product,
  onChangeProduct,
}: {
  item: OrderProduct;
  product: ProductOrderType;
  onChangeProduct: (id, params: any) => void;
}) => {
  const { classes } = useStyles();
  const { me } = useSession();
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [price, setPrice] = useState(Number(item.productPrice) || 0);
  const [, { fetchUpdateProduct }] = useProductInteractions();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);

  const updateProduct = useCallback(
    (params: { price?: number; quantity?: number; deleted_product?: number }) => {
      if (item.newProduct) {
        onChangeProduct(item.id, {
          quantity: params.quantity || quantity,
          price: params.price || price,
          deleted: Boolean(params.deleted_product),
          product_price: params.price || price,
        });
        return;
      }
      fetchUpdateProduct({
        orderId: product.id,
        updated_products: [
          {
            product_id: item.productId,
            quantity: params.quantity || quantity,
            price: params.price || price,
          },
        ],
        deleted_products: params?.deleted_product ? [params.deleted_product] : [],
      });
    },
    [item, quantity, price],
  );

  if (deleted) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Box sx={{ display: 'flex' }}>
        {/*<FormControlLabel control={<Checkbox />} />*/}
        {!!item.productImg && (
          <Image alt={'Product'} width={56} height={56} className={classes.img} src={item.productImg} />
        )}
        <Box className={classes.cardContent}>
          <Typography className={classes.description}>{item.productName}</Typography>
          <Counter
            counter={quantity}
            setCounter={(value: number) => {
              setQuantity(value);
              updateProduct({
                quantity: value,
              });
            }}
          />
          <Typography className={classes.text}>Арт. 199288390</Typography>
        </Box>
      </Box>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'end' }}>
          <Typography className={classes.price}>{price * quantity} ₽</Typography>
          <IconButton
            onClick={() => {
              updateProduct({
                deleted_product: item.productId,
              });
              setDeleted(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <OutlinedTextField
          type="number"
          size="extraSmall"
          onChange={(e) => {
            setPrice(Number(e.target.value));
            updateProduct({
              price: Number(e.target.value),
            });
          }}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Typography fontSize={14}>До</Typography>
          //     </InputAdornment>
          //   ),
          // }}
          value={price}
          // onChange={handleChangeFilters('max_price')}
        />
      </Stack>
    </Box>
  );
};

export default ProductItem;
