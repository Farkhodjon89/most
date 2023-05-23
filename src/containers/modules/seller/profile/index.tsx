import { Grid } from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, SecondaryButton } from '../../../../components/Button';
import { OverlayLoader } from '../../../../components/Loaders';
import SimpleModal from '../../../../components/modals';
import WhiteContainer from '../../../../components/WhiteContainer';
import { useSession } from '../../../../context/UserContext';
import { showErrors } from '../../../../utils/common';
import SellerLayout from '../../../layouts/seller';
import Documents from './components/Documents';
import DocumentsAsideInfo from './components/Documents/DocumentsAsideInfo';
import MainInfo from './components/MainInfo';
import ShowcaseCompany from './components/ShowcaseCompany';
import { FormValues } from './lib/types';
import ProfileHeader from './ProfileHeader';
import TabPage from './TabPage';
import TabsHeader from './TabsHeader';
import { calculateProgress, fillProfileData, moveToElement, prepareSubmitData, validationSchema } from './utils';
import { PROFILE_COMPANY_FIELDS, PROFILE_COMPONY_FIELDS_TABS_KEY } from './utils/const';

const VALIDATION_KEYS = [
  'kpp',
  'inn',
  'ogrn',
  'registeredAddress',
  'factAddress',
  'owner',
  'description',
  'phone',
  'email',
  'webLink',
  'documents',
];
const TAB_VALIDATE = {
  kpp: 0,
  inn: 0,
  ogrb: 0,
  registeredAddress: 0,
  factAddress: 0,
  owner: 0,
  description: 1,
  phone: 1,
  email: 1,
  webLink: 1,
  documents: 2,
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState('');
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const { me } = useSession();
  const [progress, setProgress] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [{ data, loading }, refetch] = useAxios(`/companies/${me?.companies[0].id || ''}`);
  const [documentsState, docRefetch] = useAxios(`/companies/${me?.companies[0].id}/documents`);

  const [saveState, saveCompanyDetails] = useAxios(
    { url: `/companies/${me?.companies[0].id}`, method: 'PUT' },
    { manual: true },
  );

  const formik = useFormik<FormValues>({
    initialValues: PROFILE_COMPANY_FIELDS,
    // validateOnBlur: false,
    // validateOnChange: false,
    // validateOnMount: false,
    validationSchema: validationSchema(me?.companies[0].companyType),
    onSubmit: () => {
      console.log('do nothing here');
    },
  });

  const validate = (data: any) => {
    const firstErrorKey = Object.keys(data).find((key) => VALIDATION_KEYS.some((valK) => valK === key));
    if (firstErrorKey) {
      showErrors({ data }, formik);
      setValue(TAB_VALIDATE[firstErrorKey]);
      moveToElement(data as any, TAB_VALIDATE[firstErrorKey]);
      if (firstErrorKey === 'documents') {
        toast.error('Не все документы загружены');
      }
      return false;
    }

    return true;
  };

  const handleSubmit = (e, type, toastMsg = 'Данные успешно сохранены!') => {
    const data = prepareSubmitData(formik.values, type);
    if (data.type === 'draft') {
      formik.setErrors({});
      saveCompanyDetails({
        data,
      })
        .then(({ data }) => {
          toast.success(toastMsg);
          formik.validateForm();
          setReadOnlyMode(false);
          refetch();
          docRefetch();
        })
        .catch((e) => {
          if (e.data.webLink) {
            setValue(1);
          }
          // showErrors(e, formik);
          validate(e.data);
        });
    } else {
      if (!validate(formik.errors)) {
        return;
      }
      formik.validateForm();

      const errorsKeys = Object.keys(formik.errors);

      if (errorsKeys.length) {
        const key = errorsKeys[0] as keyof typeof PROFILE_COMPONY_FIELDS_TABS_KEY;
        showErrors(
          {
            data: Object.entries(formik.errors).reduce((obj, [key, value]) => ({ ...obj, [key]: { text: value } }), {}),
          },
          formik,
        );
        setValue(PROFILE_COMPONY_FIELDS_TABS_KEY[key].tabKey);
        formik.setFieldValue('tabKeyError', PROFILE_COMPONY_FIELDS_TABS_KEY[key].tabKey);

        return;
      }
      saveCompanyDetails({
        data,
      })
        .then(({ data }) => {
          toast.success('Данные успешно отправлены на проверку!');
          setStatus('on_verification');
          setReadOnlyMode(true);
        })
        .catch((e) => {
          validate(e.data);
        });

      // console.log('verification', formik.errors);
    }
  };

  const handleCancel = (e) => {
    setReadOnlyMode(true);
    const values: any = fillProfileData(data.data, documentsState.data?.data);
    formik.setValues(values);
  };

  useEffect(() => setProgress(calculateProgress(formik, me)), []);

  useEffect(() => {
    setProgress(calculateProgress(formik, me));
  }, [formik.errors, formik.values]);

  useEffect(() => {
    // console.log('documentsState.data?.data', documentsState.data?.data);
    if (data?.data && documentsState.data?.data) {
      const values: any = fillProfileData(data.data, documentsState.data?.data);
      formik.setValues(values);
      if (data.data.status) {
        setStatus(data.data.status);
        if (data.data.status === 'verified' || data.data.status === 'on_verification') {
          setReadOnlyMode(true);
        }
      }
    }
  }, [loading, documentsState.loading]);

  if (loading || documentsState.loading) {
    return <OverlayLoader />;
  }
  return (
    <SellerLayout>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <ProfileHeader progress={progress} status={status} hideProgress />
        </Grid>
        <Grid item xs={12}>
          <TabsHeader
            tabs={[
              {
                label: 'Основная информация',
                index: 0,
              },
              {
                label: 'Витрина компании',
                index: 1,
              },
              {
                label: 'Документы',
                index: 2,
              },
            ]}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <WhiteContainer>
            <Grid container>
              <Grid item xs={12}>
                <TabPage value={value} index={0}>
                  <MainInfo tabKey={0} formik={formik} readOnly={readOnlyMode} status={status} />
                </TabPage>

                <TabPage value={value} index={1}>
                  <ShowcaseCompany tabKey={1} formik={formik} readOnly={readOnlyMode} />
                </TabPage>

                <TabPage value={value} index={2}>
                  <Documents formik={formik} readOnly={readOnlyMode} />
                </TabPage>
              </Grid>
              <Grid item xs={12}>
                {status === 'draft' && (
                  <Grid mt={3} container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        loading={saveState.loading}
                        onClick={(e) => handleSubmit(e, 'verification')}
                        disabled={loading || !formik.isValid}
                      >
                        Сохранить и отправить на проверку
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <SecondaryButton
                        variant={'text'}
                        fullWidth
                        loading={saveState.loading}
                        onClick={(e) => handleSubmit(e, 'draft')}
                      >
                        Сохранить
                      </SecondaryButton>
                    </Grid>
                    <Grid item xs={4} />
                  </Grid>
                )}
                {status === 'verified' && readOnlyMode && (
                  <Grid mt={3} container spacing={2}>
                    <Grid item xs={2}>
                      <Button fullWidth loading={saveState.loading} onClick={(e) => setReadOnlyMode(false)}>
                        Изменить данные
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {status === 'on_verification' && (
                  <Grid mt={3} container spacing={2}>
                    <Grid item xs={2}>
                      <SimpleModal
                        label="Отозвать данные"
                        title={'Отзыв данных'}
                        desc={'Вы уверены, что хотите отозвать данные'}
                        loading={saveState.loading}
                        // disabled={saveState.loading}
                        onSubmit={(e) => handleSubmit(e, 'draft', 'Данные успешно отозваны')}
                      />
                    </Grid>
                  </Grid>
                )}
                {status === 'verified' && !readOnlyMode && (
                  <Grid mt={3} container spacing={2}>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        loading={saveState.loading}
                        onClick={(e) => handleSubmit(e, 'verification')}
                        disabled={loading || !formik.isValid}
                      >
                        Сохранить и отправить на проверку
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <SecondaryButton variant={'text'} fullWidth loading={saveState.loading} onClick={handleCancel}>
                        Отменить
                      </SecondaryButton>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </WhiteContainer>
        </Grid>
        <Grid item xs={4}>
          {value === 2 && <DocumentsAsideInfo />}
        </Grid>
      </Grid>
    </SellerLayout>
  );
};

export default Profile;
