import { Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoGrey, monoLightGrey2 } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    border: `1px solid ${monoLightGrey2}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  item: {
    'padding': theme.spacing(0.5, 1),
    'color': monoGrey,
    'borderRadius': 6,
    '&:hover': {
      color: mainBlue900,
      backgroundColor: mainBlue400,
      cursor: 'pointer',
    },
  },
  active: {
    color: mainBlue900,
    backgroundColor: mainBlue400,
    // padding: 4,
  },
}));

const Switch: FC<any> = ({ onChange, value = false }) => {
  const { classes } = useStyles();
  return (
    <Stack direction={'row'} spacing={1} className={classes.root}>
      <Typography className={cx(classes.item, value && classes.active)} onClick={() => onChange(true)}>
        Да
      </Typography>
      <Typography className={cx(classes.item, !value && classes.active)} onClick={() => onChange(false)}>
        Нет
      </Typography>
    </Stack>
  );
};

export default Switch;
