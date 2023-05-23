import { YupMessages } from 'const';
import { Formik } from 'formik';
import React, { FC } from 'react';
import validator from 'validator';
import * as Yup from 'yup';

import { initialValues } from '../lib/utils';

export const FormikProvider: FC<any> = ({ children }) => {
  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(80, 'Максимальная длина строки 80 символов')
          .min(3, 'Минимальная длина строки 3 символа')
          .required(YupMessages.REQUIRED),
        sku: Yup.string()
          .max(20, 'Максимальная длина строки 20 символов')
          .min(3, 'Минимальная длина строки 3 символа')
          .required(YupMessages.REQUIRED),
        countryId: Yup.string().required(YupMessages.REQUIRED),
        price: Yup.number().typeError(YupMessages.ONLY_NUM).required(YupMessages.REQUIRED),
        sale: Yup.number().typeError(YupMessages.ONLY_NUM).required(YupMessages.REQUIRED),
        additionalMarkup: Yup.number().typeError(YupMessages.ONLY_NUM).required(YupMessages.REQUIRED),
        // isPrepayment: Yup.boolean(),
        shipmentTime: Yup.number().typeError(YupMessages.ONLY_NUM).required(YupMessages.REQUIRED),
        selectedCategories: Yup.array().of(
          Yup.object({
            isReady: Yup.boolean().oneOf([true]),
          }),
        ),
        prepaymentValue: Yup.string().when('isPrepayment', {
          is: true,
          then: Yup.string().required(YupMessages.REQUIRED),
          otherwise: Yup.string(),
        }),
        description: Yup.object()
          .test('required', YupMessages.REQUIRED, (item) => {
            if (item?.value === '<p><br></p>' || item.value === '' || item.value === undefined) {
              return false;
            }
            return true;
          })
          .test('maxValue', 'Количество вводимых символов не должно превышать 2000', (item) => {
            if (item?.code === 'MAX_STRING') {
              return false;
            }
            return true;
          }),
        attributes: Yup.array().of(
          Yup.object().shape({
            isRequired: Yup.boolean(),
            typeLabel: Yup.string(),
            value: Yup.mixed()
              .when('isRequired', {
                is: true,
                then: Yup.mixed().required(YupMessages.REQUIRED),
              })
              .test('float', YupMessages.FLOAT, (value, context) => {
                if (context.parent.typeLabel === 'FLOAT') {
                  if (value && !validator.isFloat(value.toString())) {
                    return false;
                  }
                }
                return true;
              })
              .test('integer', YupMessages.INTEGER, (value, context) => {
                if (context.parent.typeLabel === 'INTEGER') {
                  if (value && !validator.isInt(value.toString())) {
                    return false;
                  }
                }
                return true;
              })
              .test('listMultiple', YupMessages.LIST_MIN_ONE_OPTION, (value, context) => {
                if (context.parent.typeLabel === 'LIST_MULTIPLE') {
                  if (value && value.length === 0 && context.parent.isRequired) {
                    return false;
                  }
                }
                return true;
              })
              .test('list', YupMessages.LIST, (value, context) => {
                if (context.parent.typeLabel === 'LIST') {
                  if (value && value === '' && context.parent.isRequired) {
                    return false;
                  }
                }
                return true;
              }),
          }),
        ),
        customAttributes: Yup.array().of(
          Yup.object().shape(
            {
              label: Yup.string().when('value', {
                is: (value) => value !== undefined,
                then: Yup.string().required(YupMessages.REQUIRED),
                otherwise: Yup.string(),
              }),
              value: Yup.string().when('label', {
                is: (label) => label !== undefined,
                then: Yup.string().required(YupMessages.REQUIRED),
                otherwise: Yup.string(),
              }),
            },
            ['value', 'label'],
          ),
        ),
        terms: Yup.array().of(
          Yup.object().shape({
            unitId: Yup.number()
              .typeError(YupMessages.ONLY_NUM)
              .required(YupMessages.REQUIRED)
              .integer(YupMessages.INTEGER),
            value: Yup.number()
              .typeError(YupMessages.ONLY_NUM)
              .required(YupMessages.REQUIRED)
              .integer(YupMessages.INTEGER),
          }),
        ),
      })}
      onSubmit={(values, actions) => {
        // do nothing due to we have draft state, formik does not allow skip validation
      }}
    >
      {children}
    </Formik>
  );
};
