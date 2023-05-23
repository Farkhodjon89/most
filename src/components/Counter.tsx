import { Button, ButtonGroup } from '@mui/material';
import cx from 'classnames';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { monoDarkBlack, monoLightGrey2 } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    'border': `1px solid ${monoLightGrey2}`,
    'borderRadius': '8px',
    'width': 'fit-content',
    'marginBottom': 4,
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
      borderRight: '1px solid transparent',
    },
    '& .MuiButtonGroup-grouped': {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: '20px',
      color: monoDarkBlack,
    },
  },
  icon: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Counter = ({ counter, setCounter }: { counter: number; setCounter: (value: number) => void }) => {
  const { classes } = useStyles();

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  return (
    <ButtonGroup className={classes.root} variant="text" size="small">
      <Button disabled={counter <= 0} onClick={handleDecrement}>
        <i className={cx('ui_minus', classes.icon)}></i>
      </Button>
      <Button style={{ color: monoDarkBlack }} disabled>
        {counter}
      </Button>
      <Button onClick={handleIncrement}>
        <i className={cx('ui_plus', classes.icon)}></i>
      </Button>
    </ButtonGroup>
  );
};

export default Counter;
