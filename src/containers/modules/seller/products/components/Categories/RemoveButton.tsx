import { Box, IconButton } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

import Tooltip from '../../../../../../components/Tooltip';
import { useStyles } from '../../style';

/**
 *
 * Чет все сложно.
 * Данный компонент должен работать так
 * 1. Если это единственная категория, просто делаем disabled
 * 2. Если это главная категория, делаем disabled и выводом тултип
 */
const RenderRemove = ({ category, index }) => {
  const { classes } = useStyles();
  const formik = useFormikContext();

  const handleRemove = (index) => {
    let selectedCategoriesArr = [...formik.values.selectedCategories];
    selectedCategoriesArr = selectedCategoriesArr.filter((item, key) => key !== index);
    formik.setFieldValue('selectedCategories', selectedCategoriesArr);
  };

  if (category.isMain) {
    return (
      <Tooltip
        title={'Сначала выберите другую основную категорию'}
        placement={'top'}
        disableFocusListener
        disableTouchListener
      >
        <Box>
          <IconButton className={classes.customDelete} disabled>
            <i className="ui_trash" />
          </IconButton>
        </Box>
      </Tooltip>
    );
  }
  return (
    <IconButton className={classes.customDelete} onClick={() => handleRemove(index)}>
      <i className="ui_trash" />
    </IconButton>
  );
};
export default RenderRemove;
