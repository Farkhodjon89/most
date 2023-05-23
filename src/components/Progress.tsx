import { Box, LinearProgress } from '@mui/material';
import React, { FC } from 'react';
import { mainBlue300, mainBlue900 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<{ value: number }>()((theme, { value }) => ({
  progressContainer: {
    position: 'relative',
  },
  progressRoot: {
    'height': 24,
    'borderRadius': 8,
    'backgroundColor': mainBlue300,
    '& .MuiLinearProgress-barColorPrimary': {
      'backgroundColor': mainBlue900,
      'borderRadius': 8,
      'transform': value < 15 ? 'translate(-85%) !important' : 'auto',
      '&::after': {
        content: `"${value}%"`,
        position: 'absolute',
        right: value < 10 ? 10 : 7,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#fff',
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
}));

const Progress: FC<{ value: number }> = ({ value }) => {
  const { classes } = useStyles({ value });
  return (
    <Box className={classes.progressContainer}>
      <LinearProgress value={value} variant="determinate" classes={{ root: classes.progressRoot }} />
    </Box>
  );
};

export default Progress;
