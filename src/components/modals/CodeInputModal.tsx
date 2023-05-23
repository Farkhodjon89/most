import { Dialog, DialogContent } from '@mui/material';
import React, { FC } from 'react';

import { formatPhone } from '../../utils/common';
import { CodeModalContent } from './index';

const CodeInputModal: FC<any> = ({
  phone,
  open,
  onClose,
  timer,
  setTimer,
  enableResend,
  setEnableResend,
  onResendButtonClick,
  code,
  setCode,
  onCodeChange,
  checkCodeLoading,
  onSubmit,
  submitWithButton = false,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} sx={{ borderRadius: 12 }}>
        <DialogContent>
          <CodeModalContent
            title={'Введите код из СМС'}
            desc={`Мы отправили код подтверждения на номер ${formatPhone(phone)}`}
            onClose={onClose}
            timer={timer}
            setTimer={setTimer}
            enableResend={enableResend}
            setEnableResend={setEnableResend}
            onResendButtonClick={onResendButtonClick}
            code={code}
            onCodeRemove={() => setCode({ value: '', isValid: true, message: '' })}
            onCodeChange={onCodeChange}
            checkCodeLoading={checkCodeLoading}
            onSubmit={onSubmit}
            submitWithButton={submitWithButton}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeInputModal;
