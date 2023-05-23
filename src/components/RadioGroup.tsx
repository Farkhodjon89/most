import { FormControlLabel, Radio, RadioGroup, RadioProps } from '@mui/material';
import React, { FC, useState } from 'react';
import { mainBlue500 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import RadioIcon from './icons/RadioIcon';
import RadioIconActive from './icons/RadioIconActive';
import CheckboxIcon from './icons/CheckboxIcon';
import CheckboxIconActive from './icons/CheckboxIconActive';

const useStyles = makeStyles<{ border: boolean }>()((theme, { border }) => ({
  formGroup: {
    '& .MuiRadio-root': {
      'padding': theme.spacing(1),
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    '& .MuiFormControlLabel-root': {
      transition: 'all 0.3s',
      border: border ? `1px solid ${mainBlue500}` : 'none',
      borderRadius: 8,
      paddingRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: 0,
      marginRight: theme.spacing(1),
      userSelect: 'none',
    },
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(12),
    },
  },
}));

type RadioItem = {
  value: string;
  name: string;
};

type Props = {
  items: RadioItem[];
  value: string;
  setValue: (value: string) => void;
  border?: boolean;
  type: string;
};

const RadioGroupCustom: FC<Props> = ({ items, control = <RadioCheckBox />, value, setValue, border = false }) => {
  const { classes } = useStyles({ border: border });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <RadioGroup row className={classes.formGroup} value={value} onChange={handleChange}>
      {items.map(({ name, value }) => (
        <FormControlLabel key={name} value={value} name={value} control={control} label={name} />
      ))}
    </RadioGroup>
  );
};

export const RadioCheckBox = (props: RadioProps) => {
  return <Radio disableRipple icon={<CheckboxIcon />} checkedIcon={<CheckboxIconActive />} {...props} />;
};

export default RadioGroupCustom;
