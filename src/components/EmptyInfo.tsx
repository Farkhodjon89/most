import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoDarkBlack } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(24),
    color: monoDarkBlack,
  },
  description: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(24),
    color: monoDarkBlack,
  },
}));

const EmptyInfo = ({ title, description, Buttons, image = '/img/logo_only.svg' }: any) => {
  const { classes } = useStyles();

  return (
    <Box m={4} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 600 }}>
        <Stack spacing={3} display={'flex'} alignItems={'center'}>
          <img src={image} alt="" style={{ width: 155 }} />
          <Typography component={'h1'} className={classes.title}>
            {title}
          </Typography>
          <Typography align={'center'} className={classes.description}>
            {description}
          </Typography>
          {Buttons}
        </Stack>
      </Box>
    </Box>
  );
};

export default EmptyInfo;
