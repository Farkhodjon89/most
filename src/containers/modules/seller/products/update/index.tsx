import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import { PageTitle } from 'components/Typography';
import WhiteContainer from 'components/WhiteContainer';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, lazy, useEffect, useMemo, useState } from 'react';

import FileUploader from '../../../../../components/FileUploader';
import ChevronDownBlue from '../../../../../components/icons/ChevronDownBlue';
import { UnsavedChangesModal } from '../../../../../components/modals';
import Select from '../../../../../components/Select';
import { TextField } from '../../../../../components/Textfield';
import { ProductStatus, ProductStatuses } from '../../../../../const';
import { useStore } from '../../../../../context/StoreContext';
import { useSession } from '../../../../../context/UserContext';
import SellerLayout from '../../../../layouts/seller';
import Attributes from '../components/Attributes';
import CustomAttribute from '../components/Attributes/CustomAttribute';
import SaleTerms from '../components/Attributes/SaleTerms';
import Categories from '../components/Categories';
import PaymentTerms from '../components/PaymentTerms';
import StatusLabel from '../components/StatusLabel';
import SubmitButtons from '../components/SubmitButtons';
import { FormikProvider } from '../context';
import { checkIfNeedValidation, prepareInitialData, prepareSubmitData } from '../lib/utils';
import { useStyles } from '../style';

const TextEditor = lazy(() => import(/* webpackChunkName: "TextEditorQuill" */ 'components/TextEditor'));

