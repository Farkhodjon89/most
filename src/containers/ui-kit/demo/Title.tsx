import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import React from 'react';

import { PageTitle, SmallGrayDescr } from '../../../components/Typography';

const Title = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <PageTitle text="Заголовок страницы" />
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <SmallGrayDescr>SmallGrayDescr</SmallGrayDescr>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Title;
