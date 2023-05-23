import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoDarkGrey, monoLightGrey1 } from '../styles/colorPalette';
import { Button } from './Button';

const useStyles = makeStyles()((theme) => ({
  content: {
    'color': monoDarkGrey,
    'position': 'absolute',
    'top': 30,
    'right': 0,
    'left': 0,
    'zIndex': 9,
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
  label: {
    color: monoDarkGrey,
    fontSize: 14,
    cursor: 'pointer',
    height: '100%',
    paddingRight: theme.spacing(1),
    // borderRight: `2px solid ${monoLightGrey1}`,
  },
}));

const TableActions = () => {
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
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack direction={'row'} spacing={2}>
        <Button small variant={'text'}>
          Показать выбранных поставщиков
        </Button>
        <Button small>Уточнить условия (3)</Button>
      </Stack>
      <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography onClick={handleClick} className={classes.label}>
          Отображать по:{' '}
          <Typography sx={{ color: mainBlue900 }} component={'span'}>
            15
          </Typography>{' '}
          <i className="ui_down-arrow" style={{ fontSize: 12 }} />
        </Typography>
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
          <MenuItem value={10} onClick={() => null}>
            2
          </MenuItem>
          <MenuItem value={10} onClick={() => null}>
            10
          </MenuItem>
          <MenuItem value={10} onClick={() => null}>
            50
          </MenuItem>
          <MenuItem value={10} onClick={() => null}>
            100
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default TableActions;
