import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import { decamelize } from 'humps';
import React, { FC, useState } from 'react';

import { useStyles } from '../index';

/**
 * deprecated
 * @param queryParams
 * @param onAttributeChange
 * @constructor
 */
const PaymentTerms: FC<any> = ({ queryParams, onAttributeChange }) => {
  const { classes } = useStyles();
  // const queryValues = attribute.values?.map((id) => parseInt(id)) || [];

  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      isPrepayment: parseInt(queryParams['is_prepayment']) || 0,
      isPostpayment: parseInt(queryParams['is_postpayment']) || 0,
    },
    onSubmit: () => {
      // onAttributeChange(attribute.name, formik.values.selectedValues);
    },
  });

  // в случае удаления данного фильтра крестик
  // useEffect(() => {
  //   formik.setFieldValue('selectedValues', attribute.values || []);
  // }, [queryValues]);

  const handleChange = (e, name) => {
    formik.setFieldValue(name, +e.target.checked);
    clearTimeout(timerID);
    const id = setTimeout(() => onAttributeChange(decamelize(name), +e.target.checked), 2000);
    setTimerID(id);
  };

  return (
    <Accordion className={classes.root} defaultExpanded>
      <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
        <Typography className={classes.typography}>{'Условия оплаты'}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControlLabel
          control={<Checkbox checked={formik.values.isPrepayment} onChange={(e) => handleChange(e, 'isPrepayment')} />}
          label={'Предоплата'}
        />
        <FormControlLabel
          control={
            <Checkbox checked={formik.values.isPostpayment} onChange={(e) => handleChange(e, 'isPostpayment')} />
          }
          label={'Постоплата'}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default PaymentTerms;
