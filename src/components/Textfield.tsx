import { IconButton, InputAdornment, Menu, MenuItem, Stack, TooltipProps, Typography } from '@mui/material';
// eslint-disable-next-line import/named
import DefaultTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { IMaskInput } from 'react-imask';
import NumberFormat, { InputAttributes } from 'react-number-format';
import { makeStyles } from 'tss-react/mui';

import { monoDarkBlack } from '../styles/colorPalette';
import { Modify } from '../types/Common';
import Tooltip from './Tooltip';

const useStyles = makeStyles<{ size?: string }>()((theme, { size }) => {
  if (size === 'extraSmall') {
    return {
      root: {
        '.MuiOutlinedInput-input': {
          padding: size === 'extraSmall' ? theme.spacing(1, 2) : 'inherit',
          height: size === 'extraSmall' ? '1.5em' : 'inherit',
        },

        '& .MuiInputLabel-root': {
          'transform': 'translate(14px, 11px)',
          'fontSize': 14,
          '&.Mui-focused': {
            transform: 'translate(14px, -8px) scale(0.75)',
          },
        },
        '& .MuiInputBase-multiline': {
          padding: 0,
        },
        '& textarea': {
          'maxHeight': 200,
          'overflowY': 'scroll !important',
          '&::-webkit-scrollbar': {
            width: 0,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
        },
      },
    };
  }
  return {
    root: {},
  };
});
type TextFieldProps = Modify<MuiTextFieldProps, { tooltipProps?: TooltipProps; enableTooltip?: boolean }>;

export const TextField: FC<TextFieldProps> = (props) => {
  const { tooltipProps, enableTooltip = false, size = 'medium', ...rest } = props;
  const { classes } = useStyles({ size });
  if (enableTooltip) {
    return (
      <Tooltip
        // title="Пароль должен содержать латинские буквы и цифры, не менее 8 символов"
        // placement={'right'}
        arrow
        disableHoverListener
        {...tooltipProps}
      >
        <DefaultTextField variant={'outlined'} fullWidth className={classes.root} size={size} {...rest} />
      </Tooltip>
    );
  }
  return <DefaultTextField variant={'outlined'} fullWidth className={classes.root} size={size} {...rest} />;
};

export const OutlinedTextField: FC<TextFieldProps> = (props) => {
  const { size = 'medium', ...rest } = props;
  const { classes } = useStyles({ size });
  return (
    <DefaultTextField
      fullWidth
      variant={'outlined'}
      InputProps={{ disableUnderline: true }}
      className={classes.root}
      size={size}
      {...rest}
    />
  );
};

export const PasswordTextField: FC<TextFieldProps> = (props) => {
  const { ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    // @ts-ignore
    <form autoComplete={'new-password'}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                size="large"
              >
                {showPassword ? (
                  <i className="ui_eye-off" style={{ fontSize: 16 }} />
                ) : (
                  <i className="ui_eye" style={{ fontSize: 16 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        // classes={classes}
        {...rest}
      />
    </form>
  );
};

export const InputSelector = ({ options, selectedValue, onChange, disabled = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const { classes } = useStyles();
  const handleClick = (e) => {
    if (!disabled) {
      setAnchorEl(e.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (e) => {
    onChange(e);
    setAnchorEl(null);
  };

  const currentOption = selectedValue ? options.find((item) => item.value === selectedValue) : options[0];

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        display={'flex'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Typography sx={{ color: monoDarkBlack }}>{currentOption.label}</Typography>
        <i className={open ? 'ui_up-arrow' : 'ui_down-arrow'} style={{ color: monoDarkBlack, fontSize: 12 }} />
      </Stack>
      <Menu
        open={open}
        anchorEl={anchorEl}
        // classes={classes}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((item, key) => (
          <MenuItem key={key} selected={selectedValue === item.value} value={item.value} onClick={handleItemClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
//не используется
export const NumberFormatCustom = React.forwardRef<NumberFormat<InputAttributes>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        // thousandSeparator
        isNumericString
        // isAllowed={(values) => {
        //   const { floatValue } = values;
        //   console.log('values', values);
        //   return floatValue >= 5 && floatValue <= 10000;
        // }}
        // prefix="$"
      />
    );
  },
);

export const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      mask="0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
      {...other}
    />
  );
});
