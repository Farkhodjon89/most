import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { useStyles } from '../index';

const FilterCheckbox = ({
  attribute,
  onAttributeChange,
  chooseOne,
}: {
  attribute: any;
  onAttributeChange: any;
  chooseOne?: boolean;
}) => {
  const { classes } = useStyles();
  const queryValues =
    (attribute.values &&
      (Array.isArray(attribute.values) ? attribute.values : [attribute.values])?.map((id) => String(id))) ||
    [];

  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedValues: queryValues,
    },
    onSubmit: () => {
      onAttributeChange(attribute.name, formik.values.selectedValues);
    },
  });

  // в случае удаления данного фильтра крестик
  // useEffect(() => {
  //   formik.setFieldValue('selectedValues', attribute.values || []);
  // }, [queryValues]);

  const handleChange = (e, value) => {
    let valuesArr = [...formik.values.selectedValues];

    if (!e.target.checked) {
      valuesArr = valuesArr.filter((val) => val !== value);
    } else {
      if (chooseOne) {
        valuesArr = [value];
      } else {
        valuesArr.push(value);
      }
    }
    formik.setFieldValue('selectedValues', valuesArr);
    clearTimeout(timerID);
    const id = setTimeout(formik.handleSubmit, 2000);
    setTimerID(id);
  };

  return (
    <Accordion disableGutters elevation={0} square className={classes.root} defaultExpanded>
      <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
        <Typography className={classes.typography}>{attribute.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {attribute.options.map((option, key) => {
          return (
            <FormControlLabel
              key={key}
              value={option.value}
              control={
                <Checkbox
                  checked={formik.values.selectedValues.map((val) => String(val)).includes(String(option.value))}
                  onChange={(e) => handleChange(e, option.value)}
                />
              }
              label={option.label}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterCheckbox;
