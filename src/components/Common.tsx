import { FormControlLabel, Radio, RadioGroup as DefaultRadioGroup } from '@mui/material';

export const RadioGroup = () => {
  return (
    <DefaultRadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
      <FormControlLabel value="disabled" disabled control={<Radio />} label="other" />
    </DefaultRadioGroup>
  );
};
