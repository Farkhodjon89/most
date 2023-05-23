import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import CheckBox from '../../../components/CheckBox';
import { black } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '20px',
    color: black,
  },
}));

const Filter = ({ title }: any) => {
  const [manufacturer, setManufacturer] = useState(false);
  const [intermediary, setIntermediary] = useState(false);
  const { classes } = useStyles();

  return (
    <Box>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <CheckBox
        label="Прямой производитель"
        checked={manufacturer}
        onChange={(e) => setManufacturer(e.target.checked)}
      />
      <CheckBox label="Посредник" checked={intermediary} onChange={(e) => setIntermediary(e.target.checked)} />
    </Box>
  );
};

export default Filter;
