import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

const WhiteContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <Box sx={{ backgroundColor: '#fff', borderRadius: 6, padding: '24px 32px 40px 32px' }}>{children}</Box>;
};

export default WhiteContainer;
