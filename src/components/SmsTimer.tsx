import { Typography } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
import { CountdownTimeDelta } from 'react-countdown/dist/utils';
import { monoDarkBlack } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

type Props = {
  handleComplete: () => void;
  value: number;
  handleTick: (time: CountdownTimeDelta) => void;
};
const useCountDownStyles = makeStyles<any>()((theme, { color, width }) => ({
  root: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    color,
    marginTop: 0,
    cursor: 'default',
    width: width ? width : 'auto',
  },
}));

type CountdownTimeProps = {
  time: string;
  color: string;
  width?: number;
};

const SmsTimer: React.FC<Props> = ({ handleComplete, value, handleTick }) => {
  return (
    <Countdown
      date={Date.now() + value * 1000}
      onComplete={handleComplete}
      onTick={handleTick}
      renderer={renderer}
      overtime
    />
  );
};

const renderer = ({ completed, formatted }) => {
  if (completed) {
    // Render a completed state
    return <CountdownTime time={'00:00'} color={monoDarkBlack} />;
  }
  return <CountdownTime color={monoDarkBlack} time={`${formatted.minutes}:${formatted.seconds}`} />;
};

const CountdownTime: React.FC<CountdownTimeProps> = ({ time, color, width = null }) => {
  const { classes } = useCountDownStyles({ color, width });
  return (
    <Typography component={'span'} className={classes.root}>
      {time}
    </Typography>
  );
};

export default SmsTimer;
