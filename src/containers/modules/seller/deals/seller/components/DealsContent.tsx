import { AccordionDetails, Stack } from '@mui/material';
import React from 'react';

import ProductItem from './ProductItem';

const DealsContent = ({ items, product, onChangeProduct }) => {
  return (
    <AccordionDetails>
      <Stack spacing={1} mb={4}>
        {items?.map((item) => (
          <ProductItem onChangeProduct={onChangeProduct} product={product} key={item.id} item={item} />
        ))}
      </Stack>
    </AccordionDetails>
  );
};

export default DealsContent;
