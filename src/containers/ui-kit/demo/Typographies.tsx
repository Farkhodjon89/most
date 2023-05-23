import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';

const Typographies = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Typography variant="h5">Typography</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography sx={{ fontWeight: 400 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. 123456789
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. 123456789
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. 123456789
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. 123456789
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Typographies;
