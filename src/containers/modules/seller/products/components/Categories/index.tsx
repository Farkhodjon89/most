import { Box, FormControlLabel, Grid, IconButton, Paper, RadioGroup, Stack, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { FC, useState } from 'react';

import { ButtonText, SecondaryButton } from '../../../../../../components/Button';
import List from '../../../../../../components/List';
import { SimpleModalV2 } from '../../../../../../components/modals';
import Radio from '../../../../../../components/Radio';
import Tooltip from '../../../../../../components/Tooltip';
import { ProductStatus } from '../../../../../../const';
import { useStore } from '../../../../../../context/StoreContext';
import { mainBlue900, monoGrey } from '../../../../../../styles/colorPalette';
import { getCategoryById, isValidCategory } from '../../lib/utils';
import { useStyles } from '../../style';
import RenderRemove from './RemoveButton';

const Categories: FC<any> = ({ readOnlyMode = false }) => {
  const { branches, onSubCategoryOrGroupChange } = useStore();
  const { classes } = useStyles();
  const [modalData, setModalData] = useState({
    open: false,
    title: '',
    desc: '',
    handleSubmit: () => null,
    submitLabel: '',
    cancelLabel: '',
    loading: false,
  });

  const formik = useFormikContext();

  // useEffect(() => {
  //   const selectedMainCategory = formik.values.selectedCategories.find((item) => item.isMain);
  //   if (selectedMainCategory.isReady) {
  //     if (selectedMainCategory.subCategoryId) {
  //       onSubCategoryOrGroupChange(selectedMainCategory.subCategoryId);
  //     }
  //     if (selectedMainCategory.groupId) {
  //       onSubCategoryOrGroupChange(selectedMainCategory.groupId);
  //     }
  //   }
  // }, [formik.values.selectedCategories]);

  const handleAddCategory = () => {
    const selectedCategoriesArr = [...formik.values.selectedCategories];
    selectedCategoriesArr.push({
      branchId: 0,
      categoryId: 0,
      subCategoryId: 0,
      groupId: 0,
      isMain: false,
      isReady: false,
    });
    formik.setFieldValue('selectedCategories', selectedCategoriesArr);
  };

  const handleChangeMain = (index) => {
    setModalData({
      open: true,
      title: 'Изменить основную категорию?',
      desc: 'При смене основной категории, заполненные характеристики товара будут сброшены',
      handleSubmit: () => {
        const selectedCategoriesArr = [...formik.values.selectedCategories];
        selectedCategoriesArr.forEach((item, key) => {
          if (key === index) {
            item.isMain = true;
          } else {
            item.isMain = false;
          }
        });
        formik.setFieldValue('selectedCategories', selectedCategoriesArr);
        formik.setFieldValue('attributes', []);
        formik.setFieldValue('countryId', '');
        setModalData({ ...modalData, ...{ open: false } });
      },
      submitLabel: 'Изменить',
      cancelLabel: 'Отмена',
      loading: false,
    });
  };

  /**
   * Если П редактирует основную категорию, даем ему его редактировать и сбрасываем все атрибуты
   * @param isMain
   */
  const handleUpdateCategory = (isMain, index) => {
    if (isMain) {
      setModalData({
        open: true,
        title: 'Редактировать основную категорию?',
        desc: 'При редактировании основной категории, заполненные характеристики товара будут сброшены',
        handleSubmit: () => {
          formik.setFieldValue('attributes', []);
          const selectedCategoriesArr = [...formik.values.selectedCategories];
          selectedCategoriesArr[index].isReady = false;
          formik.setFieldValue('selectedCategories', selectedCategoriesArr);
          setModalData({ ...modalData, ...{ open: false } });
        },
        submitLabel: 'Изменить',
        cancelLabel: 'Отмена',
        loading: false,
      });
    } else {
      const selectedCategoriesArr = [...formik.values.selectedCategories];
      selectedCategoriesArr[index].isReady = false;
      formik.setFieldValue('selectedCategories', selectedCategoriesArr);
    }
  };

  const handleReady = (index) => {
    const selectedCategoriesArr = [...formik.values.selectedCategories];
    selectedCategoriesArr[index].isReady = true;
    formik.setFieldValue('selectedCategories', selectedCategoriesArr);
  };

  //todo вынести за переделами этого компонента
  const RenderUpdate = ({ selectedCategory, index }) => {
    if (formik.values.status === ProductStatus.ReadyForSale && selectedCategory.isMain) {
      return (
        <Tooltip
          title={'Редактирование основной категории запрещено'}
          placement={'top'}
          disableFocusListener
          disableTouchListener
        >
          <Box>
            <IconButton disabled sx={{ color: monoGrey }}>
              <i className="ui ui_pencil" style={{ fontSize: 17, color: monoGrey }} />
            </IconButton>
          </Box>
        </Tooltip>
      );
    }
    return (
      <IconButton onClick={() => handleUpdateCategory(selectedCategory.isMain, index)}>
        <i className="ui ui_pencil" style={{ fontSize: 17, color: mainBlue900 }} />
      </IconButton>
    );
  };

  return (
    <Box>
      <Typography variant="h4" className={classes.TitleMain}>
        Выберите категории для размещения товара{' '}
        <Tooltip
          placement={'top'}
          disableFocusListener
          disableTouchListener
          classes={{
            popper: classes.categoryTooltip,
          }}
          title={
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>
                Выберите до трех категорий для размещения товара
              </Typography>
              <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
                Основная выбранная вами категория будет использована для заполнения характеристик товара.
              </Typography>
            </Box>
          }
        >
          <i className="ui_warning" style={{ cursor: 'pointer', color: monoGrey }} />
        </Tooltip>
      </Typography>

      {formik.values.selectedCategories.map((category, index) => {
        const selectedCategory = category;

        const handleChange = (type, id) => {
          const selectedCategoriesArr = [...formik.values.selectedCategories];
          const attr = `${type}Id`;
          selectedCategoriesArr[index][attr] = id;

          //при изменении параметра необходимо стирать нижележащие параметры выбора
          switch (type) {
            case 'branch':
              selectedCategoriesArr[index]['categoryId'] = 0;
              selectedCategoriesArr[index]['subCategoryId'] = 0;
              selectedCategoriesArr[index]['groupId'] = 0;
              break;
            case 'category':
              selectedCategoriesArr[index]['subCategoryId'] = 0;
              selectedCategoriesArr[index]['groupId'] = 0;
              break;
            case 'subCategory':
              selectedCategoriesArr[index]['groupId'] = 0;
              break;
          }
          formik.setFieldValue('selectedCategories', selectedCategoriesArr);
        };

        if (selectedCategory.isReady) {
          return (
            <Grid container key={index}>
              <Grid container mb={2} className={classes.AddItem}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent="flex-start" pl={2}>
                      <div className={classes.Num} style={{ background: selectedCategory.isMain && '#FA8244' }}>
                        {index + 1}
                      </div>
                    </Grid>
                    <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent="flex-end">
                      <Grid item mr={1}>
                        {!readOnlyMode && <RenderUpdate selectedCategory={selectedCategory} index={index} />}
                      </Grid>
                      <Grid item mr={1}>
                        {!readOnlyMode && (
                          <RenderRemove category={selectedCategory} index={index} status={formik.values.status} />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Box className={classes.CategoryWrapp}>
                      <Stack className={classes.CategoryElementWrapp}>
                        <Typography className={classes.CategoryElement}>
                          {getCategoryById(branches, 1, selectedCategory.branchId)?.name}
                        </Typography>
                        <Box className={classes.CategoryElementIcon}>
                          <i className="ui ui_right-arrow"></i>
                        </Box>
                        <Typography className={classes.CategoryElement}>
                          {getCategoryById(branches, 2, selectedCategory.categoryId)?.name}
                        </Typography>
                        <Box className={classes.CategoryElementIcon}>
                          <i className="ui ui_right-arrow"></i>
                        </Box>
                        <Typography className={classes.CategoryElement}>
                          {getCategoryById(branches, 3, selectedCategory.subCategoryId)?.name}
                        </Typography>

                        {getCategoryById(branches, 4, selectedCategory.groupId) && (
                          <>
                            <Box className={classes.CategoryElementIcon}>
                              <i className="ui ui_right-arrow"></i>
                            </Box>
                            <Typography className={classes.CategoryElement}>
                              {getCategoryById(branches, 4, selectedCategory.groupId).name}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        }
        const branchOptions = branches.map((item) => ({ value: item.id, label: item.name }));
        const categoryOptions = branches
          .find((branch) => branch.id === formik.values.selectedCategories[index].branchId)
          ?.childs.map((category) => ({ value: category.id, label: category.name }));
        const subCategoryOptions = branches
          .find((branch) => branch.id === formik.values.selectedCategories[index].branchId)
          ?.childs.find((category) => category.id === formik.values.selectedCategories[index].categoryId)
          ?.childs.map((subCategory) => ({
            value: subCategory.id,
            label: subCategory.name,
          }));

        const groupOptions = branches
          .find((branch) => branch.id === formik.values.selectedCategories[index].branchId)
          ?.childs.find((category) => category.id === formik.values.selectedCategories[index].categoryId)
          ?.childs.find((subCategory) => subCategory.id === formik.values.selectedCategories[index]?.subCategoryId)
          ?.childs.map((group) => ({ value: group.id, label: group.name }));

        return (
          <Grid container mb={2} className={classes.AddItem} key={index}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent="flex-start">
                  <div className={classes.Num} style={{ background: selectedCategory.isMain && '#FA8244' }}>
                    {index + 1}
                  </div>
                </Grid>
                <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent="flex-end">
                  {formik.values.status !== ProductStatus.ReadyForSale && (
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      className={classes.RadioLabel}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        checked={selectedCategory.isMain}
                        label="Сделать основной"
                        onClick={() =>
                          isValidCategory(selectedCategory) && !selectedCategory.isMain && handleChangeMain(index)
                        }
                        disabled={!isValidCategory(selectedCategory)}
                      />
                    </RadioGroup>
                  )}
                  <Grid item mr={1.5}>
                    <ButtonText disabled={!isValidCategory(selectedCategory)} onClick={() => handleReady(index)}>
                      Готово
                    </ButtonText>
                  </Grid>
                  <Grid item>
                    <RenderRemove category={selectedCategory} index={index} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {/*Отрасль*/}
              <Grid item xs={3}>
                <Paper sx={{ width: '100%' }} elevation={0}>
                  <List
                    selectedValue={selectedCategory.branchId}
                    options={branchOptions}
                    onChange={(value) => handleChange('branch', value)}
                  />
                </Paper>
              </Grid>
              {/*Категория*/}
              <Grid item xs={3}>
                <Paper sx={{ width: '100%' }} elevation={0}>
                  <List
                    selectedValue={selectedCategory.categoryId}
                    emptyListMessage={'Выберите отрасль'}
                    options={categoryOptions}
                    onChange={(value) => handleChange('category', value)}
                  />
                </Paper>
              </Grid>
              {/*Подкатегория*/}
              <Grid item xs={3}>
                <Paper sx={{ width: '100%' }} elevation={0}>
                  <List
                    selectedValue={selectedCategory?.subCategoryId}
                    emptyListMessage={'Выберите подкатегорию'}
                    options={subCategoryOptions}
                    onChange={(value) => handleChange('subCategory', value)}
                  />
                </Paper>
              </Grid>
              {/*Группа*/}
              <Grid item xs={3}>
                <Paper sx={{ width: '100%' }} elevation={0}>
                  <List
                    emptyListMessage={'Выберите группу'}
                    selectedValue={selectedCategory.groupId}
                    options={groupOptions}
                    onChange={(value) => handleChange('group', value)}
                    group
                    selectedCategory={formik.values.selectedCategories}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      {!readOnlyMode && (
        <Grid item xs={12}>
          <SecondaryButton fullWidth onClick={handleAddCategory} disabled={formik.values.selectedCategories.length > 2}>
            <Box mr={1} mb={0.2}>
              <i className="ui ui_plus" style={{ fontSize: 10 }}></i>
            </Box>
            Добавить категорию
          </SecondaryButton>
        </Grid>
      )}

      <SimpleModalV2
        open={modalData.open}
        onSubmit={modalData.handleSubmit}
        onCancel={() => setModalData({ ...modalData, ...{ open: false } })}
        title={modalData.title}
        desc={modalData.desc}
        submitLabel={modalData.submitLabel}
        loading={modalData.loading}
        cancelLabel={modalData.cancelLabel}
      />
    </Box>
  );
};

export default Categories;
