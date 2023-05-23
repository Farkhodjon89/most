import { Grid, Typography } from '@mui/material';
import Select from 'components/Select';
import { TextField } from 'components/Textfield';
import WhiteContainer from 'components/WhiteContainer';
import { SHIPMENT_TIME } from 'const';
import { useStore } from 'context/StoreContext';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';

import { useStyles } from '../../style';

const SaleTerms: FC<any> = ({ readOnlyMode = false }) => {
  const { units } = useStore();
  const formik = useFormikContext();
  const { classes } = useStyles();
  const mainSelectedCategory = formik.values.selectedCategories.find((item) => item.isMain);

  const handleInputChange = (type, unitId, value) => {
    const termsArr = [...formik.values.terms];
    for (const item of termsArr) {
      if (item.typeId === type) {
        item.value = value;
      }
    }

    formik.setFieldValue('terms', termsArr);
  };

  const handleSelectChange = (type, unitId) => {
    const termsArr = [...formik.values.terms];
    for (const item of termsArr) {
      if (item.typeId === type) {
        item.unitId = unitId;
      }
    }

    formik.setFieldValue('terms', termsArr);
  };

  if (mainSelectedCategory?.subCategoryId === 0 || units === null) {
    return null;
  }

  return (
    <WhiteContainer>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography component="h3" className={classes.Title}>
            Условия продажи и отгрузки
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>Товар*</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container rowSpacing={3} columnSpacing={1}>
                    <Grid item xs={6}>
                      <Select
                        label={'Ед. измерения товара'}
                        value={formik.values.terms[0].unitId || null}
                        options={units.QUANTITY_PRODUCT.map((item) => ({ value: item.id, label: item.name }))}
                        onChange={(e) => handleSelectChange(1, e.target.value)}
                        onFocus={() => formik.setFieldTouched('terms_1_unitId', false)}
                        onBlur={() => formik.setFieldTouched('terms_1_unitId', true)}
                        error={formik.touched.terms_1_unitId && Boolean(formik.errors.terms?.[0]?.unitId)}
                        helperText={formik.touched.terms_1_unitId && formik.errors.terms?.[0]?.unitId}
                        disabled={readOnlyMode}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Кол-во товара в ед. измерения поставки"
                        onFocus={() => formik.setFieldTouched('terms_1_value', false)}
                        onBlur={() => formik.setFieldTouched('terms_1_value', true)}
                        value={formik.values.terms.find((item) => item.typeId === 1)?.value}
                        onChange={(e) => handleInputChange(1, 0, e.target.value)}
                        error={formik.touched.terms_1_value && Boolean(formik.errors.terms?.[0]?.value)}
                        helperText={formik.touched.terms_1_value && formik.errors.terms?.[0]?.value}
                        disabled={readOnlyMode}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        label={'Ед.измерения поставки'}
                        options={units.MINIMUM_SCOPE_DELIVERY.map((item) => ({ value: item.id, label: item.name }))}
                        value={formik.values.terms[1].unitId || null}
                        onChange={(e) => handleSelectChange(2, e.target.value)}
                        onFocus={() => formik.setFieldTouched('terms_2_unitId', false)}
                        onBlur={() => formik.setFieldTouched('terms_2_unitId', true)}
                        error={formik.touched.terms_2_unitId && Boolean(formik.errors.terms?.[1]?.unitId)}
                        helperText={formik.touched.terms_2_unitId && formik.errors.terms?.[1]?.unitId}
                        disabled={readOnlyMode}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Мин. объем поставки"
                        onFocus={() => formik.setFieldTouched('terms_2_value', false)}
                        onBlur={() => formik.setFieldTouched('terms_2_value', true)}
                        value={formik.values.terms.find((item) => item.typeId === 2)?.value}
                        onChange={(e) => handleInputChange(2, 0, e.target.value)}
                        error={formik.touched.terms_2_value && Boolean(formik.errors.terms?.[1]?.value)}
                        helperText={formik.touched.terms_2_value && formik.errors.terms?.[1]?.value}
                        disabled={readOnlyMode}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>Отгрузка*</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container rowSpacing={3} columnSpacing={1}>
                    <Grid item xs={6}>
                      <Select
                        label={'Ед.измерения отгрузки'}
                        options={SHIPMENT_TIME}
                        disabled
                        InputProps={{
                          shrink: false,
                        }}
                        value={1}
                        // onChange={(e) => handleSelectChange(3, e.target.value)}
                        // onFocus={() => formik.setFieldTouched('terms_3_unitId', false)}
                        // onBlur={() => formik.setFieldTouched('terms_3_unitId', true)}
                        // error={formik.touched.terms_3_unitId && Boolean(formik.errors.terms?.[2]?.unitId)}
                        // helperText={formik.touched.terms_3_unitId && formik.errors.terms?.[2]?.unitId}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Срок отгрузки"
                        name={'shipmentTime'}
                        onFocus={() => formik.setFieldTouched('shipmentTime', false)}
                        onBlur={() => formik.setFieldTouched('shipmentTime', true)}
                        value={formik.values.shipmentTime}
                        onChange={formik.handleChange}
                        // onChange={(e) => handleInputChange(3, 0, e.target.value)}
                        error={formik.touched.shipmentTime && Boolean(formik.errors.shipmentTime)}
                        helperText={formik.touched.shipmentTime && formik.errors.shipmentTime}
                        disabled={readOnlyMode}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WhiteContainer>
  );
};

export default SaleTerms;
