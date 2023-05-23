import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoBlack, monoDarkBlack, monoLightGrey1, monoWhite } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginBottom: '12px',
  },
  characteristic: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'position': 'relative',
    'marginBottom': '12px',
    '&:before': {
      content: '""',
      height: '0.5px',
      backgroundColor: monoLightGrey1,
      position: 'absolute',
      width: '100%',
      top: '50%',
      zIndex: -1,
    },
  },
  typography: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoBlack,
    padding: '0 8px',
    backgroundColor: monoWhite,
  },
}));

const ProductInfo = ({ title, id, attributes = [] }: any) => {
  const { classes } = useStyles();

  return (
    <Box id={id}>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      {attributes.map(({ name, value }, key) => (
        <Box className={classes.characteristic} key={key}>
          <Typography style={{ color: '#6D6D7B' }} className={classes.typography}>
            {name}
          </Typography>
          <Typography className={classes.typography}>{value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductInfo;
