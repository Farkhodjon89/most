import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoDarkGrey, monoLightGrey1 } from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  content: {
    'zIndex': 1000,
    'position': 'absolute',
    'top': 60,
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
    'backgroundColor': mainBlue900,
    'padding': `14px 26px`,
    'fontSize': theme.typography.pxToRem(16),
    // 'padding': `${theme.spacing(1)} ${theme.spacing(2)}`,
    ':hover': {
      backgroundColor: mainBlue900,
    },
    'borderRadius': 50,
    'color': 'white',
  },
}));

const Catalog = () => {
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
          variant="contained"
          className={classes.button}
          onClick={handleClick}
          startIcon={<i className="ui_burger"></i>}
        >
          Каталог
        </Button>
        {open ? (
          <Box className={classes.content}>
            <MenuItem value={10}>Электроника</MenuItem>
            <MenuItem value={10}>Товары для дома</MenuItem>
            <MenuItem value={10}>Красота и здовровье</MenuItem>
            <MenuItem value={10}>Одежда</MenuItem>
            <MenuItem value={10}>Продукты питания</MenuItem>
            <MenuItem value={10}>Спорт и отдых</MenuItem>
            <MenuItem value={10}>Аптека</MenuItem>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default Catalog;
