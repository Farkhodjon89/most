import { Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { Button, ButtonText, SecondaryButton } from 'components/Button';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { monoDarkBlack } from 'styles/colorPalette';

import CodeInput from '../CodeInput';
import SmsTimer from '../SmsTimer';

type Props = {
  open: boolean;
  label: string;
  submitLabel?: string;
  cancelLabel?: string;
  title: string;
  desc: string;
  onSubmit: (e: any) => void;
  onCancel?: () => void;
  onSubmit2?: (e: any) => void;
  loading?: boolean;
};
const SimpleModal: FC<Props> = ({
  label,
  submitLabel = 'Подтвердить',
  loading = false,
  cancelLabel = 'Отменить',
  title,
  desc,
  onSubmit,
  onCancel = null,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div>
      <SecondaryButton fullWidth onClick={(e) => setOpen(!open)}>
        {label}
      </SecondaryButton>
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
          <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
            <img src="/img/logo_only.svg" alt="" width={95} style={{ marginBottom: 16 }} />
            <Typography sx={{ color: monoDarkBlack, fontWeight: 700, fontSize: 20 }}>{title}</Typography>
            <Typography sx={{ color: monoDarkBlack, fontWeight: 400, fontSize: 16, textAlign: 'center' }}>
              {desc}
            </Typography>
            <Button
              fullWidth
              onClick={(e) => {
                onSubmit(e);
                setOpen(false);
              }}
              loading={loading}
            >
              {submitLabel}
            </Button>
            <SecondaryButton variant={'text'} fullWidth onClick={handleClose}>
              {cancelLabel}
            </SecondaryButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/**
 *
 * Experemental
 */
export const SimpleModalV2: FC<Props> = ({
  // label,
  submitLabel = 'Подтвердить',
  loading = false,
  cancelLabel = 'Отменить',
  title,
  desc,
  onSubmit,
  onSubmit2 = null,
  onCancel,
  open,
  // setOpen,
}) => {
  // const [open, setOpen] = useState(false);
  return (
    <div>
      {/*<SecondaryButton fullWidth onClick={(e) => setOpen(!open)}>*/}
      {/*  {label}*/}
      {/*</SecondaryButton>*/}
      <Dialog open={open} onClose={onCancel} sx={{ borderRadius: 12 }}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={onCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <i className="ui_close" style={{ fontSize: 12 }}></i>
          </IconButton>
          <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
            <img src="/img/logo_only.svg" alt="" width={95} style={{ marginBottom: 16 }} />
            <Typography sx={{ color: monoDarkBlack, fontWeight: 700, fontSize: 20 }}>{title}</Typography>
            <Typography sx={{ color: monoDarkBlack, fontWeight: 400, fontSize: 16, textAlign: 'center' }}>
              {desc}
            </Typography>
            <Button fullWidth onClick={onSubmit} loading={loading}>
              {submitLabel}
            </Button>
            <SecondaryButton variant={'text'} fullWidth onClick={onSubmit2 || onCancel}>
              {cancelLabel}
            </SecondaryButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const CodeModalContent: FC<any> = ({
  title,
  desc,
  onClose,
  timer,
  setTimer,
  enableResend,
  setEnableResend,
  onResendButtonClick,
  code,
  onCodeRemove,
  onCodeChange,
  checkCodeLoading,
  onSubmit,
  submitWithButton = false,
}) => {
  const handleTimerComplete = useCallback(() => {
    setEnableResend(true);
    setTimer(0);
  }, [enableResend]);

  useEffect(() => {
    if (code.value.length === 4) {
      if (!submitWithButton) {
        onSubmit();
      }
    }
  }, [code.value]);

  return (
    <Stack display={'flex'} justifyContent="center" alignItems={'center'} spacing={2}>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <i className="ui_close" style={{ fontSize: 12 }}></i>
        </IconButton>
      )}
      <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>{title}</Typography>
      <Typography align={'center'}>{desc}</Typography>
      <CodeInput
        value={code.value}
        onChange={onCodeChange}
        error={!code.isValid}
        helperText={code.message}
        loading={checkCodeLoading}
        hideLabel
        onRemoveClick={onCodeRemove}
      />
      <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
        <ButtonText small disabled={!enableResend} onClick={onResendButtonClick}>
          Отправить еще раз
        </ButtonText>
        {timer !== 0 && (
          <SmsTimer
            handleComplete={handleTimerComplete}
            handleTick={({ total }) => setTimer(total / 1000)}
            value={timer}
          />
        )}
        {submitWithButton && (
          <Button onClick={onSubmit} fullWidth sx={{ mt: 2 }} /*disabled={code.value.length < 4}*/>
            Подтвердить
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export interface UnsavedChangesDialogProps {
  shouldConfirmLeave: boolean;
  title: string;
}

export const UnsavedChangesModal = ({
  shouldConfirmLeave,
  title,
}: UnsavedChangesDialogProps): React.ReactElement<UnsavedChangesDialogProps> => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] = React.useState(false);
  const [nextRouterPath, setNextRouterPath] = React.useState<string>();

  const Router = useRouter();

  const onRouteChangeStart = React.useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) {
        return;
      }

      setShouldShowLeaveConfirmDialog(true);
      setNextRouterPath(nextPath);

      throw 'cancelRouteChange';
    },
    [shouldConfirmLeave],
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(null);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
    removeListener();
    Router.push(nextRouterPath);
  };

  const removeListener = () => {
    Router.events.off('routeChangeStart', onRouteChangeStart);
  };

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart);

    return removeListener;
  }, [onRouteChangeStart]);

  return (
    <SimpleModalV2
      open={shouldShowLeaveConfirmDialog}
      onSubmit={() => onConfirmRouteChange()}
      onCancel={() => onRejectRouteChange()}
      title={title}
      desc={'Все несохраненные данные будут утеряны'}
      submitLabel={'Остановить'}
      loading={false}
      cancelLabel={'Отмена'}
    />
  );
};

export default SimpleModal;
