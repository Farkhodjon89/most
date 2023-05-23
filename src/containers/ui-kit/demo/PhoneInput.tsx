import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import { PhoneInputWithBtn } from '../../../components/PhoneInput';

const PhoneInput = () => {
  //======PhoneInput=====//
  const [phone, setPhone] = useState({ value: '', isValid: true, message: '' });
  const handleChangePhone = (value: string, isValid: boolean) => {
    setPhone({ value, isValid, message: '' });
  };
  //=======PhoneInput end=====//
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">PhoneInput</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PhoneInputWithBtn
              value={phone.value}
              onChange={handleChangePhone}
              error={!phone.isValid}
              helperText={phone.message}
            />
          </Grid>
          <Grid item xs={6}>
            <PhoneInputWithBtn
              value={phone.value}
              onChange={handleChangePhone}
              error={!phone.isValid}
              helperText={phone.message}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <PhoneInputWithBtn
              value={phone.value}
              onChange={handleChangePhone}
              error={true}
              disabled
              helperText={'Некорректный номер'}
            />
          </Grid>

          <Grid item xs={6}>
            <PhoneInputWithBtn
              value={phone.value}
              onChange={handleChangePhone}
              helperText={phone.message}
              error={!phone.isValid}
              loading={true}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default PhoneInput;
