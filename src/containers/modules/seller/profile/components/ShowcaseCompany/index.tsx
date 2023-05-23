import { Grid } from '@mui/material';
import { PhoneInputWithBtn } from 'components/PhoneInput';
import TextEditor from 'components/TextEditor';
import { TextField } from 'components/Textfield';
import { FormTitle } from 'components/Typography';
import React, { FC, useEffect } from 'react';
import { showErrors } from 'utils/common';

import { moveToElement } from '../../utils';
import AddLogo from './AddLogo';

const ShowcaseCompany: FC<any> = ({ formik, readOnly, tabKey }) => {
  const handleTextEditor = (data: any) => {
    formik.setFieldValue('description', data);
  };

  useEffect(() => {
    if (formik.errors && formik.values.tabKeyError === tabKey) {
      showErrors(
        { data: Object.entries(formik.errors).reduce((obj, [key, value]) => ({ ...obj, [key]: { text: value } }), {}) },
        formik,
      );

      moveToElement(formik.errors, tabKey);
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container rowSpacing={6.6}>
          <Grid item xs={12}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <AddLogo
                  img={formik.values.avatar?.originalUrl || ''}
                  onUpload={(file) => {
                    formik.setFieldValue('avatar', file);
                  }}
                  disabled={readOnly}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTitle>Описание компании</FormTitle>
                <span id="description" />
                <TextEditor
                  name="description"
                  onFocus={() => formik.setFieldTouched('description', false)}
                  onBlur={() => formik.setFieldTouched('description', true)}
                  value={formik.values.description.value}
                  isValid={!(formik.touched.description && Boolean(formik.errors.description))}
                  helperText={formik.errors.description}
                  onChange={handleTextEditor}
                  readOnly={readOnly}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInputWithBtn
                  id="phone"
                  value={formik.values.phone?.phone || ''}
                  onChange={(phone, data, e, formattedValue) => {
                    formik.setFieldValue('phone', { phone, formattedValue });
                  }}
                  hideLeftContent
                  onFocus={() => formik.setFieldTouched('phone', false)}
                  onBlur={() => formik.setFieldTouched('phone', true)}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  hideLabel
                  disabled={readOnly}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
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
                  disabled={readOnly}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="webLink"
                  fullWidth
                  label="Веб-сайт компании"
                  name="webLink"
                  onFocus={() => formik.setFieldTouched('webLink', false)}
                  onBlur={() => formik.setFieldTouched('webLink', true)}
                  value={formik.values.webLink}
                  onChange={formik.handleChange}
                  error={formik.touched.webLink && Boolean(formik.errors.webLink)}
                  helperText={formik.touched.webLink && formik.errors.webLink}
                  disabled={readOnly}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShowcaseCompany;
