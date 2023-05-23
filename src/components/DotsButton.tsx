import { IconButton, Menu } from '@mui/material';
import cx from 'classnames';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoWhite } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  dotsIcon: {
    color: mainBlue900,
  },
  dotsButton: {
    // 'width': '24px',
    // 'height': '24px',
    // 'boxShadow': '0px 4px 10px rgba(0, 0, 0, 0.12)',
    'padding': theme.spacing(0.5),
    'borderRadius': '4px',
    'cursor': 'pointer',
    'backgroundColor': mainBlue400,

    '&:hover': {
      backgroundColor: monoWhite,
    },
    'i': {
      fontSize: 16,
    },
  },
  activeDots: {
    backgroundColor: mainBlue900,
    i: {
      color: 'white',
    },
  },
}));

const DotsButton = ({ children }: any) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton disableRipple onClick={handleClick} className={cx(classes.dotsButton, open && classes.activeDots)}>
        <i className={cx('ui_dots-horizontal', classes.dotsIcon)}></i>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default DotsButton;
