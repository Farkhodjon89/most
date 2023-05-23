import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import List from '../../../components/List';

export const CategoryList = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">List</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Paper sx={{ width: '100%' }}>
                <List
                  selectedValue={1}
                  options={[
                    { value: 1, label: 'Отрасль 1' },
                    { value: 2, label: 'Отрасль 2' },
                    { value: 3, label: 'Отрасль 3' },
                    { value: 4, label: 'Отрасль 4' },
                    { value: 5, label: 'Отрасль 5' },
                    { value: 6, label: 'Отрасль 6' },
                    { value: 7, label: 'Отрасль 7' },
                    { value: 8, label: 'Отрасль 8' },
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ width: '100%' }}>
                <List
                  selectedValue={1}
                  options={[
                    { value: 1, label: 'Отрасль 1' },
                    { value: 2, label: 'Отрасль 2' },
                    { value: 3, label: 'Отрасль 3' },
                    { value: 4, label: 'Отрасль 4' },
                    { value: 5, label: 'Отрасль 5' },
                    { value: 6, label: 'Отрасль 6' },
                    { value: 7, label: 'Отрасль 7' },
                    { value: 8, label: 'Отрасль 8' },
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ width: '100%' }}>
                <List
                  selectedValue={1}
                  options={[
                    { value: 1, label: 'Отрасль 1' },
                    { value: 2, label: 'Отрасль 2' },
                    { value: 3, label: 'Отрасль 3' },
                    { value: 4, label: 'Отрасль 4' },
                    { value: 5, label: 'Отрасль 5' },
                    { value: 6, label: 'Отрасль 6' },
                    { value: 7, label: 'Отрасль 7' },
                    { value: 8, label: 'Отрасль 8' },
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ width: '100%' }}>
                <List
                  selectedValue={1}
                  options={[
                    { value: 1, label: 'Отрасль 1' },
                    { value: 2, label: 'Отрасль 2' },
                    { value: 3, label: 'Отрасль 3' },
                    { value: 4, label: 'Отрасль 4' },
                    { value: 5, label: 'Отрасль 5' },
                    { value: 6, label: 'Отрасль 6' },
                    { value: 7, label: 'Отрасль 7' },
                    { value: 8, label: 'Отрасль 8' },
                  ]}
                />
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
