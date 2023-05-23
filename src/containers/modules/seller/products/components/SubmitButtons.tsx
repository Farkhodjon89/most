import React from 'react';

import { Button, SecondaryButton } from '../../../../../components/Button';
import { ProductStatus } from '../../../../../const';

const SubmitButtons = ({ handleSubmit, formik, needToModerate, loading, buttonType }) => {
  if (formik.values.status === ProductStatus.Draft || formik.values.status === ProductStatus.Refused) {
    return (
      <>
        <Button
          fullWidth
          onClick={() => handleSubmit(ProductStatus.InModeration, _, 'InModeration')}
          disabled={!formik.isValid || (buttonType === 'InModeration' && loading)}
          loading={buttonType === 'InModeration' ? loading : ''}
        >
          Сохранить и отправить на проверку
        </Button>
        <SecondaryButton
          fullWidth
          onClick={() => handleSubmit(ProductStatus.Draft, _, 'Draft')}
          disabled={buttonType === 'Draft' && loading}
          loading={buttonType === 'Draft' ? loading : ''}
        >
          Сохранить в черновик
        </SecondaryButton>
      </>
    );
  }

  if (formik.values.status === ProductStatus.InModeration) {
    return (
      <>
        <Button fullWidth onClick={() => handleSubmit(ProductStatus.Draft, true)} disabled={loading} loading={loading}>
          Отозвать с проверки
        </Button>
      </>
    );
  }

  if (formik.values.status === ProductStatus.ReadyForSale) {
    return (
      <>
        <Button
          fullWidth
          onClick={() => handleSubmit(ProductStatus.InModeration, true)}
          disabled={!formik.isValid || loading || needToModerate}
          loading={loading}
        >
          Опубликовать на продажу
        </Button>
        <SecondaryButton
          fullWidth
          onClick={() => handleSubmit(needToModerate ? ProductStatus.InModeration : formik.values.status)}
          disabled={!formik.isValid || loading}
          loading={loading}
        >
          {needToModerate ? 'Сохранить и отправить на проверку' : 'Сохранить'}
        </SecondaryButton>
        <SecondaryButton
          fullWidth
          onClick={() => handleSubmit(ProductStatus.Draft)}
          disabled={loading}
          loading={loading}
        >
          Сохранить в черновик
        </SecondaryButton>
      </>
    );
  }

  if (formik.values.status === ProductStatus.OnSale) {
    return (
      <>
        <Button
          fullWidth
          onClick={() => handleSubmit(needToModerate ? ProductStatus.InModeration : formik.values.status)}
          disabled={!formik.isValid || loading}
          loading={loading}
        >
          {needToModerate ? 'Сохранить и отправить на проверку' : 'Сохранить'}
        </Button>
        <SecondaryButton
          fullWidth
          onClick={() => handleSubmit(ProductStatus.ReadyForSale, true)}
          disabled={loading}
          loading={loading}
        >
          Остановить продажу
        </SecondaryButton>
      </>
    );
  }

  return null;
};

export default SubmitButtons;
