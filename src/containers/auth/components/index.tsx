import { Box } from '@mui/material';
import { FC } from 'react';

const Wrapper: FC<any> = ({ children }) => {
  return (
    <Box
      sx={{
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

const Title: FC<any> = () => {};

export default Wrapper;
