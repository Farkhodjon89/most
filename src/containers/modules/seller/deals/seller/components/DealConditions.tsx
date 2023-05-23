import { Box, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blue, monoDarkBlack } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  name: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: blue,
    fontWeight: 600,
  },
  valueText: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
    fontWeight: 600,
    marginLeft: '20px',
  },
}));

const DealConditions = ({ condition }) => {
  const { classes } = useStyles();

  return (
    <Grid item xs={3}>
      <Stack spacing={1}>
        <Box display={'flex'} alignItems={'center'}>
          {condition.icon}
          <Typography ml={1} className={classes.name}>
            {condition.name}
          </Typography>
        </Box>
        <Typography className={classes.valueText}>{condition.value}</Typography>
      </Stack>
    </Grid>
  );
};

export default DealConditions;
