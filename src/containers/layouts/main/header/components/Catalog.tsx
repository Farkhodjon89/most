import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button } from '@mui/material';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { useStore } from '../../../../../context/StoreContext';
import { mainBlue900 } from '../../../../../styles/colorPalette';
import CatalogModal from './CatalogModal';

const useStyles = makeStyles()((theme) => ({
  button: {
    'backgroundColor': mainBlue900,
    'padding': `8px 24px`,
    'fontSize': theme.typography.pxToRem(16),
    ':hover': {
      backgroundColor: mainBlue900,
    },
    'borderRadius': 100,
    'color': 'white',
  },
  closeIcon: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Catalog = () => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
  const { branches } = useStore();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleClick}
          startIcon={
            open ? (
              <i style={{ fontSize: 14 }} className={cx('ui_close', classes.closeIcon)}></i>
            ) : (
              <i className="ui_burger"></i>
            )
          }
        >
          Каталог
        </Button>
        <CatalogModal open={open} categories={branches} />
      </Box>
    </ClickAwayListener>
  );
};

export default Catalog;
