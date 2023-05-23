import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoDarkGrey, monoLightGrey1 } from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  content: {
    'zIndex': 1000,
    'position': 'absolute',
    'top': 45,
    'right': 0,
    'left': 0,
    'borderRadius': theme.spacing(2),
    'padding': theme.spacing(1),
    'width': 300,
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
    ':hover': {
      backgroundColor: mainBlue400,
    },
    'borderRadius': 12,
    'color': mainBlue900,
  },
}));

const CurrencySelector = () => {
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
      <Box sx={{ position: 'relative' }}>
        <Button
          className={classes.button}
          onClick={handleClick}
          startIcon={<img src="/img/flags/1.png" alt="" />}
          endIcon={<i className="ui_down-arrow" style={{ fontSize: 10 }} />}
        >
          (₽) Рубли
        </Button>
        {open ? (
          <Box className={classes.content}>
            <MenuItem value={10}>
              <img src="/img/flags/1.png" alt="" style={{ marginRight: 8 }} /> Рубли
            </MenuItem>
            <MenuItem value={10}>
              <img src="/img/flags/2.png" alt="" style={{ marginRight: 8 }} /> Тенге
            </MenuItem>
            <MenuItem value={10}>
              <img src="/img/flags/3.png" alt="" style={{ marginRight: 8 }} /> Белорусский рубль
            </MenuItem>
            <MenuItem value={10}>
              <img src="/img/flags/4.png" alt="" style={{ marginRight: 8 }} /> Рупии
            </MenuItem>
            <MenuItem value={10}>
              <img src="/img/flags/5.png" alt="" style={{ marginRight: 8 }} /> Иранци
            </MenuItem>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default CurrencySelector;
