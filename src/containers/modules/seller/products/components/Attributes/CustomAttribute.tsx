import { Box, Divider, Stack, Typography } from '@mui/material';
import { ButtonText, SecondaryButton } from 'components/Button';
import { TextField } from 'components/Textfield';
import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';

import { useStyles } from '../../style';

const CustomAttribute = ({ readOnlyMode = false }) => {
  const { classes } = useStyles();
  const formik = useFormikContext();

  const handleInputChange = (name: string, value: string, index: number) => {
    const customAttributes = [...formik.values.customAttributes];
    customAttributes[index] = { ...customAttributes[index], ...{ [name]: value } };
    formik.setFieldValue('customAttributes', customAttributes);
  };

  const handleAdd = () => {
    const customAttributes = [...formik.values.customAttributes];
    customAttributes.push({
      label: '',
      value: '',
    });
    formik.setFieldValue('customAttributes', customAttributes);
  };

  const handleRemove = (index) => {
    formik.setFieldValue(
      'customAttributes',
      [...formik.values.customAttributes].filter((item, key) => key !== index),
    );
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h4" className={classes.TitleMain}>
        Добавить атрибут
      </Typography>
      {formik.values.customAttributes.map((item, index) => (
        <Fragment key={index}>
          <TextField
            fullWidth
            label="Название атрибута"
            name="name"
            onFocus={() => formik.setFieldTouched(`customAttrLabel${index}`, false)}
            onBlur={() => formik.setFieldTouched(`customAttrLabel${index}`, true)}
            value={formik.values.customAttributes[index]?.label}
            onChange={(e) => handleInputChange('label', e.target.value, index)}
            error={
              formik.touched?.[`customAttrLabel${index}`] && Boolean(formik.errors.customAttributes?.[index]?.label)
            }
            helperText={formik.touched?.[`customAttrLabel${index}`] && formik.errors.customAttributes?.[index]?.label}
            disabled={readOnlyMode}
          />
          <TextField
            fullWidth
            label="Значение"
            name="name"
            onFocus={() => formik.setFieldTouched(`customAttrValue${index}`, false)}
            onBlur={() => formik.setFieldTouched(`customAttrValue${index}`, true)}
            value={formik.values.customAttributes[index]?.value}
            onChange={(e) => handleInputChange('value', e.target.value, index)}
            error={
              formik.touched?.[`customAttrValue${index}`] && Boolean(formik.errors.customAttributes?.[index]?.value)
            }
            helperText={formik.touched?.[`customAttrValue${index}`] && formik.errors.customAttributes?.[index]?.value}
            disabled={readOnlyMode}
          />
          {/* Для того чтобы кнопка удалить была только у добавленных атрибутов */}
          {index + 1 !== formik.values.customAttributes.length && (
            <Box>
              <ButtonText
                className={classes.ButtonDelete}
                color={'error'}
                endIcon={<i className="ui_trash" />}
                onClick={() => handleRemove(index)}
                disabled={formik.values.customAttributes.length === 1}
              >
                Удалить
              </ButtonText>
            </Box>
          )}

          {formik.values.customAttributes.length > 1 && <Divider />}
        </Fragment>
      ))}
      {!readOnlyMode && (
        <SecondaryButton
          fullWidth
          startIcon={<i className="ui ui_plus"></i>}
          onClick={handleAdd}
          disabled={formik.values.customAttributes.length === 30}
        >
          Добавить атрибут
        </SecondaryButton>
      )}
    </Stack>
  );
};

export default CustomAttribute;
