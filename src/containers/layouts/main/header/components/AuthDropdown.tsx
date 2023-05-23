import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button } from '@mui/material';
import cx from 'classnames';
import { FC, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoDarkGrey, monoLightGrey1, monoWhite } from '../../../../../styles/colorPalette';

const useStyles = makeStyles<{ me: boolean }>()((theme) => ({
  content: {
    'zIndex': 1000,
    'position': 'absolute',
    'top': 50,
    'right': 0,
    'left': 'auto',
    'borderRadius': theme.spacing(2),
    'padding': theme.spacing(1),
    'width': 250,
    'backgroundColor': 'white',
    'boxShadow': '0px 6px 20px rgba(0, 0, 0, 0.08);',
    'maxHeight': 260,
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
    '& .MuiButton-endIcon': {
      marginLeft: 0,
    },
    'padding': `${theme.spacing(1)} ${theme.spacing(2)}`,
    'backgroundColor': mainBlue400,
    '&:hover': {
      backgroundColor: mainBlue400,
    },
    'borderRadius': 12,
    'color': mainBlue900,
  },
  registered: {
    'backgroundColor': monoWhite,
    '&:hover': {
      backgroundColor: monoWhite,
    },
  },
}));

const AuthDropdown: FC<any> = ({
  buttonLabel,
  children,
  me,
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
          className={me ? cx(classes.button, classes.registered) : classes.button}
          sx={{ marginTop: buttonLabel !== '' ? 1 : 0 }}
          onClick={handleClick}
          // startIcon={Icon}
          endIcon={Icon}
        >
          {buttonLabel}
        </Button>
        {open ? <Box className={classes.content}>{children}</Box> : null}
      </Box>
    </ClickAwayListener>
  );
};

export default AuthDropdown;
