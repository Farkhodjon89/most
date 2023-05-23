import { IconButton, InputAdornment, MenuItem } from '@mui/material';
// eslint-disable-next-line import/named
import DefaultTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { mainBlue900, mainRed400, mainRed900, monoBgGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import Select from './Select';

const useStyles = makeStyles()((theme) => ({
  textFieldRoot: {
    '& .MuiInputBase-root': {
      'backgroundColor': monoBgGrey,
      'border': `1px solid transparent`,
      'transition': 'all 0.3s',
      'borderRadius': 8,
      '&:hover': {
        border: `1px solid ${mainBlue900}`,
        backgroundColor: monoBgGrey,
      },
    },
    '& .MuiInputBase-root.Mui-error': {
      'backgroundColor': mainRed400,
      '&:hover': {
        border: `1px solid ${mainRed900}`,
        backgroundColor: mainRed400,
      },
    },
    '& .MuiFilledInput-input': {
      'paddingTop': 11,
      'paddingBottom': 11,
      'paddingLeft': 16,
      'paddingRight': 40,
      'fontSize': theme.typography.pxToRem(14),
      'fontFamily': 'raleway-med',
      '&:-webkit-autofill': {
        borderRadius: '8px !important',
        // boxShadow: `inset 0 0 0 1000px ${monoBgGrey} inset !important`,
        // WebkitBoxShadow: `0 0 0 1000px ${monoBgGrey} inset`,
        // backgroundColor: monoBgGrey,
      },
    },
    '& .MuiFilledInput-input.Mui-error': {
      color: mainRed900,
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 2,
      color: mainRed900,
      fontFamily: 'raleway-med',
      fontSize: theme.typography.pxToRem(10),
    },
    '& .MuiInputBase-input-MuiFilledInput-input:-webkit-autofill': {
      borderRadius: 8,
    },
  },
}));

export const TextField: FC<MuiTextFieldProps> = (props) => {
  const { ...rest } = props;
  return <DefaultTextField fullWidth variant={'filled'} InputProps={{ disableUnderline: true }} {...rest} />;

  // return (
  //   <DefaultTextField
  //     fullWidth
  //     variant={'filled'}
  //     classes={{ root: classes.textFieldRoot }}
  //     InputProps={{ disableUnderline: true }}
  //     {...rest}
  //   />
  // );
};

export const InputDrop: FC<MuiTextFieldProps> = (props) => {
  const { ...rest } = props;
  const { classes } = useStyles();
  const [name, setName] = useState({ value: '', isValid: true, message: '' });
  const [selected1, setSelected1] = useState(1);

  const [textEditor, setTextEditor] = useState({ value: '', isValid: true, message: '' });
  const handleEditorChange = ({ value, isValid, message }: any) => {
    setTextEditor({ value, isValid, message });
  };
  return (
    // @ts-ignore
    <DefaultTextField
      className={'dddd'}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton tabIndex={-1} aria-label="toggle  visibility" size="large"></IconButton>
            <Select>
              <MenuItem disabled value={1}>
                <em>₽</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </InputAdornment>
        ),
      }}
      variant="filled"
      // classes={classes}
      {...rest}
    />
  );
};
