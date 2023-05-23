import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import Radio from '../../../components/Radio';
import RadioGroupCustom from '../../../components/RadioGroup';
import { black } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '20px',
    color: black,
  },
}));

const mockForRadio = [
  { value: 'manufacturer', name: 'г. Москва, ул. ' },
  { value: 'company', name: 'г. Москва, ул.' },
];

const FilterLocation = ({ title }: any) => {
  const { classes } = useStyles();
  const [radioValue, setRadioValue] = useState('manufacturer');

  return (
    <Box>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <Grid item xs={12}>
        <RadioGroupCustom control={<Radio />} items={mockForRadio} value={radioValue} setValue={setRadioValue} />
      </Grid>
    </Box>
  );
};

export default FilterLocation;
