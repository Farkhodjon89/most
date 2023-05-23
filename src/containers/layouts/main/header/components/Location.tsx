import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue400,
  mainBlue900,
  monoDarkGrey,
  monoLightGrey1,
  monoLightGrey2,
} from '../../../../../styles/colorPalette';

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
  input: {
    // '.MuiOutlinedInput-root': {
    //   background: monoBgGrey,
    // },
    '.MuiOutlinedInput-root': {
      height: 40,
      borderRadius: 8,
    },
    '&.Mui-focused': {
      border: `1px solid ${monoLightGrey1}`,
    },
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: `${monoLightGrey1} !important`,
      },
    },
    'marginBottom': theme.spacing(1),
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: `${monoLightGrey2} !important`,
    },
  },
}));

const LocationSelector = () => {
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
          startIcon={<i className="ui_location-filled" style={{ fontSize: 14 }} />}
          endIcon={<i className="ui_down-arrow" style={{ fontSize: 10 }} />}
        >
          Москва, Россия
        </Button>
        {open ? (
          <Box className={classes.content}>
            <TextField
              placeholder="Поиск..."
              className={classes.input}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton tabIndex={-1} aria-label="toggle password visibility" size={'small'}>
                      <i className="ui_search" style={{ fontSize: 16, color: monoLightGrey1 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <MenuItem value={40}>Ten</MenuItem>
            <MenuItem value={50}>Twenty</MenuItem>
            <MenuItem value={60}>Thirty</MenuItem>
            <MenuItem value={70}>Ten</MenuItem>
            <MenuItem value={80}>Twenty</MenuItem>
            <MenuItem value={90}>Thirty</MenuItem>
            <MenuItem value={100}>Ten</MenuItem>
            <MenuItem value={110}>Twenty</MenuItem>
            <MenuItem value={120}>Thirty</MenuItem>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default LocationSelector;
