import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';

import Progress from '../../../components/Progress';

const ProgressGroup = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Progress</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Progress value={0} />
          </Grid>
          <Grid item xs={3}>
            <Progress value={50} />
          </Grid>
          <Grid item xs={3}>
            <Progress value={100} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProgressGroup;
