import { IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoGrey, monoLightGrey2, monoWhite } from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    '.MuiOutlinedInput-root': {
      borderRadius: 50,
      width: 720,
      background: monoWhite,
      height: '44px',
      border: `1px solid ${monoLightGrey2}`,
      color: monoGrey,
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

const SearchInput = () => {
  const { classes } = useStyles();

  return (
    <TextField
      className={classes.root}
      placeholder="Поиск..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton tabIndex={-1} aria-label="toggle password visibility" size="large">
              <i className="ui_search" style={{ fontSize: 16 }} />
            </IconButton>
          </InputAdornment>
        ),
        // startAdornment: (
        //   <InputAdornment position="start">
        //     <SearchSelector />
        //   </InputAdornment>
        // ),
      }}
    />
  );
};

export default SearchInput;
