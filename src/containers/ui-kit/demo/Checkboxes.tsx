import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Checkboxes = () => {
  //======CheckBoxesGroup====//
  const [checkBoxesGroup, setCheckBoxesGroup] = useState([
    { value: 'manufacturer', name: 'Производитель', isCheck: false },
    { value: 'company', name: 'Торговая компания', isCheck: false },
    { value: 'agent', name: 'Агент', isCheck: false },
  ]);
  //======CheckBoxesGroup end=====//
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Checkboxes</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Checkbox arr={checkBoxesGroup} setArr={setCheckBoxesGroup} />
          </Grid>
          <Grid item xs={12}>
            <Checkbox arr={checkBoxesGroup} setArr={setCheckBoxesGroup} border />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Gilad Gray" />
              <FormControlLabel control={<Checkbox />} label="Jason Killian" />
              <FormControlLabel control={<Checkbox />} label="Antoine Llorca" />
            </FormGroup>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Checkboxes;
