import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';

import ProductTable from '../../modules/seller/products/components/ProductTable';

const TableGroup = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid item xs={12}>
          <Typography variant="h5">Table</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <ProductTable />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TableGroup;
