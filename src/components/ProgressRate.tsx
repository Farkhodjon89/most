import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import cx from 'classnames';
import { mainGreen800, monoBlack, monoDarkBlack, monoWhite } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  progressRate: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoWhite,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '24px',
    padding: '9px 7px',
    cursor: 'pointer',
    backgroundColor: mainGreen800,
    borderRadius: '100px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '7px',
  },
  arrowDown: {
    fontSize: '10px',
    marginRight: '5px',
    color: monoWhite,
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: '20px',
    marginLeft: '8px',
    color: monoBlack,
  },
}));

const ProgressRate = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.progressRate}>
        <i className={cx('ui_arrowDown-green', classes.arrowDown)}></i>4,5
      </Box>
      <Typography className={classes.title}>ООО «ЗерноЭкспо»</Typography>
    </Box>
  );
};

export default ProgressRate;
