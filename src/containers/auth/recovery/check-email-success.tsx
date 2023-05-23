import { Box, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { StringSchema } from 'yup';

import { Button } from '../../../components/Button';
import { PasswordTextField } from '../../../components/Textfield';
import { YupMessages } from '../../../const';
import { useSession } from '../../../context/UserContext';
import { showErrors, strongPasswordMethod } from '../../../utils/common';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';
import InvalidToken from '../components/InvalidToken';

Yup.addMethod<StringSchema>(Yup.string, 'strongPassword', strongPasswordMethod);

const CheckEmailSuccess = () => {
  const router = useRouter();
  const { login } = useSession();
  const [checkTokenState] = useAxios({
    url: '/auth/forgot-password',
    method: 'GET',
    params: { token: router.query.token },
  });

  const [{ loading }, reset] = useAxios(
    {
      url: '/auth/forgot-password/reset',
      method: 'POST',
    },
    { manual: true },
  );
  useEffect(() => {
    formik.validateForm();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(YupMessages.REQUIRED).strongPassword(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required(YupMessages.REQUIRED),
    }),
    onSubmit: (values) => {
      reset({
        data: {
          token: router.query.token,
          password: values.password,
        },
      })
        .then(({ data }) => {
          login(data.data.loginToken);
        })
        .catch((e) => {
          showErrors(e, formik);
          if (!e.data) {
            if (e.message.text !== '') {
              toast.error(e.message.text);
            }
          }
        });
    },
  });

  if (checkTokenState.loading) {
    return <Box>Loading...</Box>;
  }
  if (!checkTokenState.data?.success) {
    return (
      <InvalidToken
        desc={
          'К сожалению, срок годности ссылки истёк или ссылка не действительна. Пожалуйста, попробуйте пройти этап восстановления пароля ещё раз'
        }
        buttonLabel={'К восстановлению'}
        link="/auth/recovery"
      />
    );
  }
  return (
    <MainLayout>
      <Wrapper>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" fontSize={32}>
            Восстановить пароль
          </Typography>
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
          <Button onClick={() => formik.handleSubmit()} loading={loading} disabled={!formik.isValid || loading}>
            Восстановить
          </Button>
        </Stack>
      </Wrapper>
    </MainLayout>
  );
};

export default CheckEmailSuccess;
