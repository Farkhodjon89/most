import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';

import { Button, ButtonText, SecondaryButton } from '../../../components/Button';

const Buttons = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Buttons</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button>Contained button</Button>
              </Grid>
              <Grid item>
                <Button disabled>Contained button disabled</Button>
              </Grid>
              <Grid item>
                <Button disabled startIcon={<i className="ui_search"></i>}>
                  Contained button with icon
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="outlined">Outlined button</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" disabled>
                  Outlined button disabled
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" disabled startIcon={<i className="ui_search"></i>}>
                  Outlined button with icon
                </Button>
              </Grid>
              <Grid item>
                <Button extraSmall>extraSmall Btn</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button small>Small Contained button</Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SecondaryButton>Secondary Btn</SecondaryButton>
              </Grid>
              <Grid item>
                <SecondaryButton small>Secondary Small Btn</SecondaryButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <ButtonText>Text Button</ButtonText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Buttons;
