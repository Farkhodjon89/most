import { Grid, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../../../components/Button';
import CodeInputModal from '../../../../../components/modals/CodeInputModal';
import { CODE_TIME_LIMIT } from '../../../../../const';
import { useSession } from '../../../../../context/UserContext';
import { monoDarkBlack } from '../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontWeight: '700',
    lineHeight: '24px',
    color: monoDarkBlack,
  },
  Wrapp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    backgroundColor: '#F3F3FF',
    borderRadius: theme.spacing(2),
  },
  text: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: '22px',
    color: '#0F0F1A',
    paddingLeft: theme.spacing(1),
  },
}));

const TwoFA = () => {
  const { classes } = useStyles();
  const { me, refetch } = useSession();
  const [mode, setMode] = useState('');
  const [enableResend, setEnableResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });

  const [{ loading }, sendCode] = useAxios({ url: '/auth/2fa/send', method: 'POST' }, { manual: true });
  const [checkState, checkCode] = useAxios({ method: 'POST' }, { manual: true });

  const handleCode = (value: any) => {
    setCode({ value, isValid: true, message: '' });
  };

  const handleSendCode = () => {
    sendCode({
      url: `/auth/2fa/${mode}`,
      data: { phone: `+${me.phoneNumber}` },
    })
      .then(({ data }) => {
        // setModalOpen(true);
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
        setCode({ value: '', isValid: true, message: '' });
      })
      .catch((e) => {
        setModalOpen(true);
        setTimer(e.data.exception.lifetime);
        setEnableResend(false);
      });
  };

  const handleDisableClick = (mode) => {
    setMode(mode);
    sendCode({
      data: { phone: `+${me.phoneNumber}` },
    })
      .then(({ data }) => {
        setModalOpen(true);
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
      })
      .catch((e) => {
        setModalOpen(true);
        setTimer(e.data.exception.lifetime);
        setEnableResend(false);
        setCode({ value: '', isValid: true, message: '' });
        // if (e.data && e.status === 422) {
        //   formik.setFieldError('phone', e.message?.text);
        // } else {
        //   setModalOpen(true);
        //   setTimer(e.data.exception.lifetime);
        //   setEnableResend(false);
        // }
        // console.log('e', e.data);
        // formik.setFieldError('phone', 'На данный номер СМС уже отправлен, попробуйте позже');
      });
  };

  const handleCheckCode = () => {
    checkCode({
      url: `/auth/2fa/${mode}`,
      data: { code: code.value },
    })
      .then(() => {
        setModalOpen(false);
        toast.success(`Двухфакторная аутентификация ${mode === 'enable' ? 'включена' : 'отключена'}`);
        refetch();
        // router.push('/seller/profile');
      })
      .catch(() => {
        setCode({ ...code, ...{ isValid: false } });
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} mb={1}>
          <Typography className={classes.title}>Двухфакторная аутентификация</Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography fontSize={14}>
            Двухфакторная аутентификация - один из надежных способов защитить ваш аккаунт от несанкционированного
            доступа. Никто не сможет войти в ваш аккаунт, так как потребуется дополнительное подтверждение по номеру
            телефона.
          </Typography>
        </Grid>
        <Grid item xs={12} mb={6}>
          {me.twoFactorAuthIsAllowed ? (
            <Grid item xs={12}>
              <Stack className={classes.Wrapp}>
                <Typography className={classes.text}>Подключена к номеру {me.phoneNumber}</Typography>
                <Button small onClick={() => handleDisableClick('disable')} loading={loading}>
                  Отключить
                </Button>
              </Stack>
            </Grid>
          ) : (
            <Button small onClick={() => handleDisableClick('enable')} loading={loading}>
              Включить
            </Button>
          )}
        </Grid>
      </Grid>

      <CodeInputModal
        phone={me.phoneNumber}
        code={code}
        setCode={setCode}
        onCodeChange={handleCode}
        checkCodeLoading={checkState.loading}
        open={modalOpen}
        timer={timer}
        setTimer={setTimer}
        enableResend={enableResend}
        setEnableResend={setEnableResend}
        onResendButtonClick={handleSendCode}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCheckCode}
        submitWithButton
      />
    </>
  );
};

export default TwoFA;
