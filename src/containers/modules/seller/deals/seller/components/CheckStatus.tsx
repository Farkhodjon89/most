import { Grid, Typography } from '@mui/material';

import UncheckedStatus from '../../../../../../components/icons/UncheckedStatus';
import { monoGrey } from '../../../../../../styles/colorPalette';

const CheckStatus = ({ icon = <UncheckedStatus />, text = 'Согласовано продавцом', color = monoGrey }: any) => {
  return (
    <Grid container spacing={1}>
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography sx={{ fontSize: 14, lineHeight: '20px', color: color }}>{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default CheckStatus;
