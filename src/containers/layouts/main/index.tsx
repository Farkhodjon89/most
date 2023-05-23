import { Box } from '@mui/material';
import { FC } from 'react';

import Footer from './footer';
import Header from './header';

const MainLayout: FC<any> = ({ children, sx }) => {
  return (
    <>
      <Header />
      <Box component={'main'} sx={{ ...{ padding: 8 }, ...sx }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
