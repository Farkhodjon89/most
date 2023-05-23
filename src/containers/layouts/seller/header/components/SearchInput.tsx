import { IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoBgGrey } from '../../../../../styles/colorPalette';
import SearchSelector from './SearchSelector';

const useStyles = makeStyles()((theme) => ({
  root: {
    '.MuiOutlinedInput-root': {
      borderRadius: 50,
      width: 400,
      background: monoBgGrey,
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
        startAdornment: (
          <InputAdornment position="start">
            <SearchSelector />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
