import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { useStyles } from './index';

const ListMultipleAttribute = ({ attribute, queryParams, onAttributeChange }) => {
  const { classes } = useStyles();
  const queryValue = queryParams[`a[${attribute.type}][${attribute.id}]`] || [];
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedValues: queryValue || [],
    },
    onSubmit: () => {
      onAttributeChange(`a[${attribute.type}][${attribute.id}]`, formik.values.selectedValues);
    },
  });

  // в случае удаления данного фильтра крестик
  useEffect(() => {
    if (queryValue.length > 0) {
      formik.resetForm();
    }
  }, [queryValue]);

  const handleChange = (e, value) => {
    let valuesArr = [...formik.values.selectedValues];

    if (!e.target.checked) {
      valuesArr = valuesArr.filter((val) => val !== value);
    } else {
      valuesArr.push(value);
    }
    formik.setFieldValue('selectedValues', valuesArr);
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
        {attribute.variants.map((variant, key) => {
          return (
            <FormControlLabel
              key={key}
              value={variant.id}
              control={
                <Checkbox
                  checked={formik.values.selectedValues.map((val) => parseInt(val)).includes(variant.id)}
                  onChange={(e) => handleChange(e, variant.id)}
                />
              }
              label={variant.name}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default ListMultipleAttribute;
