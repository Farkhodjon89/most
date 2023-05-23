import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { monoBgGreyLight, monoWhite } from 'styles/colorPalette';

import Header from './header';
import Sidebar from './Sidebar';

const SellerLayout: FC<any> = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = monoBgGreyLight;

    return () => {
      document.body.style.backgroundColor = monoWhite;
    };
  }, []);

  return (
    <Box display={'flex'}>
      <Header />
      <Sidebar />
      {/*65px - это длина сайдбара, перенести в перменную*/}
      <Box component="main" sx={{ width: 'calc(100% - 65px)', p: 3, pt: 10, background: monoBgGreyLight }}>
        {children}
      </Box>
    </Box>
  );
};

export default SellerLayout;
