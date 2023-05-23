// eslint-disable-next-line import/named
import { Box, FormControl, Grid, TextFieldProps } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { ReactCodeInputProps } from 'react-code-input';
import { mainBlue900, mainRed900, monoDarkGrey, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

import InputLabel from './InputLabel';
import { Loader } from './Loaders';

const ReactCodeInput = dynamic(import('react-code-input'));

const useStyles = makeStyles<{ error: boolean }>()((theme, { error }) => ({
  root: {
    '& input::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
    '& > input': {
      'webkitAppearance': 'none',
      'mozAppearance': 'textfield',
      'borderRadius': 12,
      'border': '1px solid #E0E0E6',
      // 'backgroundColor': error ? mainRed400 : monoBgGrey,
      'color': error ? mainRed900 : monoDarkGrey,
      'width': 56,
      'height': 56,
      'paddingLeft': theme.spacing(2.8),
      'boxSizing': 'border-box',
      'fontSize': theme.typography.pxToRem(24),
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
      'transition': '0.3s',
      '&:hover': {
        border: `1px solid ${mainBlue900}`,
      },
      '&:focus': {
        outline: 'none',
        border: `1px solid ${monoGrey}`,
      },
    },
  },
  deleteIcon: {
    'cursor': 'pointer',
    'position': 'absolute',
    'top': 18,
    'right': -30,
    '& i::before': {
      color: mainRed900,
    },
  },
}));

type Props = Omit<ReactCodeInputProps, 'inputMode' | 'name'> &
  TextFieldProps & {
    error?: boolean;
    loading?: boolean;
    hideLabel?: boolean;
    onRemoveClick?: () => void;
  };

const CodeInput: React.FC<Props> = ({ error = false, hideLabel = false, loading = false, onRemoveClick, ...props }) => {
  const { classes } = useStyles({ error });
  const [key, setKey] = useState(1);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    // if value was cleared, set key to re-render the element
    if (props.value.length === 0) {
      setKey(key + 1);
      return;
    }

    // do something with the pin
  }, [props.value]);

  useEffect(() => {
    if (null !== inputRef.current) {
      document
        .querySelectorAll('input[inputmode="numeric"]')
        .forEach((node: HTMLInputElement) => node.setAttribute('placeholder', '•'));
    }
  });

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} columnSpacing={2}>
      {!hideLabel && (
        <Grid item xs={12}>
          <InputLabel align={'center'}>Введите код из СМС</InputLabel>
        </Grid>
      )}

      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth error={error} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box position={'relative'}>
            <ReactCodeInput
              ref={inputRef}
              className={classes.root}
              fields={4}
              key={key}
              placeholder={'•'}
              // @ts-ignore пока не понятно почему ругается ts, но по логике все правильно
              inputMode="numeric"
              type="number"
              name="sms-code"
              {...props}
            />
            {error && !loading && (
              <Box className={classes.deleteIcon} onClick={onRemoveClick}>
                <i className="ui_close" />
              </Box>
            )}
            <Box position={'absolute'} top={18} right={-30}>
              {loading && <Loader />}
            </Box>
          </Box>
        </FormControl>
      </Grid>
      {/*<Grid item>*/}

      {/*</Grid>*/}
    </Grid>
  );
};

export default CodeInput;
