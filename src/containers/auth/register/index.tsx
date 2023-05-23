import { Box, Grid, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { Button } from 'components/Button';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
import { StringSchema } from 'yup';

import CodeInputModal from '../../../components/modals/CodeInputModal';
import { PhoneInputWithBtn } from '../../../components/PhoneInput';
import { PasswordTextField, TextField } from '../../../components/Textfield';
import { CODE_TIME_LIMIT, EMAIL_REGEX, YupMessages } from '../../../const';
import { showErrors, strongPasswordMethod, validatePhone } from '../../../utils/common';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';
import RegistrationSteps from '../components/RegistrationSteps';

const useStyles = makeStyles()((theme) => ({
  stage: {},
  item: {
    'marginBottom': '24px',
    '& input': {
      width: '100%',
    },
  },
  btn: {
    width: '100%',
  },
  subtitle: {
    fontWeight: '500',
    fontSize: '16px',
    // lineHeight: '24px',
    /* identical to box height, or 150% */

    textAlign: 'center',
    color: '#9A9AA0',
    marginTop: '32px',
  },
  stage1: {
    display: 'flex',
    justifyContent: 'center',
  },
  subbtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12px',
  },
}));
Yup.addMethod<StringSchema>(Yup.string, 'strongPassword', strongPasswordMethod);

const Registration = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [enableResend, setEnableResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [code, setCode] = useState({ value: '', isValid: true, message: '' });

  const handleCodeSubmit = () => {
    if (code.value.length === 4) {
      checkCode({
        data: {
          phone: `+${formik.values.phone.phone}`,
          code: code.value,
        },
      })
        .then(() => {
          setModalOpen(false);
          setPhoneVerified(true);
        })
        .catch((e) => {
          if (e.message.key === 'sms-verification::app.errors.wrong-code') {
            setCode({ ...code, ...{ isValid: false } });
          }
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

  const [checkCodeState, checkCode] = useAxios(
    { url: '/auth/phone-verification/verify', method: 'POST' },
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
        if (e.data && e.status === 422) {
          formik.setFieldError('phone', e.data.phone.text);
        } else {
          setModalOpen(true);
          // TODO: data может быть пустым
          setTimer(e.data?.exception.lifetime || 0);
          setEnableResend(false);
        }
        // console.log('e', e.data);
        // formik.setFieldError('phone', 'На данный номер СМС уже отправлен, попробуйте позже');
      });
  };

  const [{ data, loading, error }, register] = useAxios(
    { url: '/auth/register/step-1', method: 'POST' },
    { manual: true },
  );
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: { phone: '+' },
      password: '',
      confirmPassword: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(EMAIL_REGEX, YupMessages.EMAIL)
        .max(256, YupMessages.MAX_STRING),
      phone: Yup.object()
        .required(YupMessages.REQUIRED)
        .test('validPhone', YupMessages.INVALID_PHONE_NUMBER, validatePhone),
      password: Yup.string().required(YupMessages.REQUIRED).strongPassword(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required(YupMessages.REQUIRED),
    }),
    onSubmit: (values) => {
      register({
        data: {
          email: values.email,
          password: values.password,
          phone: `+${formik.values.phone.phone}`,
          code: code.value,
        },
      })
        .then(({ data }) => {
          router.push(`/auth/register/check-email?email=${formik.values.email}`);
        })
        .catch((e) => {
          if (e.data.code) {
            formik.setFieldError('phone', 'Не отправлен код подтверждения');
          }
          showErrors(e, formik);
          if (!e.data) {
            toast.error(e.message.text);
          } else {
            toast.error(e.data.email.text);
          }
        });
    },
  });

  const disabled = sendCodeState.loading || Boolean(formik.errors.phone);

  return (
    <MainLayout>
      <Wrapper>
        <Box>
          <Typography variant="h4" align="center" fontSize={32} mb={4}>
            Регистрация
          </Typography>
          <Box className={classes.stage1}>
            <RegistrationSteps step={1} />
          </Box>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Электронная почта"
              name="email"
              inputProps={{ autoComplete: 'new-password' }}
              onFocus={() => formik.setFieldTouched('email', false)}
              onBlur={() => formik.setFieldTouched('email', true)}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email} //Поле обязательно для заполнения
            />
            <PhoneInputWithBtn
              value={formik.values.phone.phone}
              onChange={(phone, data, e, formattedValue) =>
                formik.setFieldValue('phone', { phone, data, e, formattedValue })
              }
              onFocus={() => formik.setFieldTouched('phone', false)}
              onBlur={() => formik.setFieldTouched('phone', true)}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              hideLabel
              phoneVerified={phoneVerified}
              buttonProps={{
                name: 'phone',
                loading: sendCodeState.loading,
                onClick: handleSendCode,
                disabled,
              }}
            />
            <PasswordTextField
              fullWidth
              label="Пароль"
              name="password"
              inputProps={{ autoComplete: 'new-password' }}
              onFocus={() => formik.setFieldTouched('password', false)}
              onBlur={() => formik.setFieldTouched('password', true)}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              enableTooltip
              tooltipProps={{
                title: 'Пароль должен содержать латинские буквы и цифры, не менее 8 символов',
                placement: 'top',
              }}
            />
            <PasswordTextField
              fullWidth
              label="Подтвердите пароль"
              name="confirmPassword"
              inputProps={{ autoComplete: 'new-password' }}
              onFocus={() => formik.setFieldTouched('confirmPassword', false)}
              onBlur={() => formik.setFieldTouched('confirmPassword', true)}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button
              className={classes.btn}
              onClick={() => formik.handleSubmit()}
              disabled={!formik.isValid || loading || !phoneVerified}
              loading={loading}
            >
              Продолжить
            </Button>
          </Stack>

          <Typography className={classes.subtitle}>Вы уже зарегистрированы?</Typography>

          <Grid item className={classes.subbtn}>
            <NextLink href="/auth/login">
              <Button variant={'text'} small>
                Войти
              </Button>
            </NextLink>
          </Grid>
        </Box>
      </Wrapper>
      <CodeInputModal
        phone={formik.values.phone.phone}
        code={code}
        setCode={setCode}
        onCodeChange={handleCode}
        checkCodeLoading={checkCodeState.loading}
        open={modalOpen}
        timer={timer}
        setTimer={setTimer}
        enableResend={enableResend}
        setEnableResend={setEnableResend}
        onResendButtonClick={handleSendCode}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCodeSubmit}
      />
    </MainLayout>
  );
};

export default Registration;
