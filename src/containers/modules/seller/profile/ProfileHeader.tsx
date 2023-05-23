import { Grid, Stack, Typography } from '@mui/material';
import Progress from 'components/Progress';
import { PageTitle } from 'components/Typography';
import React, { FC } from 'react';
import { monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  text: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    color: monoGrey,
    lineHeight: '117%',
  },
}));

const ProfileHeader: FC<any> = ({ title = 'Профиль компании', progress, status, hideProgress = false }) => {
  const { classes } = useStyles();
  return (
    <Grid container alignItems={'center'} justifyContent="space-between">
      <Grid item>
        <PageTitle text={title} />
        {(status === 'draft' || status === 'on_verification') && (
          <Typography sx={{ color: monoGrey, fontSize: 14 }}>(данные не подтверждены)</Typography>
        )}
        {/*{status === 'verified' && <Typography sx={{ color: mainGreen900, fontSize: 14 }}>(верифицирован)</Typography>}*/}
      </Grid>
      <Grid item xs={2.8}>
        {!hideProgress && (
          <Stack spacing={0.5}>
            <Progress value={progress} />
            <Typography className={classes.text}>
              Заполните профиль на 100%, чтобы получить более высокий рейтинг в выдаче
            </Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
