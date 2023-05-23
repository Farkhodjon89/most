import { TextField } from 'components/Textfield';
import { useStore } from 'context/StoreContext';
import { useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';

import BooleanAttribute from './BooleanAttribute';
import CheckboxGroupAttribute from './CheckboxGroup';
import RadioGroupAttribute from './RadioGroup';

const Attributes: FC<any> = ({ readOnlyMode = false }) => {
  const { attributes, onSubCategoryOrGroupChange } = useStore();
  const formik = useFormikContext();
  const handleTextFieldChange = (attribute, e) => {
    const attributesArr = [...formik.values.attributes];
    const foundAttribute = attributesArr.find((item) => item.id === attribute.id);
    let value = e.target.value;
    if (attribute.typeLabel === 'INTEGER') {
      value = parseInt(value);
    }
    if (attribute.typeLabel === 'FLOAT') {
      value = parseFloat(value);
    }

    if (attribute.typeLabel === 'BOOLEAN') {
      value = Boolean(value);
    }
    if (foundAttribute) {
      for (const item of attributesArr) {
        if (item.id === foundAttribute.id) {
          item.value = value;
        }
      }
    }
    formik.setFieldValue('attributes', attributesArr);
  };

  const handleGroupChange = (attribute, value) => {
    const attributesArr = [...formik.values.attributes];
    const foundAttribute = attributesArr.find((item) => item.id === attribute.id);
    if (foundAttribute) {
      for (const item of attributesArr) {
        if (item.id === foundAttribute.id) {
          item.value = value;
        }
      }
    }

    formik.setFieldValue('attributes', attributesArr);
  };

  useEffect(() => {
    const selectedMainCategory = formik.values.selectedCategories.find((item) => item.isMain && item.isReady);
    //очень важно не вызывать onSubCategoryOrGroupChange если не изменилась основная категория
    if (selectedMainCategory?.subCategoryId) {
      onSubCategoryOrGroupChange(selectedMainCategory.subCategoryId);
    }
    if (selectedMainCategory?.groupId) {
      onSubCategoryOrGroupChange(selectedMainCategory.groupId);
    }
  }, [formik.values.selectedCategories]);

  /**
   * Срабатывает как только основная категория считается подтвержденной
   * Берем все данные аттрибута с сервера и добавляем атрибут value (может быть и массив и строка)
   */
  useEffect(() => {
    if (attributes.length > 0) {
      const attributesArr = [...attributes];

      // console.log('attributesArr attributesArr', attributesArr);
      const result = [];
      attributesArr.forEach((attribute) => {
        let value = attribute.typeLabel === 'BOOLEAN' ? false : '';
        // если товар редактируется, то данные сервера уже подгружены и нужно вставить их значение
        const found = formik.values.attributes.find((attr) => attr.id === attribute.id);
        if (found) {
          value = found.value;
        }

        result.push({
          ...attribute,
          ...{ value },
        });
      });
      formik.setFieldValue('attributes', result);
    }
  }, [attributes]);

  if (attributes.length === 0) {
    return null;
  }

  return formik.values.attributes.map((attribute, key) => {
    if (['INTEGER', 'FLOAT', 'STRING'].includes(attribute.typeLabel)) {
      return (
        // <Grid item xs={12} key={key}>
        <TextField
          key={key}
          label={`${attribute.name}${attribute.isRequired && '*'}`}
          onFocus={() => formik.setFieldTouched(`attribute_${attribute.id}`, false)}
          onBlur={() => formik.setFieldTouched(`attribute_${attribute.id}`, true)}
          value={formik.values.attributes.find((item) => item.id === attribute.id)?.value || ''}
          onChange={(e) => handleTextFieldChange(attribute, e)}
          error={formik.touched[`attribute_${attribute.id}`] && Boolean(formik.errors.attributes?.[key]?.value)}
          helperText={formik.touched[`attribute_${attribute.id}`] && formik.errors.attributes?.[key]?.value}
          disabled={readOnlyMode}
        />
      );
    }
    if (attribute.typeLabel === 'BOOLEAN') {
      return <BooleanAttribute key={key} item={attribute} onChange={handleGroupChange} readOnlyMode={readOnlyMode} />;
    }

    if (attribute.typeLabel === 'LIST') {
      return (
        <RadioGroupAttribute
          readOnlyMode={readOnlyMode}
          key={key}
          item={attribute}
          options={attribute.variants}
          onChange={handleGroupChange}
          isRequired={foundAttribute.isRequired}
        />
      );
    }
    if (attribute.typeLabel === 'LIST_MULTIPLE') {
      return (
        <CheckboxGroupAttribute
          readOnlyMode={readOnlyMode}
          key={key}
          item={attribute}
          options={attribute.variants}
          onChange={handleGroupChange}
          isRequired={foundAttribute.isRequired}
        />
      );
    }
    return null;
  });
};

export default Attributes;
