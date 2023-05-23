import { Box, Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import { Button } from 'components/Button';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { mainBlue400, mainBlue800, mainBlue900, monoDarkBlack } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';

import { CodeModalContent } from '../../../../../components/modals';
import { PhoneInputWithBtn } from '../../../../../components/PhoneInput';
import { CODE_TIME_LIMIT, YupMessages } from '../../../../../const';
import { useSession } from '../../../../../context/UserContext';
import { validatePhone } from '../../../../../utils/common';

type PhoneSendNewPhoneTError = {
  status: number;
  data: {
    newPhone: {
      text: string;
      key: string;
    };
  };
  success: boolean;
};

const useStyles = makeStyles()((theme) => ({
  pencilButton: {
    // 'width': '24px',
    // 'height': '24px',
    // 'boxShadow': '0px 4px 10px rgba(0, 0, 0, 0.12)',
    'padding': theme.spacing(2.5),
    'borderRadius': '10px',
    'cursor': 'pointer',
    'backgroundColor': mainBlue400,

    '&:hover': {
      backgroundColor: mainBlue400,
      i: {
        color: mainBlue800,
      },
      // backgroundColor: monoWhite,
    },
    'i': {
      fontSize: 16,
      color: mainBlue900,
    },
  },
  activePencil: {
    backgroundColor: mainBlue900,
    i: {
      color: 'white',
    },
  },
}));

const UpdatePhoneModal: FC<any> = (props) => {
  const { me, refetch } = useSession();
  const { classes } = useStyles();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [changeId, setChangeId] = useState(0);
  const [oldCode, setOldCode] = useState({ value: '', isValid: true, message: '' });
  const [newCode, setNewCode] = useState({ value: '', isValid: true, message: '' });
  const [enableResend, setEnableResend] = useState(true);
  const [timer, setTimer] = useState(0);

  //1. отправляем запрос для получения кода на текущий номер
  const [sendOldPhoneState, sendOldPhone] = useAxios(
    { url: '/profile/phone/send_to_old_number', method: 'POST' },
    { manual: true },
  );

  // 2. подтверждение кода текущего номера
  const [checkOldPhoneState, checkOldPhone] = useAxios(
    { url: '/profile/phone/verify_old', method: 'POST' },
    { manual: true },
  );

  // 3. отправка нового телефона
  const [{ error, ...sendNewPhoneState }, sendNewPhone] = useAxios(
    { url: '/profile/phone/send_to_new_number', method: 'POST' },
    { manual: true },
  );
  const customNewPhoneError = error as unknown as PhoneSendNewPhoneTError;

  //подтверждение кода номер номера
  const [checkNewPhoneState, checkNewPhone] = useAxios(
    { url: '/profile/phone/verify_new', method: 'POST' },
    { manual: true },
  );

  const handleChangePhone = (e) => {
    sendOldPhone()
      .then(() => {
        setOpen(true);
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
      })
      .catch((e) => {
        setOpen(true);
        setTimer(e.data.exception.lifetime);
        setEnableResend(false);
      });
  };

  const handleCodeSubmit = () => {
    if (step === 1) {
      checkOldPhone({
        data: {
          // phone: me.phoneNumber,
          code: oldCode.value,
        },
      })
        .then(({ data }) => {
          setChangeId(data.data.changeId);
          setStep(2);
          // setCode({ value: '', isValid: true, message: '' });
          // formik.resetForm();
          // toast.success('email успешно обновлен');
        })
        .catch((e) => {
          setOldCode({ ...oldCode, ...{ isValid: false, message: e.message.text } });
        });
    } else {
      checkNewPhone({
        data: {
          // phone: formik.values.phone.phone,
          code: newCode.value,
          changeId,
        },
      })
        .then(({ data }) => {
          setOpen(false);
          setStep(1);
          setOldCode({ value: '', isValid: true, message: '' });
          setNewCode({ value: '', isValid: true, message: '' });
          formik.resetForm();
          refetch();
          toast.success('Номер телефона успешно обновлен');
        })
        .catch((e) => {
          setNewCode({ ...newCode, ...{ isValid: false, message: e.message.text } });
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: { phone: '' },
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      phone: Yup.object()
        .required(YupMessages.REQUIRED)
        .test('validPhone', YupMessages.INVALID_PHONE_NUMBER, validatePhone),
    }),
    onSubmit: (values) => {
      sendNewPhone({
        data: {
          newPhone: `+${values.phone.phone}`,
          changeId,
        },
      })
        .then(({ data }) => {
          setStep(3);
          setTimer(CODE_TIME_LIMIT);
          // setOldCode({ value: '', isValid: true, message: '' });
          setEnableResend(false);
        })
        .catch((e) => {
          if (e.data && e.status === 422) {
            formik.setFieldError('phone', e.data.newPhone.text);
          } else {
            setTimer(e.data.exception.lifetime);
            setEnableResend(false);
          }
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  // loading={sendOldPhoneState.loading}
  return (
    <div>
      <IconButton
        disableRipple
        className={cx(classes.pencilButton, open && classes.activePencil)}
        onClick={handleChangePhone}
      >
        <i className="ui_pencil"></i>
      </IconButton>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 12 }}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <i className="ui_close" style={{ fontSize: 12 }}></i>
          </IconButton>
          {step === 1 && (
            <CodeModalContent
              title={'Подтверждение текущего номера'}
              desc={`Для смены номера телефона введите код из SMS-сообщения, отправленного на текущий номер ${me.phoneNumber}`}
              onClose={handleClose}
              timer={timer}
              setTimer={setTimer}
              enableResend={enableResend}
              setEnableResend={setEnableResend}
              onResendButtonClick={() => handleChangePhone()}
              code={oldCode}
              onCodeRemove={() => setOldCode({ value: '', isValid: true, message: '' })}
              onCodeChange={(value) => setOldCode({ value, isValid: true, message: '' })}
              checkCodeLoading={checkOldPhoneState.loading}
              onSubmit={() => handleCodeSubmit()}
              submitWithButton
            />
          )}
          {step === 2 && (
            <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
              <Typography sx={{ color: monoDarkBlack, fontWeight: 700, fontSize: 20 }}>
                Изменение номера телефона
              </Typography>
              <Typography sx={{ color: monoDarkBlack, fontWeight: 400, fontSize: 16, textAlign: 'center' }}>
                Укажите ваш новый номер телефона
              </Typography>
              <Box sx={{ width: '100%' }}>
                <PhoneInputWithBtn
                  value={formik.values.phone?.phone || ''}
                  onChange={(phone, data, e, formattedValue) => {
                    formik.setFieldValue('phone', { phone, formattedValue });
                  }}
                  hideLeftContent
                  onFocus={() => formik.setFieldTouched('phone', false)}
                  onBlur={() => formik.setFieldTouched('phone', true)}
                  error={
                    Boolean(customNewPhoneError?.data.newPhone) ||
                    (formik.touched.phone && Boolean(formik.errors.phone))
                  }
                  helperText={customNewPhoneError?.data.newPhone.text || (formik.touched.phone && formik.errors.phone)}
                  hideLabel
                />
              </Box>

              <Button
                fullWidth
                /*disabled={checkOldPhoneState.loading || !formik.isValid}*/
                onClick={(e) => formik.handleSubmit()}
                loading={sendNewPhoneState.loading}
              >
                Продолжить
              </Button>
            </Stack>
          )}
          {step === 3 && (
            <CodeModalContent
              title={'Подтверждение нового номера'}
              desc={`Введите код подтверждения из SMS-сообщения, отправленного на номер +${formik.values.phone.phone}`}
              onClose={handleClose}
              timer={timer}
              setTimer={setTimer}
              enableResend={enableResend}
              setEnableResend={setEnableResend}
              onResendButtonClick={() => formik.handleSubmit()}
              code={newCode}
              onCodeRemove={() => setNewCode({ value: '', isValid: true, message: '' })}
              onCodeChange={(value) => setNewCode({ value, isValid: true, message: '' })}
              checkCodeLoading={checkNewPhoneState.loading}
              onSubmit={handleCodeSubmit}
              submitWithButton
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdatePhoneModal;
