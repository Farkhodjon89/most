import { Accordion, AccordionDetails, AccordionSummary, InputAdornment, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { OutlinedTextField } from 'components/Textfield';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { useStyles } from '../index';

const FilterRangeInput = ({ title, attributes, onAttributeChange }: any) => {
  const { classes } = useStyles();
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      [attributes[0].name]: attributes[0].value || '',
      [attributes[1].name]: attributes[1].value || '',
    },
    onSubmit: () => {
      //do nothing
    },
  });
  // // в случае удаления данного фильтра крестик
  // useEffect(() => {
  //   formik.setFieldValue(attributes[0].name, attributes[0].value);
  //   formik.setFieldValue(attributes[1].name, attributes[1].value);
  // }, [attributes]);

  const handleChange = (name, value) => {
    formik.setFieldValue(name, value);
    clearTimeout(timerID);
    const id = setTimeout(() => onAttributeChange(name, value), 2000);
    setTimerID(id);
  };

  return (
    <>
      <Accordion disableGutters elevation={0} square className={classes.root} defaultExpanded>
        <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
          <Typography className={classes.typography} variant={'h4'}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" alignItems={'center'} display={'flex'} spacing={2} sx={{ mt: 1 }}>
            <OutlinedTextField
              size={'extraSmall'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography>От</Typography>
                  </InputAdornment>
                ),
              }}
              name={attributes[0].name}
              onFocus={() => formik.setFieldTouched(attributes[0].name, false)}
              onBlur={() => formik.setFieldTouched(attributes[0].name, true)}
              value={formik.values[attributes[0].name]}
              onChange={(e) => handleChange(attributes[0].name, e.target.value)}
              error={formik.touched[attributes[0].name] && Boolean(formik.errors[attributes[0].name])}
              helperText={formik.touched[attributes[0].name] && formik.errors[attributes[0].name]}
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
              name={attributes[1].name}
              onFocus={() => formik.setFieldTouched(attributes[1].name, false)}
              onBlur={() => formik.setFieldTouched(attributes[1].name, true)}
              value={formik.values[attributes[1].name]}
              onChange={(e) => handleChange(attributes[1].name, e.target.value)}
              error={formik.touched[attributes[1].name] && Boolean(formik.errors[attributes[1].name])}
              helperText={formik.touched[attributes[1].name] && formik.errors[attributes[1].name]}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterRangeInput;
