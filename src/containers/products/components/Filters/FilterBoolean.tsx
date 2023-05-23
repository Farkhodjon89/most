import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import Radio from '../../../../components/Radio';
import { useStyles } from './index';

const FilterBoolean = ({ attribute, queryParams, onAttributeChange }) => {
  const { classes } = useStyles();
  const queryValue = queryParams[`a[${attribute.type}][${attribute.id}]`] || '';
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedValue: parseInt(queryValue) || -1,
    },
    onSubmit: () => {
      onAttributeChange(`a[${attribute.type}][${attribute.id}]`, formik.values.selectedValue);
    },
  });

  // в случае удаления данного фильтра крестик
  useEffect(() => {
    if (queryValue === '') {
      formik.resetForm();
    }
  }, [queryValue]);

  const handleChange = (e) => {
    formik.setFieldValue('selectedValue', e.target.value);
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
        <FormControlLabel
          value={1}
          control={<Radio checked={parseInt(formik.values.selectedValue) === 1} />}
          label={'Да'}
          onClick={handleChange}
        />
        <FormControlLabel
          value={0}
          control={<Radio checked={parseInt(formik.values.selectedValue) === 0} />}
          label={'Нет'}
          onClick={handleChange}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterBoolean;
