import { IconButton } from '@mui/material';
import DefaultChip, { ChipProps } from '@mui/material/Chip';
import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

import { monoBgGrey, monoBlack, monoGrey } from '../styles/colorPalette';

const useStyles = makeStyles()((theme, { customColor }) => ({
  root: {
    background: monoBgGrey,
    border: customColor ? `1px solid ${customColor}` : 'none',
    margin: theme.spacing(0.5),
  },
  label: {
    color: customColor || monoBlack,
    fontSize: 14,
    fontWeight: 600,
  },
}));

const Chip: FC<ChipProps & { customColor?: string }> = (props) => {
  const { customColor, ...other } = props;
  const { classes } = useStyles({ customColor });
  return (
    <DefaultChip
      classes={classes}
      deleteIcon={
        <IconButton>
          <i className="ui_close" style={{ fontSize: 12, color: customColor || monoGrey }} />
        </IconButton>
      }
      {...other}
    />
  );
};

export default Chip;