const UpdateProduct: FC<any> = () => {
  const { countries, onSubCategoryOrGroupChange, attributes } = useStore();
  const router = useRouter();
  const { companyId } = useSession();
  const formik: any = useFormikContext();
  const { classes } = useStyles();
  const [shouldConfirmLeave, setShouldConfirmLeave] = useState(true);
  const [{ loading }, updateProduct] = useAxios(
    { method: 'PUT', url: `/companies/${companyId}/products/${router.query.id}` },
    { manual: true },
  );
  const [buttonType, setButtonType] = useState('');

  const [changeStatusState, changeStatus] = useAxios({ method: 'PUT' }, { manual: true });

  const [getProductState] = useAxios(`/companies/${companyId}/products/${router.query.id}`);

  const handleTextEditor = (data: any) => {
    formik.setFieldValue('description', data);
  };

  const handleSubmit = (status, statusOnly = false, type) => {
    setButtonType(type);
    setShouldConfirmLeave(false);
    if (statusOnly) {
      changeStatus({
        url: `/companies/${companyId}/products/${router.query.id}/status`,
        data: {
          status,
        },
      }).then(() => {
        router.push('/seller/products');
        // toast.success('Товар успешно опубликован');
      });
    } else {
      const data = prepareSubmitData(formik.values, status);
      updateProduct({
        data,
      })
        .then(({ data }) => {
          // setTimeout(() => {
          router.push('/seller/products');
          // }, 500);
        })
        .catch((e) => {
          console.log('e', e);
        });
    }
    // setButtonType('');
  };

  useEffect(() => {
    if (getProductState.data?.data) {
      const values = prepareInitialData(getProductState.data?.data);
      formik.setValues(values);
      const mainCategory = values.selectedCategories.find((cat) => cat.isMain);
      if (mainCategory) {
        onSubCategoryOrGroupChange(mainCategory.subCategoryId);
      }
    }
  }, [getProductState.loading]);

  const readOnlyMode = formik.values.status === ProductStatus.InModeration || false;
  // console.log(
  //   'formik.values.selectedCategories.some((item) => !item.isReady',
  //   formik.values.selectedCategories,
  //   formik.values.selectedCategories.some((item) => item.isReady === false),
  // );
  const needToModerate = useMemo(() => {
    if (getProductState.data) {
      return checkIfNeedValidation(formik.values, getProductState.data?.data);
    }
    return false;
  }, [formik.values, getProductState.loading]);
  const handleStarred = (index) => {
    const filesArr = [...formik.values.photos];
    filesArr.splice(index, 1);
    filesArr.unshift(formik.values.photos[index]);
    formik.setFieldValue('photos', filesArr);
  };

  return (
    <SellerLayout>
      <Stack spacing={2}>
        <Box display={'flex'}>
          <IconButton className={classes.customChevronDown} onClick={() => router.push('/seller/products')}>
            <ChevronDownBlue />
            {/*<i className={'ui_left-arrow'} style={{color: mainBlue900}}/>*/}
          </IconButton>
          <PageTitle text="Редактирование товара" />
        </Box>
        <Grid container>
          <Grid item xs={8}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <WhiteContainer>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h3" className={classes.Title}>
                      Общая информация
                    </Typography>
                    <StatusLabel className={cx(`status-${ProductStatus[formik.values.status]}`, 'status')}>
                      {ProductStatuses[formik.values.status]}
                    </StatusLabel>
                  </Box>

                  <TextField
                    fullWidth
                    label="Название вашего товара *"
                    name="name"
                    onFocus={() => formik.setFieldTouched('name', false)}
                    onBlur={() => formik.setFieldTouched('name', true)}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={readOnlyMode}
                  />
                  <TextField
                    fullWidth
                    label="SKU/Артикул вашего товара *"
                    name="sku"
                    onFocus={() => formik.setFieldTouched('sku', false)}
                    onBlur={() => formik.setFieldTouched('sku', true)}
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    error={formik.touched.sku && Boolean(formik.errors.sku)}
                    helperText={formik.touched.sku && formik.errors.sku}
                    disabled={readOnlyMode}
                  />
                  <Categories status={formik.values.status} readOnlyMode={readOnlyMode} />
                </Stack>
              </WhiteContainer>
              <WhiteContainer>
                <Stack spacing={2}>
                  <Typography variant="h3" className={classes.Title}>
                    Характеристики товара
                  </Typography>
                  <Select
                    value={formik.values.countryId}
                    label={'Страна производитель*'}
                    name={'countryId'}
                    onFocus={() => formik.setFieldTouched('countryId', false)}
                    onBlur={() => formik.setFieldTouched('countryId', true)}
                    onChange={(e) => formik.setFieldValue('countryId', e.target.value)}
                    options={countries.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    error={formik.touched.countryId && Boolean(formik.errors.countryId)}
                    helperText={formik.touched.countryId && formik.errors.countryId}
                    disabled={readOnlyMode}
                  />
                  <Attributes readOnlyMode={readOnlyMode} />
                  <CustomAttribute readOnlyMode={readOnlyMode} />
                  <Typography variant="h4" className={classes.TitleMain}>
                    Описание товара
                  </Typography>
                  <TextEditor
                    onFocus={() => formik.setFieldTouched('description', false)}
                    onBlur={() => formik.setFieldTouched('description', true)}
                    value={formik.values.description.value}
                    isValid={!(formik.touched.description && Boolean(formik.errors.description))}
                    helperText={formik.errors.description}
                    onChange={handleTextEditor}
                    readOnly={readOnlyMode}
                  />
                  <TextField
                    fullWidth
                    label="Ключевые слова для поиска"
                    name="keyWords"
                    onFocus={() => formik.setFieldTouched('keyWords', false)}
                    onBlur={() => formik.setFieldTouched('keyWords', true)}
                    value={formik.values.keyWords}
                    onChange={formik.handleChange}
                    error={formik.touched.keyWords && Boolean(formik.errors.keyWords)}
                    helperText={formik.touched.keyWords && formik.errors.keyWords}
                    disabled={readOnlyMode}
                  />
                  <Grid container>
                    <Grid item xs={12}>
                      <FileUploader
                        onStarred={handleStarred}
                        title="Фото товара"
                        addMoreButtonLabel="Добавить фото"
                        files={formik.values.photos}
                        onChange={(files) => formik.setFieldValue('photos', files)}
                        readOnlyMode={readOnlyMode}
                      />
                    </Grid>
                  </Grid>

                  <FileUploader
                    withSlider={false}
                    onStarred={null}
                    title="Сертификаты"
                    files={formik.values.certificates}
                    onChange={(files) => formik.setFieldValue('certificates', files)}
                    addMoreButtonLabel="Добавить ещё сертификаты"
                    imgItemDimensions={[48, 48]}
                    actionsDimensions={[-8, -8]}
                    readOnlyMode={readOnlyMode}
                  />
                </Stack>
              </WhiteContainer>
              <SaleTerms readOnlyMode={readOnlyMode} />
              <PaymentTerms readOnlyMode={readOnlyMode} />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ position: 'sticky', top: 60, pl: 2 }}>
              <Stack spacing={2}>
                <WhiteContainer>
                  <Stack spacing={3}>
                    <SubmitButtons
                      handleSubmit={handleSubmit}
                      formik={formik}
                      buttonType={buttonType}
                      needToModerate={needToModerate}
                      loading={loading || changeStatusState.loading}
                    />
                  </Stack>
                </WhiteContainer>
                {/*<WhiteContainer>*/}
                {/*  <Grid container spacing={3}>*/}
                {/*    <Grid item xs={12} className={classes.greenText}>*/}
                {/*      <i className="ui ui_warning"></i> Товар сохранён в черновики*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} className={classes.greenText}>*/}
                {/*      <i className="ui ui_warning"></i> Товар сохранён в черновик. Данные карточки товара скопированы.*/}
                {/*      Сейчас вы находитесь в карточке создания нового товара с ранее заполненными данными.*/}
                {/*    </Grid>*/}
                {/*  </Grid>*/}
                {/*</WhiteContainer>*/}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <UnsavedChangesModal shouldConfirmLeave={shouldConfirmLeave} title="Остановить редактирование товара?" />
    </SellerLayout>
  );
};

const ProductUpdateWithFormik = () => (
  <FormikProvider>
    <UpdateProduct />
  </FormikProvider>
);

export default ProductUpdateWithFormik;
