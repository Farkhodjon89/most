import { Box } from '@mui/material';
import { monoWhite, mainRed900 } from '../styles/colorPalette';

const Discount = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '43px',
        height: '20px',
        fontSize: '14px',
        fontWeight: 600,
        marginLeft: '5px',
        cursor: 'pointer',
        lineHeight: '16px',
        backgroundColor: mainRed900,
        color: monoWhite,
        borderRadius: '4px',
      }}
    >
      -20%
    </Box>
  );
};

export default Discount;
