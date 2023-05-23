import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { TextField } from '../../../../components/Textfield';
import { black } from '../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterInput = ({ title, queryParams, onFilterChange }: any) => {
  const { classes } = useStyles();
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      minOrder: queryParams['min_order'] || '',
    },
    onSubmit: (values) => {
      if (values.minOrder !== '') {
        onFilterChange('min_order', values.minOrder);
      } else {
        onFilterChange('min_order', undefined);
      }
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue('minOrder', e.target.value);
    clearTimeout(timerID);
    const id = setTimeout(() => formik.handleSubmit(), 2000);
    setTimerID(id);
  };

  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <TextField
        fullWidth
        // label="Фамилия"
        placeholder={'Укажите кол-во'}
        name="minOrder"
        size={'extraSmall'}
        onFocus={() => formik.setFieldTouched('minOrder', false)}
        onBlur={() => formik.setFieldTouched('minOrder', true)}
        value={formik.values.minOrder}
        onChange={handleChange}
        error={formik.touched.minOrder && Boolean(formik.errors.minOrder)}
        helperText={formik.touched.minOrder && formik.errors.minOrder}
      />
    </>
  );
};

export default FilterInput;
