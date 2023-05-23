import { Box, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useSession } from 'context/UserContext';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import { showErrors, validatePhone } from 'utils/common';
import * as Yup from 'yup';

import { Button } from '../../../components/Button';
import CodeInputModal from '../../../components/modals/CodeInputModal';
import { PhoneInputWithBtn } from '../../../components/PhoneInput';
import { PasswordTextField, TextField } from '../../../components/Textfield';
import { CODE_TIME_LIMIT, EMAIL_REGEX, SERVER_KEYS, YupMessages } from '../../../const';
import { mainBlue400, mainBlue900, monoDarkGrey, monoGrey } from '../../../styles/colorPalette';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';

const useStyles = makeStyles()((theme) => ({
  loginSelectorRoot: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginSelectorItem: {
    'fontSize': 14,
    'padding': theme.spacing(1),
    'cursor': 'pointer',
    '&:hover': {
      background: mainBlue400,
    },
    'borderRadius': theme.spacing(1),
  },
}));

const Index = () => {
  const { classes } = useStyles();
  const [phoneMask, setPhoneMask] = useState('');
  const [enableResend, setEnableResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });
  const { login: loginSession } = useSession();

  const handleCodeSubmit = () => {
    const data: any = {
      password: formik.values.password,
      code: code.value,
    };
    if (formik.values.authMethod === 'email') {
      data.email = formik.values.email;
    } else {
      data.phone = `+${formik.values.phone.phone}`;
    }

    if (code.value.length === 4) {
      login({
        data: data,
      })
        .then(({ data }) => {
          loginSession(data.data.loginToken);
        })
        .catch((e) => {
          setCode({ ...code, ...{ isValid: false, message: e.message.text } });
        });
    }
  };

  const handleCode = (value: any) => {
    setCode({ value, isValid: true, message: '' });
  };

  const [sendCodeState, sendCode] = useAxios(
    { url: '/auth/phone-verification/send', method: 'POST' },
    { manual: true },
  );

  const handleSendCode = () => {
    sendCode({
      data: { phone: `+${formik.values.phone.phone}` },
    })
      .then(({ data }) => {
        setModalOpen(true);
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
      })
      .catch((e) => {
        // setCode({ ...code, ...{ isValid: false } });
      });
  };

  const [{ data, loading, error }, login] = useAxios({ url: '/auth/login', method: 'POST' }, { manual: true });

  const formik = useFormik({
    initialValues: {
      authMethod: 'email',
      email: '',
      phone: { phone: '' },
      password: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      authMethod: Yup.string(),
      email: Yup.string()
        .matches(EMAIL_REGEX, YupMessages.EMAIL)
        .when('authMethod', {
          is: (authMethod) => authMethod === 'email',
          then: Yup.string().required(YupMessages.REQUIRED).max(256, YupMessages.MAX_STRING),
        }),
      phone: Yup.object().when('authMethod', {
        is: (authMethod) => authMethod === 'phone',
        then: Yup.object()
          .required(YupMessages.REQUIRED)
          .test('validPhone', YupMessages.INVALID_PHONE_NUMBER, validatePhone),
      }),
      password: Yup.string().matches(/^\S*$/, 'Пароль не должен содержать пробелы').required(YupMessages.REQUIRED),
    }),
    onSubmit: (values) => {
      const data = {
        password: values.password,
      };
      if (formik.values.authMethod === 'email') {
        data.email = values.email;
      } else {
        data.phone = formik.values.phone.phone;
      }

      login({
        data,
      })
        .then(({ data }) => {
          if (data.data['2faEnabled']) {
            setModalOpen(true);
            setPhoneMask(data.data.phoneNumber);
            setTimer(CODE_TIME_LIMIT);
            setEnableResend(false);
          } else {
            loginSession(data.data.loginToken);
          }
          // router.push('/auth/register/check-email');
        })
        .catch((e) => {
          showErrors(e, formik);
          if (e.data.length === 0) {
            if (e.message.key === 'auth::app.service.errors.login-attempt') {
              toast.error(SERVER_KEYS[e.message.key], {
                style: {
                  top: 130,
                },
              });
            } else {
              toast.error('На данный номер СМС уже отправлен, попробуйте позже');
            }
          } else {
            setModalOpen(true);
            setTimer(e.data.exception.lifetime);
            setPhoneMask(e.data.phoneNumber);
            setEnableResend(false);
          }
        });
    },
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.stopPropagation();
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    formik.validateForm();
  }, [formik.values.authMethod]);

  return (
    <MainLayout>
      <Wrapper>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" fontSize={32}>
            Войти
          </Typography>
          <Box className={classes.loginSelectorRoot}>
            <Stack spacing={2} direction="row" sx={{ border: `1px solid #F3F3FF`, padding: '1px', borderRadius: 2 }}>
              <Typography
                className={classes.loginSelectorItem}
                style={{ background: formik.values.authMethod === 'email' ? mainBlue400 : 'transparent' }}
                color={formik.values.authMethod === 'email' ? mainBlue900 : monoDarkGrey}
                onClick={() => formik.setFieldValue('authMethod', 'email')}
              >
                С помощью email
              </Typography>
              <Typography
                style={{ background: formik.values.authMethod === 'phone' ? mainBlue400 : 'transparent' }}
                color={formik.values.authMethod === 'phone' ? mainBlue900 : monoDarkGrey}
                onClick={() => formik.setFieldValue('authMethod', 'phone')}
                className={classes.loginSelectorItem}
              >
                С помощью телефона
              </Typography>
            </Stack>
          </Box>
          {formik.values.authMethod === 'email' && (
            <TextField
              inputProps={{
                autoComplete: 'new-password',
              }}
              fullWidth
              label="Электронная почта"
              name="email"
              onFocus={() => formik.setFieldTouched('email', false)}
              onBlur={() => formik.setFieldTouched('email', true)}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onKeyDown={handleKeyDown}
            />
          )}
          {formik.values.authMethod === 'phone' && (
            <PhoneInputWithBtn
              value={formik.values.phone.phone}
              onChange={(phone, data, e, formattedValue) =>
                formik.setFieldValue('phone', { phone, data, e, formattedValue })
              }
              hideLeftContent
              onFocus={() => formik.setFieldTouched('phone', false)}
              onBlur={() => formik.setFieldTouched('phone', true)}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              hideLabel
              buttonProps={{
                name: 'phone',
                loading: sendCodeState.loading,
                onClick: handleSendCode,
                disabled: !enableResend || sendCodeState.loading || Boolean(formik.errors.phone),
              }}
            />
          )}

          <PasswordTextField
            fullWidth
            label={'Пароль'}
            inputProps={{
              autoComplete: 'new-password',
            }}
            name="password"
            onFocus={() => formik.setFieldTouched('password', false)}
            onBlur={() => formik.setFieldTouched('password', true)}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onKeyDown={handleKeyDown}
          />
          <NextLink href="/auth/recovery">
            <Typography component={'a'} sx={{ cursor: 'pointer', color: mainBlue900 }}>
              Забыли пароль?
            </Typography>
          </NextLink>
          <Button type={'submit'} fullWidth onClick={(e) => formik.handleSubmit()} loading={loading} disabled={loading}>
            Войти
          </Button>
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems={'center'}>
            <Typography align="center" sx={{ color: monoGrey }}>
              Ещё нет аккаунта?
            </Typography>
            <NextLink href="/auth/register">
              <Button variant={'text'} small fullWidth={false}>
                Зарегистрироваться
              </Button>
            </NextLink>
          </Box>
        </Stack>
      </Wrapper>
      <CodeInputModal
        phone={phoneMask}
        code={code}
        setCode={setCode}
        onCodeChange={handleCode}
        checkCodeLoading={loading}
        open={modalOpen}
        timer={timer}
        setTimer={setTimer}
        enableResend={enableResend}
        setEnableResend={setEnableResend}
        onResendButtonClick={() => formik.handleSubmit()}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCodeSubmit}
      />
    </MainLayout>
  );
};

export default Index;
