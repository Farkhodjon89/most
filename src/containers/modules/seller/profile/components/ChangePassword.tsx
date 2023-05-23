import { Grid, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
import { StringSchema } from 'yup';

import { Button } from '../../../../../components/Button';
import { PasswordTextField } from '../../../../../components/Textfield';
import { SERVER_KEYS, YupMessages } from '../../../../../const';
import { mainBlue400, monoDarkBlack } from '../../../../../styles/colorPalette';
import { showErrors, strongPasswordMethod } from '../../../../../utils/common';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontWeight: '700',
    lineHeight: '24px',
    color: monoDarkBlack,
  },
  Wrapp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    backgroundColor: mainBlue400,
    borderRadius: theme.spacing(2),
  },
  text: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: '22px',
    color: '#0F0F1A',
    paddingLeft: theme.spacing(1),
  },
}));
Yup.addMethod<StringSchema>(Yup.string, 'strongPassword', strongPasswordMethod);
const ChangePassword = () => {
  const { classes } = useStyles();
  const [{ loading }, changePassword] = useAxios({ url: '/profile/password', method: 'PUT' }, { manual: true });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(YupMessages.REQUIRED),
      password: Yup.string().required(YupMessages.REQUIRED).strongPassword(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required(YupMessages.REQUIRED),
    }),
    onSubmit: (values) => {
      changePassword({
        data: {
          oldPassword: values.currentPassword,
          password: values.password,
        },
      })
        .then(({ data }) => {
          toast.success('Пароль успешно обновлен');
          formik.resetForm();
        })
        .catch((e) => {
          if (e.status === 422) {
            showErrors(e, formik);
            if (!e.data) {
              if (e.message.text !== '') {
                toast.error(e.message.text);
              }
            }
          } else {
            toast.error(SERVER_KEYS[e.message.key] || 'Неизвестный ключ ошибки');
          }
        });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [loading]);
  return (
    <Grid container>
      <Grid item xs={12} mb={1}>
        <Typography className={classes.title}>Смена пароля</Typography>
      </Grid>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <PasswordTextField
          fullWidth
          label="Текущий пароль"
          name="currentPassword"
          inputProps={{ autoComplete: 'new-password' }}
          onFocus={() => formik.setFieldTouched('currentPassword', false)}
          onBlur={() => formik.setFieldTouched('currentPassword', true)}
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
        />
        <PasswordTextField
          fullWidth
          label="Новый пароль"
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
        <Button
          sx={{ width: 'fit-content' }}
          disabled={!formik.isValid}
          loading={loading}
          onClick={() => formik.handleSubmit()}
        >
          Сохранить пароль
        </Button>
      </Stack>
    </Grid>
  );
};

export default ChangePassword;
