import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { mainBlue900, monoBgGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme, { imgItemDimensions = [112, 96] }) => ({
  loader: {
    'display': 'inline-block',
    '& .MuiCircularProgress-svg': {
      color: mainBlue900,
    },
  },
  loadingItem: {
    width: `${imgItemDimensions[0]}px !important`,
    height: imgItemDimensions[1],
    backgroundColor: monoBgGrey,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const useOverlayLoaderStyles = makeStyles()(() => ({
  root: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  boxLoader: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLoaderWhite: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
}));

export const Loader = () => {
  const { classes } = useStyles({});
  return (
    <Box className={classes.loader}>
      <CircularProgress disableShrink size={16} />
    </Box>
  );
};

export const OverlayLoader = () => {
  const { classes } = useOverlayLoaderStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress disableShrink />
    </Box>
  );
};

const useLinearLoaderStyles = makeStyles()(() => ({
  box: {
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
}));

export const LinearLoader = ({ progress }) => {
  const { classes } = useLinearLoaderStyles();

  return (
    <Box className={classes.box}>
      <LinearProgress variant="determinate" value={parseInt(progress)} />
    </Box>
  );
};

export const ImageItemLoader = ({ imgItemDimensions }) => {
  const { classes } = useStyles({ imgItemDimensions });
  return (
    <Box>
      <Box position={'relative'} mr={2}>
        <Box className={classes.loadingItem}>
          <CircularProgress size={18} sx={{ color: mainBlue900 }} />
        </Box>
      </Box>
    </Box>
  );
};
