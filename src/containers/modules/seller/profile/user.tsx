import { Box, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import useAxios from 'axios-hooks';
import { TextField } from 'components/Textfield';
import WhiteContainer from 'components/WhiteContainer';
import SellerLayout from 'containers/layouts/seller';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';

import { ButtonText } from '../../../../components/Button';
import { YupMessages } from '../../../../const';
import { useSession } from '../../../../context/UserContext';
import { monoDarkBlack } from '../../../../styles/colorPalette';
import TwoFA from './components/2fa';
import ChangePassword from './components/ChangePassword';
import UpdateEmailModal from './components/UpdateEmailModal';
import UpdatePhoneModal from './components/UpdatePhoneModal';
import ProfileHeader from './ProfileHeader';

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
    backgroundColor: '#F3F3FF',
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

const UserProfile: FC<any> = () => {
  const { me, refetch } = useSession();

  const [sendDateState, sendData] = useAxios({}, { manual: true });

  const fullNameFormik = useFormik({
    initialValues: {
      surname: me.surname,
      name: me.name,
      middlename: me.middlename || '',
    },
    validationSchema: Yup.object({
      surname: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(/^[-\а-яА-ЯЁё\s]+$/, YupMessages.CYRILLIC_ONLY),
      name: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(/^[-\а-яА-ЯЁё\s]+$/, YupMessages.CYRILLIC_ONLY),
      middlename: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(/^[-\а-яА-ЯЁё\s]+$/, YupMessages.CYRILLIC_ONLY),
    }),
    onSubmit: (values) => {
      sendData({
        url: '/profile',
        method: 'PUT',
        data: { ...values },
      })
        .then(() => {
          toast.success('Данные успешно сохранены');
          refetch();
        })
        .catch((e) => {
          fullNameFormik.setFieldError('name', e.data.name?.text);
          fullNameFormik.setFieldError('surname', e.data.surname?.text);
          fullNameFormik.setFieldError('middlename', e.data.middlename?.text);
        });
    },
  });

  const { classes } = useStyles();

  return (
    <SellerLayout>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={2}>
            <ProfileHeader title={'Профиль'} progress={0} hideProgress />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <WhiteContainer>
            <Grid container rowSpacing={6.6}>
              <Grid item xs={12} mb={2}>
                <Typography className={classes.title}>Данные профиля</Typography>
              </Grid>
              <Grid container mb={2}>
                <Grid item xs={12}>
                  <TextField
                    label={'Фамилия'}
                    name="surname"
                    onFocus={() => fullNameFormik.setFieldTouched('surname', false)}
                    onBlur={() => fullNameFormik.setFieldTouched('surname', true)}
                    value={fullNameFormik.values.surname}
                    onChange={fullNameFormik.handleChange}
                    error={fullNameFormik.touched.surname && Boolean(fullNameFormik.errors.surname)}
                    helperText={fullNameFormik.touched.surname && fullNameFormik.errors.surname}
                  />
                </Grid>
              </Grid>
              <Grid container mb={2}>
                <Grid item xs={12}>
                  <TextField
                    label={'Имя'}
                    name="name"
                    onFocus={() => fullNameFormik.setFieldTouched('name', false)}
                    onBlur={() => fullNameFormik.setFieldTouched('name', true)}
                    value={fullNameFormik.values.name}
                    onChange={fullNameFormik.handleChange}
                    error={fullNameFormik.touched.name && Boolean(fullNameFormik.errors.name)}
                    helperText={fullNameFormik.touched.name && fullNameFormik.errors.name}
                  />
                </Grid>
              </Grid>
              <Grid container mb={2}>
                <Grid item xs={12}>
                  <TextField
                    label={'Отчество'}
                    name="middlename"
                    onFocus={() => fullNameFormik.setFieldTouched('middlename', false)}
                    onBlur={() => fullNameFormik.setFieldTouched('middlename', true)}
                    value={fullNameFormik.values.middlename}
                    onChange={fullNameFormik.handleChange}
                    error={fullNameFormik.touched.middlename && Boolean(fullNameFormik.errors.middlename)}
                    helperText={fullNameFormik.touched.middlename && fullNameFormik.errors.middlename}
                  />
                </Grid>
              </Grid>
              <Grid container mb={3} mt={-1}>
                <ButtonText
                  disabled={!fullNameFormik.isValid}
                  onClick={() => fullNameFormik.handleSubmit()}
                  loading={sendDateState.loading}
                >
                  Сохранить
                </ButtonText>
              </Grid>
              <Stack direction={'row'} sx={{ width: '100%', mb: 2 }}>
                <TextField label={'Номер телефона'} value={me.phoneNumber} disabled />
                <Box sx={{ width: 8 }} />
                <UpdatePhoneModal />
              </Stack>
              <Stack direction={'row'} sx={{ width: '100%', mb: 2 }}>
                <TextField label={'Электронная почта'} value={me.email} disabled />
                <Box sx={{ width: 8 }} />
                <UpdateEmailModal />
              </Stack>
              <TwoFA />
              <ChangePassword />
            </Grid>
          </WhiteContainer>
        </Grid>
      </Grid>
    </SellerLayout>
  );
};

export default UserProfile;
