import { Box, Grid, Typography } from '@mui/material';
import Verification from 'components/icons/Verification';
import React from 'react';
import { helpPeach, monoGrey, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  header: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: '24px 24px 0px 0px',
    borderBottom: `1px solid ${monoLightGrey2}`,
    zIndex: 10,
  },
  headerAvatar: {
    'position': 'relative',
    'width': 40,
    'height': 40,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  status: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: helpPeach,
    borderRadius: '50%',
    border: '1px solid #fff',
    bottom: 0,
    right: 0,
  },
  inn: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: '110%',
  },
  company: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
  },
}));

const ChatHeader = ({ name, inn }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.header}>
      <Grid container columnSpacing={1.25}>
        <Grid item>
          <Box className={classes.headerAvatar}>
            <img src="/img/chat/logo-2.png" alt="логотип покупателя" />
            <i className={classes.status} />
          </Box>
        </Grid>
        <Grid item xs>
          <Grid container columnSpacing={0.5}>
            <Grid item>
              <Typography className={classes.company}>{name}</Typography>
            </Grid>
            <Grid item>
              <Verification />
            </Grid>
          </Grid>
          <Typography className={classes.inn}>ИНН {inn}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHeader;
