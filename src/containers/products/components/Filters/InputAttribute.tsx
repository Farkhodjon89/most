import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { TextField } from '../../../../components/Textfield';
import { useStyles } from './index';

const InputAttribute = ({ attribute, queryParams, onAttributeChange }) => {
  const { classes } = useStyles();
  const queryValue = queryParams[`a[${attribute.type}][${attribute.id}]`] || '';
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      attribute: queryValue,
    },
    onSubmit: (values) => {
      if (values.attribute !== '') {
        onAttributeChange(`a[${attribute.type}][${attribute.id}]`, values.attribute);
      } else {
        onAttributeChange(`a[${attribute.type}][${attribute.id}]`, undefined);
      }
    },
  });

  // в случае удаления данного фильтра крестик
  useEffect(() => {
    if (queryValue === '') {
      formik.resetForm();
    }
  }, [queryValue]);

  const handleChange = (e) => {
    formik.setFieldValue('attribute', e.target.value);
    clearTimeout(timerID);
    const id = setTimeout(formik.handleSubmit, 2000);
    setTimerID(id);
  };

  return (
    <Accordion disableGutters elevation={0} square className={classes.root}>
      <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
        <Typography className={classes.typography}>{attribute.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            placeholder="Введите значение"
            name="attribute"
            size={'extraSmall'}
            onFocus={() => formik.setFieldTouched('attribute', false)}
            onBlur={() => formik.setFieldTouched('attribute', true)}
            value={formik.values.attribute}
            onChange={handleChange}
            error={formik.touched.attribute && Boolean(formik.errors.attribute)}
            helperText={formik.touched.attribute && formik.errors.attribute}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default InputAttribute;
