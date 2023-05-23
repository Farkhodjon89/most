import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography,
} from '@mui/material';

import Radio from '../../../components/Radio';

const Radios = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Radio</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="other" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="other" />
            </RadioGroup>
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <RadioGroupCustom items={mockForRadio} value={radioValue} setValue={setRadioValue} border />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12}>*/}
          {/*  <RadioGroupCustom items={mockForRadio} value={radioValue} setValue={setRadioValue} />*/}
          {/*</Grid>*/}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Radios;
