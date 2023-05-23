import { Grid } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  smallWrapper: {
    maxWidth: '632px',
    margin: '0 auto',
    paddingTop: '40px',
  },
}));

const SmallWrapp = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.smallWrapper}>
      {children}
    </Grid>
  );
};

export default SmallWrapp;
