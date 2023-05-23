import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

import { InputSelector, TextField } from '../../../../../../components/Textfield';
import WhiteContainer from '../../../../../../components/WhiteContainer';
import { useStyles } from '../../style';
import Checkbox from './Checkbox';
import CheckboxInputGroup from './CheckboxInputGroup';

const PaymentTerms = ({ readOnlyMode = false }) => {
  const { classes } = useStyles();
  const formik = useFormikContext();
  return (
    <WhiteContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.Title}>
            Варианты оплаты*
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Стоимость единицы поставки"
            name="price"
            onFocus={() => formik.setFieldTouched('price', false)}
            onBlur={() => formik.setFieldTouched('price', true)}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            disabled={readOnlyMode}
            InputProps={{
              endAdornment: (
                <InputSelector
                  selectedValue={formik.values.priceUnitId}
                  disabled={readOnlyMode}
                  onChange={(e) => formik.setFieldValue('priceUnitId', e.target.value)}
                  options={[
                    {
                      value: 1,
                      label: '₽',
                    },
                  ]}
                />
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Скидка, %"
            name="sale"
            onFocus={() => formik.setFieldTouched('sale', false)}
            onBlur={() => formik.setFieldTouched('sale', true)}
            value={formik.values.sale}
            onChange={formik.handleChange}
            error={formik.touched.sale && Boolean(formik.errors.sale)}
            helperText={formik.touched.sale && formik.errors.sale}
            disabled={readOnlyMode}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Наценка, %"
            name="additionalMarkup"
            onFocus={() => formik.setFieldTouched('additionalMarkup', false)}
            onBlur={() => formik.setFieldTouched('additionalMarkup', true)}
            value={formik.values.additionalMarkup}
            onChange={formik.handleChange}
            error={formik.touched.additionalMarkup && Boolean(formik.errors.additionalMarkup)}
            helperText={formik.touched.additionalMarkup && formik.errors.additionalMarkup}
            disabled={readOnlyMode}
          />
        </Grid>
        <Grid item xs={6}>
          <CheckboxInputGroup readOnlyMode={readOnlyMode} border={false} />
        </Grid>
        <Grid item xs={6} className={classes.labelTextMain}>
          <Checkbox readOnlyMode={readOnlyMode} border={false} />
        </Grid>
      </Grid>
    </WhiteContainer>
  );
};

export default PaymentTerms;
