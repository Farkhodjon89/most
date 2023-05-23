import { FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

import Radio from '../../../../../../components/Radio';
import { useStyles } from '../../style';

const RadioGroupAttribute = ({ item, onChange, options, readOnlyMode, isRequired = false }) => {
  const { classes } = useStyles();
  const formik = useFormikContext();
  const handleChange = (e) => {
    if (!readOnlyMode) {
      onChange(item, parseInt(e.target.value));
    }
  };
  return (
    <Grid mb={3} item xs={12}>
      <Grid mb={2}>
        <Typography variant="h4" className={classes.TitleMain}>
          {item.name}
          {isRequired && '*'} <span className={classes.SmallTitleText}>(один из параметров)</span>
        </Typography>
      </Grid>
      <FormGroup>
        <Grid container>
          {options?.map((item, key) => (
            <Grid item key={key} xs={4} className={classes.RadioLabelMain}>
              <FormControlLabel
                disabled={readOnlyMode}
                value={item.id}
                control={<Radio checked={formik.values.attributes.some((attr) => attr.value === item.id)} />}
                label={item.name}
                onClick={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default RadioGroupAttribute;
