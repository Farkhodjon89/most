import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

import { mainBlue900 } from '../../../../styles/colorPalette';
import { useStyles } from '../../index';

const FilterPage = ({ queryParams, onFilterChange }) => {
  const { classes } = useStyles();
  const queryValue = parseInt(queryParams['per_page']) || 10;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (perPage) => {
    onFilterChange('per_page', perPage);
    handleClose();
  };

  return (
    <>
      <Typography onClick={handleClick} className={classes.label}>
        Отображать по:{' '}
        <Typography sx={{ color: mainBlue900 }} component={'span'}>
          {queryValue}
        </Typography>{' '}
        <i className="ui_down-arrow" style={{ fontSize: 12 }} />
      </Typography>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {/*<MenuItem value={10} selected={queryValue === 2} onClick={() => handleSelect(2)}>*/}
        {/*  2*/}
        {/*</MenuItem>*/}
        <MenuItem value={10} selected={queryValue === 10} onClick={() => handleSelect(10)}>
          10
        </MenuItem>
        <MenuItem value={10} selected={queryValue === 50} onClick={() => handleSelect(50)}>
          50
        </MenuItem>
        <MenuItem value={10} selected={queryValue === 100} onClick={() => handleSelect(100)}>
          100
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterPage;
