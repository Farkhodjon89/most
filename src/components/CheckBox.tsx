import { Checkbox as DefaultCheckbox, FormControlLabel } from '@mui/material';
import cx from 'classnames';
import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue500 } from '../styles/colorPalette';
import CheckboxIcon from './icons/CheckboxIcon';
import CheckboxIconActive from './icons/CheckboxIconActive';

const useStyles = makeStyles()((theme, { withBorder }) => ({
  checkbox: {
    'border': withBorder ? `1px solid ${mainBlue500}` : 'none',
    'paddingRight': theme.spacing(1),
    'borderRadius': withBorder ? theme.spacing(1) : 0,
    // 'marginBottom': theme.spacing(1),
    'transition': 'all 0.3s',
    'marginLeft': 0,
    'marginRight': theme.spacing(1),
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(12),
      userSelect: 'none',
    },
  },
}));

const CheckBox: FC<any> = (props) => {
  const { classes } = useStyles({ withBorder: props.withBorder || false });
  const { label, ...checkboxProps } = props;
  return (
    <FormControlLabel
      className={cx(classes.checkbox, props.className)}
      control={
        <DefaultCheckbox
          disableRipple
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxIconActive />}
          {...checkboxProps}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
