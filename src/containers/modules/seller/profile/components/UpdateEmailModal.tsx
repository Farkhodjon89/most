import { Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material';
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
import { TextField } from '../../../../../components/Textfield';
import { CODE_TIME_LIMIT, EMAIL_REGEX, YupMessages } from '../../../../../const';
import { useSession } from '../../../../../context/UserContext';

type EmailChangeTError = {
  status: number;
  message: {
    text: string;
    key: string;
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
    backgroundColor: mainBlue400,
    i: {
      color: mainBlue800,
    },
  },
}));

const UpdateEmailModal: FC = () => {
  const refetch = useSession()?.refetch;
  const { classes } = useStyles();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });
  const [verificationId, setVerificationId] = useState(0);
  const [enableResend, setEnableResend] = useState(true);
  const [timer, setTimer] = useState(0);

  const [{ loading, error }, sendEmail] = useAxios({ url: '/profile/email/change', method: 'POST' }, { manual: true });
  const customErrorEmailChange = error as unknown as EmailChangeTError;

  const [checkEmailState, checkEmail] = useAxios({ url: '/profile/email/verify', method: 'POST' }, { manual: true });

  const handleCodeSubmit = () =>
    checkEmail({
      data: {
        verificationId,
        code: code.value,
      },
    })
      .then(() => {
        setOpen(false);
        setStep(1);
        setCode({ value: '', isValid: true, message: '' });
        formik.resetForm();
        toast.success('email успешно обновлен');
        if (refetch) refetch();
      })
      .catch((e) => {
        setCode({ ...code, ...{ isValid: false, message: e.message.text } });
      });

  const handleSendCode = () => {
    sendEmail({
      data: { newEmail: formik.values.email },
    })
      .then(({ data }) => {
        setVerificationId(data.data.verificationId);
        setOpen(true);
        setTimer(CODE_TIME_LIMIT);
        setEnableResend(false);
      })
      .catch((e) => {
        if (e.data && e.status === 422) {
          formik.setFieldError('email', e.message?.text);
        } else {
          setOpen(true);
          setTimer(e.data.exception?.lifetime || 0);
          setEnableResend(false);
        }
        // console.log('e', e.data);
        // formik.setFieldError('phone', 'На данный номер СМС уже отправлен, попробуйте позже');
      });
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required(YupMessages.REQUIRED)
        .matches(EMAIL_REGEX, YupMessages.EMAIL)
        .max(256, YupMessages.MAX_STRING),
    }),
    onSubmit: (values) => {
      sendEmail({
        data: {
          newEmail: values.email,
        },
      })
        .then(({ data }) => {
          setVerificationId(data.data.verificationId);
          setStep(2);
          setTimer(CODE_TIME_LIMIT);
          setEnableResend(false);
        })
        .catch((e) => {
          if (e.data && e.status === 422) {
            formik.setFieldError('email', e.message?.text);
          } else {
            setOpen(true);
            setTimer(e.data.exception?.lifetime || 0);
            setEnableResend(false);
          }
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleCode = (value: string) => {
    setCode({ value, isValid: true, message: '' });
  };
  return (
    <div>
      <IconButton
        disableRipple
        className={cx(classes.pencilButton, open && classes.activePencil)}
        onClick={() => setOpen(!open)}
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
            <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
              <Typography sx={{ color: monoDarkBlack, fontWeight: 700, fontSize: 20 }}>
                Изменение электронной почты
              </Typography>
              <Typography sx={{ color: monoDarkBlack, fontWeight: 400, fontSize: 16, textAlign: 'center' }}>
                Введите вашу новую электронную почту, мы отправим на неё одноразовый код подтверждения
              </Typography>

              <TextField
                inputProps={{
                  autoComplete: 'new-password',
                }}
                fullWidth
                label="Новая электронная почта"
                name="email"
                onFocus={() => formik.setFieldTouched('email', false)}
                onBlur={() => formik.setFieldTouched('email', true)}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  (formik.touched.email && Boolean(formik.errors.email)) || Boolean(customErrorEmailChange?.message)
                }
                helperText={(formik.touched.email && formik.errors.email) || customErrorEmailChange?.message?.text}
              />

              <Button
                fullWidth
                onClick={() => {
                  formik.handleSubmit();
                  // if (onSubmit) {
                  //   onSubmit(e);
                  // }

                  // setOpen(false);
                }}
                loading={loading}
              >
                Продолжить
              </Button>
            </Stack>
          )}
          {step === 2 && (
            <CodeModalContent
              title={'Подтверждение электронной почты'}
              desc={
                <p>
                  На вашу электронную почту <strong>{formik.values.email}</strong> отправлен одноразовый код
                  подтверждения. Введите его в поле ниже:
                </p>
              }
              onClose={handleClose}
              timer={timer}
              setTimer={setTimer}
              enableResend={enableResend}
              setEnableResend={setEnableResend}
              onResendButtonClick={handleSendCode}
              code={code}
              onCodeRemove={() => setCode({ value: '', isValid: true, message: '' })}
              onCodeChange={handleCode}
              checkCodeLoading={checkEmailState.loading}
              onSubmit={handleCodeSubmit}
              submitWithButton
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateEmailModal;
