import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { Button, SecondaryButton } from 'components/Button';
import FileUploader from 'components/FileUploader';
import ChevronDownBlue from 'components/icons/ChevronDownBlue';
import { UnsavedChangesModal } from 'components/modals';
import Select from 'components/Select';
import { TextField } from 'components/Textfield';
import { PageTitle } from 'components/Typography';
import WhiteContainer from 'components/WhiteContainer';
import { ProductStatus } from 'const';
import SellerLayout from 'containers/layouts/seller';
import { useStore } from 'context/StoreContext';
import { useSession } from 'context/UserContext';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Attributes from '../components/Attributes';
import CustomAttribute from '../components/Attributes/CustomAttribute';
import SaleTerms from '../components/Attributes/SaleTerms';
import Categories from '../components/Categories';
import Index from '../components/PaymentTerms';
import { FormikProvider } from '../context';
import { prepareSubmitData } from '../lib/utils';
import { useStyles } from '../style';

const TextEditor = lazy(() => import(/* webpackChunkName: "TextEditorQuill" */ 'components/TextEditor'));

const CreateProduct: FC<any> = () => {
  const { countries } = useStore();
  const router = useRouter();
  const { companyId } = useSession();
  const formik: any = useFormikContext();
  const { classes } = useStyles();
  const [shouldConfirmLeave, setShouldConfirmLeave] = useState(true);
  const [{ loading }, createProduct] = useAxios(
    { method: 'post', url: `/companies/${companyId}/products` },
    { manual: true },
  );
  const [buttonType, setButtonType] = useState('');

  useEffect(() => {
    return () => {
      //почему-то категории и терм не хотят сбрасываться через resetForm, поэтому обнуляем вручную
      formik.resetForm();
      formik.setFieldValue('selectedCategories', [
        {
          branchId: 0,
          categoryId: 0,
          subCategoryId: 0,
          groupId: 0,
          isMain: true,
          isReady: false,
        },
      ]);
      formik.setFieldValue('terms', [
        {
          typeId: 1,
          unitId: '',
          value: '',
        },
        {
          typeId: 2,
          unitId: '',
          value: '',
        },
      ]);
    };
  }, []);
  const handleTextEditor = (data: any) => {
    formik.setFieldValue('description', data);
  };

  const handleSubmit = (status, type) => {
    setButtonType(type);
    setShouldConfirmLeave(false);
    const data = prepareSubmitData(formik.values, status);
    createProduct({
      data,
    })
      .then(({ data }) => {
        // setTimeout(() => {
        router.push('/seller/products');
        toast.success('Товар сохранён и отправлен на проверку', {
          position: 'bottom-left',
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { width: '400px' },
        });
        // }, 500);
      })
      .catch((e) => {
        console.log('e', e);
      });
    // setButtonType('');
  };

  const handleStarred = (index) => {
    const filesArr = [...formik.values.photos];
    filesArr.splice(index, 1);
    filesArr.unshift(formik.values.photos[index]);
    formik.setFieldValue('photos', filesArr);
  };

  const canSaveDraft = () => {
    if (
      (formik.values.name && !formik.errors.name) ||
      (formik.values.sku && !formik.errors.sku) ||
      formik.values.selectedCategories.some((item) => item.isReady === true) ||
      formik.values.countryId ||
      formik.values.customAttributes.length > 1 ||
      (formik.values.description.value && !formik.errors.description) ||
      (formik.values.keyWords && !formik.errors.keyWords) ||
      formik.values.photos.length > 0 ||
      formik.values.certificates.length > 0 ||
      (formik.values.price && !formik.errors.price) ||
      (formik.values.additionalMarkup && !formik.errors.additionalMarkup) ||
      (formik.values.sale && !formik.errors.sale)
    ) {
      return true;
    }
    return false;
  };
  return (
    <SellerLayout>
      <Stack spacing={2}>
        <Box display={'flex'}>
          <IconButton className={classes.customChevronDown} onClick={() => router.push('/seller/products')}>
            <ChevronDownBlue />
            {/*<i className={'ui_left-arrow'} style={{color: mainBlue900}}/>*/}
          </IconButton>
          <PageTitle text="Добавление товара" />
        </Box>
        <Grid container>
          <Grid item xs={8}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <WhiteContainer>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Typography variant="h3" className={classes.Title}>
                    Основная информация
                  </Typography>
                  <TextField
                    fullWidth
                    label="Название вашего товара*"
                    name="name"
                    onFocus={() => formik.setFieldTouched('name', false)}
                    onBlur={() => formik.setFieldTouched('name', true)}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    label="SKU/Артикул вашего товара*"
                    name="sku"
                    onFocus={() => formik.setFieldTouched('sku', false)}
                    onBlur={() => formik.setFieldTouched('sku', true)}
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    error={formik.touched.sku && Boolean(formik.errors.sku)}
                    helperText={formik.touched.sku && formik.errors.sku}
                  />
                  <Categories />
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
                  />
                  <Attributes />
                  <CustomAttribute />
                  <Typography variant="h4" className={classes.TitleMain}>
                    Описание товара*
                  </Typography>
                  <TextEditor
                    onFocus={() => formik.setFieldTouched('description', false)}
                    onBlur={() => formik.setFieldTouched('description', true)}
                    value={formik.values.description.value}
                    isValid={!(formik.touched.description && Boolean(formik.errors.description))}
                    helperText={formik.errors.description}
                    onChange={handleTextEditor}
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
                  />
                  <Grid container>
                    <Grid item xs={12}>
                      <FileUploader
                        onStarred={handleStarred}
                        title="Фото товара"
                        addMoreButtonLabel="Добавить еще фото"
                        files={formik.values.photos}
                        onChange={(files) => formik.setFieldValue('photos', files)}
                      />
                    </Grid>
                  </Grid>

                  <FileUploader
                    withSlider={false}
                    onStarred={null}
                    icon="ui_Icon-Stroke-4"
                    title="Сертификаты"
                    titleBlock="Добавить сертификаты"
                    descr="До 10 файлов .pdf, .doc, .docx, .png, .jpg. Максимальный размер файла 10мб"
                    files={formik.values.certificates}
                    onChange={(files) => formik.setFieldValue('certificates', files)}
                    addMoreButtonLabel="Добавить ещё сертификаты"
                    imgItemDimensions={[48, 48]}
                    actionsDimensions={[-8, -8]}
                    accept={{
                      'image/png': ['.png'],
                      'image/jpeg': ['.jpeg', '.jpg'],
                      'application/pdf': ['.pdf'],
                    }}
                  />
                </Stack>
              </WhiteContainer>
              <SaleTerms />
              <Index />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ position: 'sticky', top: 60, pl: 2 }}>
              <Stack spacing={2}>
                <WhiteContainer>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        onClick={() => handleSubmit(ProductStatus.InModeration, 'moderation')}
                        disabled={!formik.isValid || (buttonType === 'moderation' && loading)}
                        loading={buttonType === 'moderation' ? loading : ''}
                      >
                        Сохранить и отправить на проверку
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <SecondaryButton
                        fullWidth
                        onClick={() => handleSubmit(ProductStatus.Draft, 'draft')}
                        loading={buttonType === 'draft' ? loading : ''}
                        // disabled={loading && !canSaveDraft()}
                        disabled={loading || !canSaveDraft()}
                      >
                        Сохранить в черновик
                      </SecondaryButton>
                    </Grid>
                  </Grid>
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
      <UnsavedChangesModal shouldConfirmLeave={shouldConfirmLeave} title="Остановить добавление товара?" />
    </SellerLayout>
  );
};

const ProductCreateWithFormik = () => (
  <FormikProvider>
    <CreateProduct />
  </FormikProvider>
);

export default ProductCreateWithFormik;
