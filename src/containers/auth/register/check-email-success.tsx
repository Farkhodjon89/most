import { Box, Checkbox, FormControlLabel, Grid, RadioGroup, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import { changeUrlToCorrect, showErrors } from 'utils/common';
import * as Yup from 'yup';

import { Button } from '../../../components/Button';
import Radio from '../../../components/Radio';
import { TextField } from '../../../components/Textfield';
import { companyTypes, URL_REGEX, YupMessages } from '../../../const';
import { useSession } from '../../../context/UserContext';
import { mainBlue500, mainBlue900 } from '../../../styles/colorPalette';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';
import InvalidToken from '../components/InvalidToken';
import RegistrationSteps from '../components/RegistrationSteps';

const useStyles = makeStyles()((theme) => ({
  stage: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapp: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'raleway',
  },
  subtitle: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    /* Main Color/Blue/900 */

    color: '#0F0F1A',
    marginBottom: '24px',
  },
  btn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  formGroup: {
    '& .MuiRadio-root': {
      'padding': theme.spacing(1),
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    '& .MuiFormControlLabel-root': {
      transition: 'all 0.3s',
      border: `1px solid ${mainBlue500}`,
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

const CheckEmailSuccess = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const { login } = useSession();
  const [checkTokenState] = useAxios({
    url: 'auth/register/token-check',
    method: 'POST',
    data: { token: router.query.token },
  });
  const [{ loading }, register] = useAxios({ url: '/auth/register/step-2', method: 'POST' }, { manual: true });
  useEffect(() => {
    formik.validateForm();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      middlename: '',
      companyType: '',
      companyName: '',
      webLink: '',
      inn: '',
      kpp: '',
      privacyCheck: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(YupMessages.REQUIRED)
        .max(100, 'Максимальная длина 100 символов')
        .min(2, 'Минимальная длина 2 символа')
        .matches(/^[-\а-яА-ЯЁё]+$/, YupMessages.CYRILLIC_ONLY),
      surname: Yup.string()
        .required(YupMessages.REQUIRED)
        .max(100, 'Максимальная длина 100 символов')
        .min(2, 'Минимальная длина 2 символа')
        .matches(/^[-\а-яА-ЯЁё]+$/, YupMessages.CYRILLIC_ONLY),
      companyType: Yup.string().required(YupMessages.REQUIRED),
      companyName: Yup.string().max(100, 'Максимальная длина 100 символов').required(YupMessages.REQUIRED),
      webLink: Yup.string().max(300, 'Максимальная длина 300 символов').matches(URL_REGEX, YupMessages.VALID_URL),
      // inn: Yup.string().required(YupMessages.REQUIRED),
      inn: Yup.string().when('companyType', {
        is: (companyType) => {
          return companyType === 'company';
        },
        then: Yup.string()
          .required(YupMessages.REQUIRED)
          .max(10, YupMessages.MAX_STRING)
          .min(10, 'Минимальная длина 10 символов'),
        otherwise: Yup.string()
          .required(YupMessages.REQUIRED)
          .max(12, YupMessages.MAX_STRING)
          .min(12, 'Минимальная длина 12 символов'),
      }),
      kpp: Yup.string().max(9, YupMessages.MAX_STRING),
      privacyCheck: Yup.bool().oneOf([true], 'Message'),
    }),
    onSubmit: (values) => {
      values.webLink = changeUrlToCorrect(values.webLink);

      register({
        data: values,
        params: {
          token: router.query.token,
        },
      })
        .then(({ data }) => {
          login(data.data.loginToken, '/auth/phone-verification');
        })
        .catch((e) => {
          console.log('e.statuse.status', e.status);
          if (e.status === 422) {
            showErrors(e, formik);
          } else {
            console.log('HEREE');
            toast.error(e.message.text);
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
          'К сожалению, срок годности ссылки истёк или ссылка не действительна. Пожалуйста, попробуйте зарегистрироваться ещё раз'
        }
      />
    );
  }

  return (
    <MainLayout>
      <Wrapper>
        <Grid>
          <Typography variant="h4" align="center" fontSize={32} mb={4}>
            Регистрация
          </Typography>
          <Box className={classes.stage}>
            <RegistrationSteps step={3} />
          </Box>
        </Grid>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Имя"
            name="name"
            onFocus={() => formik.setFieldTouched('name', false)}
            onBlur={() => formik.setFieldTouched('name', true)}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            label="Фамилия"
            name="surname"
            onFocus={() => formik.setFieldTouched('surname', false)}
            onBlur={() => formik.setFieldTouched('surname', true)}
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <TextField
            fullWidth
            label="Название компании"
            name="companyName"
            onFocus={() => formik.setFieldTouched('companyName', false)}
            onBlur={() => formik.setFieldTouched('companyName', true)}
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            fullWidth
            label="Ссылка на сайт"
            name="webLink"
            onFocus={() => formik.setFieldTouched('webLink', false)}
            onBlur={() => formik.setFieldTouched('webLink', true)}
            value={formik.values.webLink}
            onChange={formik.handleChange}
            error={formik.touched.webLink && Boolean(formik.errors.webLink)}
            helperText={formik.touched.webLink && formik.errors.webLink}
          />
          <Typography variant="h4" className={classes.subtitle}>
            Выберите тип аккаунта
          </Typography>
          <Stack spacing={3}>
            <RadioGroup row className={classes.formGroup}>
              <Grid container spacing={2}>
                {companyTypes.map((item, key) => (
                  <Grid item xs={6} key={key}>
                    <FormControlLabel
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ width: '100%' }}
                      name="companyType"
                      onClick={formik.handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            <TextField
              fullWidth
              label="Укажите ИНН"
              name="inn"
              onFocus={() => formik.setFieldTouched('inn', false)}
              onBlur={() => formik.setFieldTouched('inn', true)}
              value={formik.values.inn}
              onChange={formik.handleChange}
              error={formik.touched.inn && Boolean(formik.errors.inn)}
              helperText={formik.touched.inn && formik.errors.inn}
            />
            <TextField
              fullWidth
              label="Укажите КПП (при наличии)"
              name="kpp"
              onFocus={() => formik.setFieldTouched('kpp', false)}
              onBlur={() => formik.setFieldTouched('kpp', true)}
              value={formik.values.kpp}
              onChange={formik.handleChange}
              error={formik.touched.kpp && Boolean(formik.errors.kpp)}
              helperText={formik.touched.kpp && formik.errors.kpp}
            />
            <FormControlLabel
              control={<Checkbox name="privacyCheck" />}
              onChange={formik.handleChange}
              label={
                <Typography component={'span'} sx={{ fontSize: 14 }}>
                  Я согласен с условиями{' '}
                  <NextLink href={'/privacy-policy'}>
                    <Typography component={'span'} sx={{ color: mainBlue900 }}>
                      публичной оферты
                    </Typography>
                  </NextLink>
                </Typography>
              }
            />
            <Button onClick={() => formik.handleSubmit()} disabled={!formik.isValid || loading} loading={loading}>
              Зарегистрироваться
            </Button>
          </Stack>
        </Stack>
      </Wrapper>
    </MainLayout>
  );
};

export default CheckEmailSuccess;
