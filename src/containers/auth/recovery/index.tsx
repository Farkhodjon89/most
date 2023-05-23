import { Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { Button } from 'components/Button';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';

import { TextField } from '../../../components/Textfield';
import { EMAIL_REGEX, YupMessages } from '../../../const';
import { showErrors } from '../../../utils/common';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';

const useStyles = makeStyles()((theme) => ({
  subTitle: {
    fontWeight: 600,
  },
  description: {
    fontSize: 16,
    marginTop: 0,
    padding: theme.spacing(0, 4),
  },
}));

const Recovery = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/auth/recovery/check-email');
  };

  const [{ data, loading, error }, recover] = useAxios(
    { url: '/auth/forgot-password/send', method: 'POST' },
    { manual: true },
  );

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(EMAIL_REGEX, YupMessages.EMAIL)
        .max(256, YupMessages.MAX_STRING),
    }),
    onSubmit: (values) => {
      recover({
        data: {
          email: values.email,
        },
      })
        .then(({ data }) => {
          router.push(`/auth/recovery/check-email?email=${values.email}`);
        })
        .catch((e) => {
          showErrors(e, formik);
          if (e.message.text !== '') {
            formik.setFieldError('email', e.message.text);
          }
        });
    },
  });

  return (
    <MainLayout>
      <Wrapper>
        <Typography variant="h4" align="center" fontSize={32} mb={4}>
          Восстановить пароль
        </Typography>
        <Stack spacing={2}>
          <Typography align="center" className={classes.description}>
            Укажите свою электронную почту. Мы отправим вам ссылку для восстановления пароля
          </Typography>
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
          />
          <Button fullWidth loading={loading} onClick={() => formik.handleSubmit()} disabled={loading}>
            Отправить
          </Button>
          <NextLink href={'/auth/login'}>
            <Button variant={'text'} small fullWidth>
              Вернуться ко входу
            </Button>
          </NextLink>
        </Stack>
      </Wrapper>
    </MainLayout>
  );
};

export default Recovery;
