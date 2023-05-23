import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoDarkGrey, monoLightGrey1 } from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  content: {
    'color': monoDarkGrey,
    'position': 'absolute',
    'top': 45,
    'right': 0,
    'left': 0,
    'borderRadius': theme.spacing(2),
    'padding': theme.spacing(1),
    'width': 150,
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
  label: {
    color: monoDarkGrey,
    fontSize: 14,
    cursor: 'pointer',
    height: '100%',
    paddingRight: theme.spacing(1),
    borderRight: `2px solid ${monoLightGrey1}`,
    // fontWeight: 600,
  },
}));

const SearchSelector = () => {
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
        <Typography onClick={handleClick} className={classes.label}>
          Товары <i className="ui_down-arrow" style={{ fontSize: 12 }} />
        </Typography>
        {open ? (
          <Box className={classes.content}>
            <MenuItem value={10}>Товары</MenuItem>
            <MenuItem value={10}>Тендеры</MenuItem>
            <MenuItem value={10}>Сделки</MenuItem>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchSelector;
