import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import CodeInput from '../../../components/CodeInput';

const CodeInputGroup = () => {
  //======Code Input=====//
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });

  const handleCode = (value: any) => {
    setCode({ value: value, isValid: true, message: '' });
  };

  //======Code Input end=====//
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Code Input</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={6}>
            <CodeInput
              value={code.value}
              onChange={handleCode}
              error={!code.isValid}
              helperText={code.message}
              loading={false}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeInput
              value={code.value}
              onChange={handleCode}
              error={true}
              helperText={code.message}
              loading={false}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeInput
              value={code.value}
              onChange={handleCode}
              error={!code.isValid}
              helperText={code.message}
              loading={true}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CodeInputGroup;
