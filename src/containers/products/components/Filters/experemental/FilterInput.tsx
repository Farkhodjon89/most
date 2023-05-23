import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import cx from 'classnames';
import { TextField } from 'components/Textfield';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { useStyles } from '../index';

const FilterInput = ({ attribute, onAttributeChange }: any) => {
  const { classes } = useStyles();
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      attributeValue: attribute.value || '',
    },
    onSubmit: (values) => {
      if (values.attributeValue !== '') {
        onAttributeChange(attribute.name, values.attributeValue);
      } else {
        onAttributeChange(attribute.name, undefined);
      }
    },
  });

  // в случае удаления данного фильтра крестик
  useEffect(() => {
    if (attribute.value === '') {
      formik.resetForm();
    }
  }, [attribute.value]);

  const handleChange = (e) => {
    formik.setFieldValue('attributeValue', e.target.value);
    clearTimeout(timerID);
    const id = setTimeout(() => formik.handleSubmit(), 2000);
    setTimerID(id);
  };

  return (
    <>
      <Accordion disableGutters elevation={0} square className={classes.root} defaultExpanded>
        <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
          <Typography className={classes.typography} variant={'h4'}>
            {attribute.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mt={1}>
            <TextField
              fullWidth
              // label="Фамилия"
              placeholder={'Введите'}
              name="attributeValue"
              size={'extraSmall'}
              onFocus={() => formik.setFieldTouched('attributeValue', false)}
              onBlur={() => formik.setFieldTouched('attributeValue', true)}
              value={formik.values.attributeValue}
              onChange={handleChange}
              error={formik.touched.attributeValue && Boolean(formik.errors.attributeValue)}
              helperText={formik.touched.attributeValue && formik.errors.attributeValue}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterInput;
