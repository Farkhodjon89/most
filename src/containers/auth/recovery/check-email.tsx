import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900 } from '../../../styles/colorPalette';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';

const useStyles = makeStyles()((theme) => ({
  stage: {
    display: 'flex',
    justifyContent: 'center',
  },
  confirm: {},
  inner: {
    backgroundColor: '#F9F9F9',
    padding: '24px 24px 36px 24px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subTitle: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '24px',
    color: '#0F0F1A',
    textAlign: 'center',
    marginBottom: '8px',
  },
  text: {
    fontWeight: '400',
    fontSize: '16',
    lineHeight: '24px',
    /* or 150% */

    textAlign: 'center',
    color: ' #0F0F1A',
  },
  linkEmail: {
    color: mainBlue900,
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    padding: '8px',
    borderRadius: ' 0 0 16px 16px',
  },
  linkText: {
    display: 'flex',
    alignItems: 'center',
    color: mainBlue900,
    fontWeight: 700,
    fontSize: 14,
  },
  linkIcon: {
    marginRight: '5px',
  },
  linkNum: {
    marginLeft: '5px',
  },
}));

const CheckEmail = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <MainLayout>
      <Wrapper>
        <div className={classes.confirm}>
          <div className={classes.inner}>
            <img src="/img/logo_only.svg" alt="" width={95} style={{ marginBottom: 32 }} />
            <Typography variant="h4" className={classes.subTitle}>
              Ссылка отправлена
            </Typography>
            <Typography className={classes.text}>
              Для восстановления пароля перейдите по ссылке, которую мы отправили на{' '}
              <Typography component="span" className={classes.linkEmail}>
                {' '}
                {router.query.email}
              </Typography>
              . <br />
              Эту вкладку можете закрыть.
            </Typography>
          </div>
          {/*<div className={classes.link}>*/}
          {/*  <div className={classes.linkIcon}>*/}
          {/*    <i className="ui_warning" style={{ color: mainBlue900, fontWeight: 700 }}></i>*/}
          {/*  </div>*/}
          {/*  <Typography className={classes.linkText}>*/}
          {/*    Ссылка будет действительна до {format(addDays(new Date(), 1), 'dd.LL.yyyy')}*/}
          {/*    /!*<Typography component={'span'} className={classes.linkNum}>*!/*/}
          {/*    /!*  *!/*/}
          {/*    /!*</Typography>*!/*/}
          {/*  </Typography>*/}
          {/*</div>*/}
        </div>
      </Wrapper>
    </MainLayout>
  );
};

export default CheckEmail;
