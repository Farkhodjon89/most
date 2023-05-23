import { Box, Divider, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { CODE_TIME_LIMIT } from 'const';
import { useSession } from 'context/UserContext';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import CodeInput from '../../../components/CodeInput';
import SmsTimer from '../../../components/SmsTimer';
import { mainBlue900, monoDarkGrey } from '../../../styles/colorPalette';
import { formatPhoneNumber } from '../../../utils/common';
import MainLayout from '../../layouts/main';
import Wrapper from '../components';

const useStyles = makeStyles()((theme) => ({
  titleMain: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '32px',

    color: mainBlue900,
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
    /* Main Color/Blue/900 */

    color: '#0F0F1A',
    marginBottom: '8px',
  },
  subtext: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: '24px',
    textAlign: 'center',
    /* Main Color/Blue/900 */

    color: '#0F0F1A',
    marginBottom: '24px',
  },
  wrapp: {
    background: '#FFFFFF',
    /* Info_Shadow */

    boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.08)',
    padding: '24px 32px',
    borderRadius: '12px',
  },
  text: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
    /* Main Color/Blue/900 */

    color: '#9A9AA0',
    marginBottom: '16px',
  },
  input: {
    marginBottom: '32px',
  },
  btnWrapp: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px',
  },
  inputWrapp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const Authentication = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { me } = useSession();

  const [{ loading }, sendCode] = useAxios({ url: '/auth/2fa/send', method: 'POST' }, { manual: true });
  const [checkState, checkCode] = useAxios({ url: '/auth/2fa/enable', method: 'POST' }, { manual: true });
  const [timer, setTimer] = useState(0);
  const [phone, setPhone] = useState({ value: '', isValid: false, message: '' });
  const [enableResend, setEnableResend] = useState(true);

  const handleChangePhone = (value: string, isValid: boolean) => {
    setPhone({ value, isValid, message: '' });
  };
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });
  const handleCode = (value: any) => {
    setCode({ value, isValid: true, message: '' });
  };

  const handleTimerComplete = useCallback(() => {
    setEnableResend(true);
    setTimer(0);
  }, [enableResend]);

  const handleSendCode = () => {
    sendCode()
      .then(({ data }) => {
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
      })
      .catch((e) => {
        setPhone({ value: phone.value, isValid: false, message: e.message.text });
        toast.error('На данный номер СМС уже отправлен, попробуйте позже', {
          style: {
            top: 130,
          },
        });
        setTimer(e.data.exception.lifetime);
        if (e.message.text === '') {
          setPhone({ ...phone, ...{ isValid: false, message: 'На данный номер СМС уже отправлен, попробуйте позже' } });
        }
      });
  };

  const handleCheckCode = () => {
    checkCode({
      data: { code: code.value },
    })
      .then(() => {
        router.push('/seller/profile');
      })
      .catch(() => {
        setCode({ ...code, ...{ isValid: false } });
      });
  };
  const handleCancel = () => {
    router.push('/seller/profile');
  };

  return (
    <MainLayout>
      <Wrapper>
        <Typography variant="h3" className={classes.titleMain}>
          Регистрация прошла успешно!
        </Typography>
        <Box className={classes.wrapp}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h3" className={classes.title}>
              Защитите свой аккаунт от мошенников
            </Typography>
            <Box className={classes.subtext} pl={6} pr={6}>
              Подключите двухфактурную авторизацию чтобы никто не смог войти в ваш аккаунт без вашего ведома.
            </Box>
            <Divider />
            <br />
            <Box className={classes.text} pl={6} pr={6}>
              Мы отправим код подтверждения на указанный при регистрации номер. Введите его в поле ниже
            </Box>
            <Stack spacing={3} pl={6} pr={6}>
              <Box sx={{ position: 'relative' }}>
                <Stack
                  sx={{ height: 48 }}
                  spacing={2}
                  display="flex"
                  alignItems={'center'}
                  direction={'row'}
                  justifyContent={'center'}
                >
                  <Typography fontSize={14} color={monoDarkGrey}>
                    {formatPhoneNumber(me?.phoneNumber)}
                  </Typography>
                  <Button loading={loading} onClick={handleSendCode} disabled={!enableResend || loading} small>
                    Отправить код
                  </Button>
                </Stack>
                {timer !== 0 && (
                  <Box sx={{ position: 'absolute', top: 14, right: 40 }}>
                    <SmsTimer
                      handleComplete={handleTimerComplete}
                      handleTick={({ total }) => setTimer(total / 1000)}
                      value={timer}
                    />
                  </Box>
                )}
              </Box>

              <CodeInput
                value={code.value}
                onChange={handleCode}
                error={!code.isValid}
                helperText={code.message}
                loading={checkState.loading}
                onRemoveClick={() => setCode({ value: '', isValid: true, message: '' })}
              />
            </Stack>
          </Box>
          <Stack spacing={3}>
            <Button onClick={handleCheckCode} disabled={!code.isValid || code.value.length !== 4}>
              Подтвердить номер
            </Button>
            <Button onClick={handleCancel} variant="text" small>
              Пропустить
            </Button>
          </Stack>
        </Box>
      </Wrapper>
    </MainLayout>
  );
};

export default Authentication;
