import { Box, Grid } from '@mui/material';
import cx from 'classnames';
import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue800,
  mainGreen800,
  mainGreen900,
  monoBgGrey,
  monoGrey,
  monoLightGrey1,
} from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  smallWrapper: {
    margin: '0 auto',
  },
  registrationStage: {
    display: 'flex',
    marginBottom: '20px',
  },
  registrationItem: {
    'position': 'relative',

    'registrationLink': {
      display: 'flex',
    },
    '&:last-child': {
      'marginRight': 0,
      '&:before': {
        content: 'none',
      },
    },
    '&:before': {
      content: `''`,
      position: 'absolute',
      width: '10px',
      height: '1px',
      right: ' 0',
      top: '50%',
      backgroundColor: '#9A9AA0',
    },
    'color': '#9A9AA0',
    '&.active': {
      '.registrationLink': {
        'backgroundColor': mainBlue800,
        'color': '#FFFFFF',
        '.registrationNum': {
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: '#ffffff',
          color: mainBlue800,
        },
      },
      '.registrationText': {
        color: 'white',
      },
      '&:before': {
        backgroundColor: mainBlue800,
      },
    },
    '&.done': {
      '.registrationLink': {
        'backgroundColor': monoBgGrey,
        'fontWeight': 500,
        '.registrationNum': {
          'backgroundColor': '#ffffff',
          'color': mainGreen800,
          '& span': {
            display: 'none',
            color: mainGreen800,
          },
          '& img': {
            display: 'block',
            color: '#17e19c',
          },
        },
      },
      '.registrationText': {
        color: mainGreen900,
      },
      '&:before': {
        backgroundColor: mainGreen800,
      },
    },
  },
  registrationLink: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '6px 8px',
    gap: '8px',

    height: '32px',

    /* Main Color/Blue/100 */

    backgroundColor: '#F3F3FF',
    borderRadius: '100px',
    marginRight: '8px',
    textDecoration: 'none',
  },
  registrationNum: {
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '14px',
    background: monoLightGrey1,
    borderRadius: '100px',
    color: '#ffffff',
    paddingTop: '2px',
    img: {
      display: 'none',
      color: '#17e19c',
    },
  },
  registrationText: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
    color: monoGrey,
    /* Mono/Gray */

    // color: mainBlue800,
  },
}));

const RegistrationSteps: FC<any> = ({ step }) => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.registrationStage}>
      <Grid className={cx(classes.registrationItem, step === 1 ? 'active' : '', step > 1 ? 'done' : '')}>
        <Box className={cx(classes.registrationLink, 'registrationLink')}>
          <Box className={cx(classes.registrationNum, 'registrationNum')}>
            <span>1</span> <img src="/img/passed.svg" alt="" />
          </Box>
          <Box className={cx(classes.registrationText, 'registrationText')}>Аккаунт</Box>
        </Box>
      </Grid>
      <Grid className={cx(classes.registrationItem, step === 2 ? 'active' : '', step > 2 ? 'done' : '')}>
        <Box className={cx(classes.registrationLink, 'registrationLink')}>
          <Box className={cx(classes.registrationNum, 'registrationNum')}>
            <span>2</span> <img src="/img/passed.svg" alt="" />
          </Box>

          <Box className={cx(classes.registrationText, 'registrationText')}>Почта подтверждена</Box>
        </Box>
      </Grid>
      <Grid className={cx(classes.registrationItem, step === 3 ? 'active' : '')}>
        <Box className={cx(classes.registrationLink, 'registrationLink')}>
          <Box className={cx(classes.registrationNum, 'registrationNum')}>
            <span>3</span> <img src="/img/passed.svg" alt="" />
          </Box>

          <Box className={cx(classes.registrationText, 'registrationText')}>Личная информация</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegistrationSteps;
