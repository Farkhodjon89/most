import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue400,
  mainBlue900,
  monoDarkBlack,
  monoDarkGrey,
  monoLightGrey1,
} from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  content: {
    'zIndex': 1000,
    'position': 'absolute',
    'top': 45,
    'right': 0,
    'left': 'auto',
    'borderRadius': theme.spacing(2),
    'padding': theme.spacing(1),
    'width': 200,
    'backgroundColor': 'white',
    'boxShadow': '0px 6px 20px rgba(0, 0, 0, 0.08);',
    'maxHeight': 200,
    'overflow': 'hidden',
    'overflowY': 'auto',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: monoLightGrey1,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: monoDarkGrey,
      borderRadius: 10,
    },
  },
  button: {
    'padding': `${theme.spacing(1)} ${theme.spacing(2)}`,
    'color': mainBlue900,
    'fontWeight': 700,
    ':hover': {
      backgroundColor: mainBlue400,
      color: mainBlue900,
    },
    'borderRadius': 12,
    // 'color': monoDarkBlack,
  },
}));

const AuthDropdown: FC<any> = ({
  buttonLabel,
  children,
  Icon = <i className="ui_user" style={{ fontSize: 14 }} />,
}) => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }} display={'flex'} justifyContent={'end'}>
        <Button
          className={classes.button}
          onClick={handleClick}
          startIcon={Icon}
          endIcon={<i className="ui_down-arrow" style={{ fontSize: 10 }} />}
        >
          {buttonLabel}
        </Button>
        {open ? <Box className={classes.content}>{children}</Box> : null}
      </Box>
    </ClickAwayListener>
  );
};

export default AuthDropdown;
