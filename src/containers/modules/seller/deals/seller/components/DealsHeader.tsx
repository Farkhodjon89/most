import { AccordionSummary, Grid, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { blue, mainBlue900, monoDarkBlack } from '../../../../../../styles/colorPalette';
import DealConditions from './DealConditions';

const useStyles = makeStyles()((theme) => ({
  downArrowIcon: {
    fontSize: theme.typography.pxToRem(12),
    color: mainBlue900,
  },
  dealTitle: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
    lineHeight: '24px',
    color: monoDarkBlack,
  },
  date: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: blue,
  },
}));

const DealsHeader = ({ data, date }) => {
  const { classes } = useStyles();
  return (
    <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
      <Stack mb={2} spacing={1}>
        <Typography className={classes.date}>{date}</Typography>
        <Typography className={classes.dealTitle} variant={'h4'}>
          Согласованы условия сделки
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {data.map((condition) => (
          <DealConditions key={condition.id} condition={condition} />
        ))}
      </Grid>
    </AccordionSummary>
  );
};

export default DealsHeader;
