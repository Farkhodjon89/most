import { Box, Grid } from '@mui/material';
import useAxios from 'axios-hooks';
import CheckBox from 'components/CheckBox';
import { OverlayLoader } from 'components/Loaders';
import Select from 'components/Select';
import { TextField, TextMaskCustom } from 'components/Textfield';
import { FormTitle } from 'components/Typography';
import React, { FC, useEffect, useState } from 'react';
import { showErrors } from 'utils/common';

import { useSession } from '../../../../../../context/UserContext';
import { moveToElement } from '../../utils';

const MainInfo: FC<any> = ({ formik, readOnly, status, tabKey }) => {
  const [businessTypeState] = useAxios('/companies/available_business_types');
  const [employeeCountState] = useAxios('/companies/available_employees_count');
  const [checked, setChecked] = useState(false);
  const { me } = useSession();
  const identifType = me?.companies[0].companyType === 'individual' ? '000000000000' : '0000000000';
  const companyType = me?.companies[0].companyType === 'individual' ? 'Руководитель' : 'Генеральный директор';
  useEffect(() => {
    if (formik.errors && formik.values.tabKeyError === tabKey) {
      showErrors(
        { data: Object.entries(formik.errors).reduce((obj, [key, value]) => ({ ...obj, [key]: { text: value } }), {}) },
        formik,
      );

      moveToElement(formik.errors, tabKey);
    }

    if (formik.values.registeredAddress === formik.values.factAddress && formik.values.registeredAddress !== '') {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (checked) {
      formik.setFieldValue('factAddress', formik.values.registeredAddress);
    }
  }, [formik.values.registeredAddress]);

  const handleBusinessTypeChange = (e) => {
    const businessTypeId = parseInt(e.target.value);
    let businessTypesArr = formik.values.businessTypes;
    if (businessTypesArr.includes(businessTypeId)) {
      businessTypesArr = businessTypesArr.filter((item) => item !== businessTypeId);
    } else {
      businessTypesArr.push(businessTypeId);
    }
    formik.setFieldValue('businessTypes', businessTypesArr);
  };

  if (businessTypeState.loading || employeeCountState.loading) {
    return <OverlayLoader />;
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue('factAddress', formik.values.registeredAddress);
    }
    setChecked(e.target.checked);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {/*<WhiteContainer>*/}
        <Grid container rowSpacing={6.6}>
          <Grid item xs={12}>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <FormTitle optional>Тип бизнеса</FormTitle>
                <Box display={'flex'} flexWrap={'wrap'} sx={{ mb: 2 }}>
                  {businessTypeState.data?.data.map((item, key) => (
                    <Box sx={{ mb: 1 }} key={key}>
                      <CheckBox
                        withBorder
                        checked={formik.values.businessTypes.includes(item.id)}
                        name="businessType"
                        label={item.name}
                        value={item.id}
                        onChange={handleBusinessTypeChange}
                        disabled={readOnly}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormTitle>Реквизиты компании</FormTitle>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Название компании"
                          name="name"
                          id="name"
                          onFocus={() => formik.setFieldTouched('name', false)}
                          onBlur={() => formik.setFieldTouched('name', true)}
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                          disabled={readOnly}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Год регистрации компании (опционально)"
                          name="foundedYear"
                          id="foundedYear"
                          onFocus={() => formik.setFieldTouched('foundedYear', false)}
                          onBlur={() => formik.setFieldTouched('foundedYear', true)}
                          value={formik.values.foundedYear.toString()}
                          onChange={formik.handleChange}
                          error={formik.touched.foundedYear && Boolean(formik.errors.foundedYear)}
                          helperText={formik.touched.foundedYear && formik.errors.foundedYear}
                          disabled={readOnly}
                          InputProps={{
                            inputComponent: TextMaskCustom as any,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="ИНН"
                          name="inn"
                          id="inn"
                          onFocus={() => formik.setFieldTouched('inn', false)}
                          onBlur={() => formik.setFieldTouched('inn', true)}
                          value={formik.values.inn}
                          onChange={formik.handleChange}
                          error={formik.touched.inn && Boolean(formik.errors.inn)}
                          helperText={formik.touched.inn && formik.errors.inn}
                          disabled={readOnly || status === 'verified'}
                          inputProps={{
                            mask: identifType,
                          }}
                          InputProps={{
                            inputComponent: TextMaskCustom as any,
                          }}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="ОГРН"
                          name="ogrn"
                          id="ogrn"
                          onFocus={() => formik.setFieldTouched('ogrn', false)}
                          onBlur={() => formik.setFieldTouched('ogrn', true)}
                          value={formik.values.ogrn}
                          onChange={formik.handleChange}
                          error={formik.touched.ogrn && Boolean(formik.errors.ogrn)}
                          helperText={formik.touched.ogrn && formik.errors.ogrn}
                          disabled={readOnly || status === 'verified'}
                          inputProps={{
                            mask: '0000000000000',
                          }}
                          InputProps={{
                            inputComponent: TextMaskCustom as any,
                          }}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="КПП"
                          name="kpp"
                          id="kpp"
                          onFocus={() => formik.setFieldTouched('kpp', false)}
                          onBlur={() => formik.setFieldTouched('kpp', true)}
                          value={formik.values.kpp}
                          onChange={formik.handleChange}
                          error={formik.touched.kpp && Boolean(formik.errors.kpp)}
                          helperText={formik.touched.kpp && formik.errors.kpp}
                          disabled={readOnly}
                          inputProps={{
                            mask: '000000000',
                          }}
                          InputProps={{
                            inputComponent: TextMaskCustom as any,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Юридический адрес"
                      name="registeredAddress"
                      id="registeredAddress"
                      onFocus={() => formik.setFieldTouched('registeredAddress', false)}
                      onBlur={() => formik.setFieldTouched('registeredAddress', true)}
                      value={formik.values.registeredAddress}
                      onChange={formik.handleChange}
                      error={formik.touched.registeredAddress && Boolean(formik.errors.registeredAddress)}
                      helperText={formik.touched.registeredAddress && formik.errors.registeredAddress}
                      disabled={readOnly}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Фактический адрес"
                      name="factAddress"
                      id="factAddress"
                      onFocus={() => formik.setFieldTouched('factAddress', false)}
                      onBlur={() => formik.setFieldTouched('factAddress', true)}
                      value={formik.values.factAddress}
                      onChange={formik.handleChange}
                      error={formik.touched.factAddress && Boolean(formik.errors.factAddress)}
                      helperText={formik.touched.factAddress && formik.errors.factAddress}
                      disabled={checked || readOnly}
                    />
                    <CheckBox
                      sx={{ ml: -1 }}
                      label="Совпадает с адресом регистрации"
                      checked={checked}
                      onChange={handleCheckboxChange}
                      disabled={readOnly}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      label="Количество сотрудников (опционально)"
                      name="employeesCountId"
                      id="employeesCountId"
                      value={formik.values.employeesCountId}
                      options={employeeCountState.data?.data.map((item) => ({ value: item.id, label: item.name }))}
                      onChange={(e) => formik.setFieldValue('employeesCountId', e.target.value)}
                      disabled={readOnly}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={companyType}
                      name="owner"
                      id="owner"
                      onFocus={() => formik.setFieldTouched('owner', false)}
                      onBlur={() => formik.setFieldTouched('owner', true)}
                      value={formik.values.owner}
                      onChange={formik.handleChange}
                      error={formik.touched.owner && Boolean(formik.errors.owner)}
                      helperText={formik.touched.owner && formik.errors.owner}
                      disabled={readOnly}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*</WhiteContainer>*/}
      </Grid>
    </Grid>
  );
};

export default MainInfo;
