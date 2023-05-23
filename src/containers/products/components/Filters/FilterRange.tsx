import { InputAdornment, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { OutlinedTextField } from '../../../../components/Textfield';
import { black } from '../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterRange = ({ title, onFilterChange, queryParams, minName, maxName }: any) => {
  const { classes } = useStyles();
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      [minName]: queryParams[minName] || '',
      [maxName]: queryParams[maxName] || '',
    },
    onSubmit: () => {
      //do nothing
    },
  });

  const handleChange = (name, value) => {
    formik.setFieldValue(name, value);
    clearTimeout(timerID);
    const id = setTimeout(() => onFilterChange(name, value), 2000);
    setTimerID(id);
  };

  return (
    <>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <Stack direction="row" alignItems={'center'} display={'flex'} spacing={2}>
        <OutlinedTextField
          size={'extraSmall'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography>От</Typography>
              </InputAdornment>
            ),
          }}
          name={minName}
          onFocus={() => formik.setFieldTouched(minName, false)}
          onBlur={() => formik.setFieldTouched(minName, true)}
          value={formik.values[minName]}
          onChange={(e) => handleChange(minName, e.target.value)}
          error={formik.touched[minName] && Boolean(formik.errors[minName])}
          helperText={formik.touched[minName] && formik.errors[minName]}
        />
        <Typography> - </Typography>
        <OutlinedTextField
          size={'extraSmall'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography>До</Typography>
              </InputAdornment>
            ),
          }}
          name={maxName}
          onFocus={() => formik.setFieldTouched(maxName, false)}
          onBlur={() => formik.setFieldTouched(maxName, true)}
          value={formik.values[maxName]}
          onChange={(e) => handleChange(maxName, e.target.value)}
          error={formik.touched[maxName] && Boolean(formik.errors[maxName])}
          helperText={formik.touched[maxName] && formik.errors[maxName]}
        />
      </Stack>
    </>
  );
};

export default FilterRange;
