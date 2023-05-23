import 'react-phone-input-2/lib/style.css';

// eslint-disable-next-line import/named
import { Box, ButtonProps, InputBaseComponentProps } from '@mui/material';
// eslint-disable-next-line import/named
import DefaultTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import cx from 'classnames';
import React, { forwardRef, useRef } from 'react';
import PhoneInput2, { PhoneInputProps as DefaultPhoneInputProps } from 'react-phone-input-2';
import { mainBlue900, mainGreen700, mainRed900, monoBgGrey, monoGrey, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import { Modify } from 'types/Common';

import { Button } from './Button';
import InputLabel from './InputLabel';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      paddingRight: 0,
    },
    '& .MuiOutlinedInput-root fieldset': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root.Mui-disabled fieldset': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root.Mui-disabled.Mui-error fieldset': {
      border: 'none',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: monoGrey,
      fontSize: theme.typography.pxToRem(12),
      marginLeft: 0,
      // marginTop: theme.spacing(3),
    },
    '& .Mui-error .MuiInputBase-input': {
      color: mainRed900,
    },
    '& .MuiInputLabel-outlined': {
      color: '#000',
      fontSize: theme.typography.pxToRem(18),
      transform: 'translate(24px, 25px) scale(1)',
      [theme.breakpoints.down('md')]: {
        transform: 'translate(23px, 16px) scale(1)',
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
}));

const usePhoneInputPureStyles = makeStyles<any>()((theme, { inputSize }) => {
  return {
    phoneContainer: {
      'display': 'flex !important',
      'padding': '0px !important',
      '& .react-tel-input': {
        padding: 0,
      },
      '& .form-control': {
        'paddingLeft': 60,
        'backgroundColor': 'transparent',
        // borderRadius: '8px 0px 0px 8px',
        'border': `1px solid ${monoLightGrey2} !important`,
        'transition': '0.3s',
        '&:hover': {
          border: `1px solid ${mainBlue900} !important`,
        },
        '&:focus': {
          border: `1px solid ${monoGrey} !important`,
        },
        'borderRadius': 12,
        'height':
          inputSize === 'small'
            ? '44px !important'
            : inputSize === 'extraSmall'
            ? '40px !important'
            : '56px !important',
      },
      'height':
        inputSize === 'small' ? '44px !important' : inputSize === 'extraSmall' ? '40px !important' : '56px !important',
      // '& .flag-dropdown': {
      //   top: '72%',
      // },
    },
    phoneInput: {
      'outline': 'none !important',
      'border': 'none !important',
      'fontSize': theme.typography.pxToRem(14),
      'fontFamily': 'Raleway !important',
      'fontWeight': '400 !important',
      'padding': `6px 40px 6px 12px !important`,
      'width': '100% !important',
      '&:-webkit-autofill': {
        boxShadow: 'inset 0 0 0 1000px #fff inset !important',
      },
    },
    flagButton: {
      'display': 'none',
      'border': 'none !important',
      'background': 'transparent  !important',
      'borderRadius': '0 !important',
      'paddingLeft': `${theme.spacing(3)} !important`,
      '& .selected-flag': {
        padding: 0,
        width: 16,
        cursor: 'default',
      },
      '& .selected-flag:hover': {
        backgroundColor: monoBgGrey,
      },
      '& .selected-flag:focus': {
        backgroundColor: monoBgGrey,
      },
    },
  };
});

type TextFieldProps = MuiTextFieldProps & {
  enableValidate?: boolean;
  small?: boolean;
  rules?: any; //todo: затрудняюсь затипизировать, но нужно сделать Rules[] | [Rules, (number | string)[], string];
};

type PhoneInputPureProps = DefaultPhoneInputProps &
  InputBaseComponentProps & {
    onChange: (phone: string, isValid: boolean) => void;
  };

const PhoneInputPure = forwardRef(({ value, inputSize, ...other }: PhoneInputPureProps, ref: React.ElementRef<any>) => {
  const { classes } = usePhoneInputPureStyles({ inputSize });

  return (
    <PhoneInput2
      specialLabel={''}
      enableAreaCodes
      disableDropdown
      inputClass={cx('MuiInputBase-input MuiOutlinedInput-input form-control', classes.phoneInput)}
      containerClass={classes.phoneContainer}
      buttonClass={classes.flagButton}
      areaCodes={{
        kz: ['700', '701', '702', '705', '707', '708', '747', '771', '775', '776', '777', '778'],
      }}
      masks={{ kz: '(...) ...-..-..' }}
      value={value}
      {...other}
    />
  );
});

PhoneInputPure.displayName = 'PhoneInputPure';

type PhoneInputProps = TextFieldProps & {
  readOnly?: boolean;
  end?: React.ReactNode;
};

type PhoneInputProps2 = Modify<
  PhoneInputProps,
  {
    // onChange?: (phone: string, isValid: boolean) => void | any;
    buttonProps: ButtonProps & {
      small?: boolean;
      loading?: boolean;
    };
    inputSize?: string;
    hideLabel?: boolean;
    phoneVerified?: boolean;
    hideLeftContent?: boolean;
  }
>;

export const PhoneInputWithBtn: React.FC<PhoneInputProps2> = (props) => {
  const {
    buttonProps,
    inputSize = 'default',
    hideLabel = false,
    disabled,
    hideLeftContent = false,
    phoneVerified = false,
    ...other
  } = props;
  const { classes } = useStyles();
  const inputRef = useRef();
  // const [helperText, setHelperText] = useState(props.helperText);
  // const [error, setError] = useState(props.error || false);

  //Если ошибка будет приходить с сервера
  // useEffect(() => {
  //   if (props.error === true && props.helperText !== '') {
  //     setError(props.error);
  //     setHelperText(props.helperText);
  //   } else {
  //     setError(false);
  //     setHelperText('');
  //   }
  // }, [props.value, props.error, props.helperText]);

  return (
    <Box>
      {!hideLabel && <InputLabel>Номер телефона</InputLabel>}
      {/*@ts-ignore*/}
      <DefaultTextField
        fullWidth
        placeholder="+7 (999) 999 99 99"
        variant="outlined"
        classes={classes}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={inputRef}
        inputProps={{
          inputSize,
        }}
        InputProps={{
          inputComponent: PhoneInputPure,
          endAdornment: !hideLeftContent ? (
            phoneVerified ? (
              <Box
                sx={{
                  position: 'absolute',
                  right: 5,
                  padding: '12px 18px',
                  borderRadius: 2.5,
                  background: mainGreen700,
                }}
              >
                <i className="ui_tick" style={{ color: 'white' }}></i>
              </Box>
            ) : (
              <Box sx={{ position: 'absolute', right: 5 }}>
                <Button small sx={{ marginLeft: -1 }} {...buttonProps}>
                  Отправить код
                </Button>
              </Box>
            )
          ) : null,
        }}
        disabled={disabled || phoneVerified}
        {...other}
      />
    </Box>
  );
};
