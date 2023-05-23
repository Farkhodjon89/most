import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoWhite } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    borderRadius: '16px',
    backgroundColor: monoWhite,
    cursor: 'pointer',
  },
}));

const StatusesWrapper = ({ children }) => {
  const { classes } = useStyles();
  return <Box className={classes.wrapper}>{children}</Box>;
};

export default StatusesWrapper;
