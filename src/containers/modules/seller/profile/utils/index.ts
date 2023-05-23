import { decamelize } from 'humps';
import _ from 'lodash';
import * as Yup from 'yup';

import { DOCUMENT_LIST, EMAIL_REGEX, URL_REGEX, YupMessages } from '../../../../../const';
import { changeUrlToCorrect, validatePhone } from '../../../../../utils/common';
import { PROFILE_COMPANY_FIELDS, PROFILE_COMPONY_FIELDS_TABS_KEY } from './const';

const splitValues = (serverData: any, key: string) => {
  if (key === 'businessTypes') {
    return serverData[key].map((item: { id: string | number }) => item.id) || [];
  }

  if (key === 'phone') {
    return serverData.phone
      ? { phone: `+${serverData.phone}`, formattedValue: `+${serverData.phone}` }
      : { phone: '', formattedValue: '' };
  }
  if (key === 'avatar') {
    return serverData.avatar ? serverData.avatar : null;
  }

  if (key === 'documents') {
    return serverData.documents || [];
  }

  if (key === 'description') {
    return { value: serverData.description || '' };
  }

  return serverData[key] || '';
};

export const fillProfileData = (serverData: any, documentsServerData: any) => {
  const documents = [];
  if (documentsServerData) {
    _.forEach(documentsServerData, (item, key) => {
      if (item) {
        documents.push({ name: decamelize(key, { split: /(?=[A-Z0-9])/ }), file: item });
      }
    });
  }

  const values = Object.keys(PROFILE_COMPANY_FIELDS).reduce(
    (values, key) => ({
      ...values,
      [key]: splitValues(serverData, key),
    }),
    {},
  );
  return { ...values, documents, ...{ employeesCountId: serverData.employeesCount?.id || '' } };
};

export const prepareSubmitData = (values, type) => {
  // const result = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== null && v !== ''));
  const result = Object.fromEntries(Object.entries(values));
  result.webLink = changeUrlToCorrect(result.webLink);
  result.type = type;

  if (result.phone) {
    result.phone = result.phone?.phone;
  }
  if (result.description) {
    result.description = result.description.value;
  }
  if (result.documents.length > 0) {
    result.documents = result.documents.map((item) => ({ name: item.name, uuid: item.file.uuid }));
  }

  if (result.employeesCountId === '') {
    delete result.employeesCountId;
  }

  if (result.avatar && result.avatar.uuid) {
    result.avatar = result.avatar.uuid;
  } else {
    delete result.avatar;
  }
  return result;
};

export const validationSchema = (companyType = 'individual') =>
  Yup.object({
    name: Yup.string().min(3, YupMessages.MIN_STRING).max(192, YupMessages.MAX_STRING).required(YupMessages.REQUIRED),
    inn: Yup.string()
      .required(YupMessages.REQUIRED)
      .min(companyType === 'individual' ? 12 : 10, YupMessages.INN_STRING)
      .max(companyType === 'individual' ? 12 : 10, YupMessages.MAX_INN_STRING),
    kpp: Yup.string().required(YupMessages.REQUIRED).min(9, YupMessages.KPP_STRING).max(9, YupMessages.KPP_STRING),
    // foundedYear: Yup.string().min(4, YupMessages.YEAR_STRING).max(4, YupMessages.YEAR_STRING),
    foundedYear: Yup.string()
      .min(4, YupMessages.YEAR_STRING)
      .max(4, YupMessages.YEAR_STRING)
      .test('futureYear', YupMessages.FUTURE_YEAR, (value) => {
        if (value === '' || value === undefined) {
          return true;
        }

        const today = new Date();
        return parseInt(value) <= today.getFullYear();
      }),
    ogrn: Yup.string().required(YupMessages.REQUIRED).min(13, YupMessages.OGRN_STRING).max(13, YupMessages.OGRN_STRING),
    avatar: Yup.object(),
    phone: Yup.object()
      // .required(YupMessages.REQUIRED)
      // .test('required', YupMessages.REQUIRED, (value) => {
      //   return value.phone !== '' && value.phone !== undefined && value.phone !== null;
      // })
      .test('validPhone', YupMessages.INVALID_PHONE_NUMBER, validatePhone),
    email: Yup.string().matches(EMAIL_REGEX, YupMessages.EMAIL).max(256, YupMessages.MAX_STRING),
    // .required(YupMessages.REQUIRED),
    webLink: Yup.string().matches(URL_REGEX, YupMessages.VALID_URL),
    registeredAddress: Yup.string()
      .min(8, YupMessages.MIN_STRING)
      .max(192, YupMessages.MAX_STRING)
      .required(YupMessages.REQUIRED),
    factAddress: Yup.string()
      .min(8, YupMessages.MIN_STRING)
      .max(192, YupMessages.MAX_STRING)
      .required(YupMessages.REQUIRED),
    owner: Yup.string().min(8, YupMessages.MIN_STRING).max(192, YupMessages.MAX_STRING).required(YupMessages.REQUIRED),
    description: Yup.object()
      .test('required', YupMessages.REQUIRED, (item) => {
        if (item && (item.value === '<p><br></p>' || item.value === '' || item.value === undefined)) {
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
    documents: Yup.array().test('requiredDocuments', 'error', (values) => {
      const documentList = prepareDocumentList(companyType);
      const requiredDocuments = documentList.filter((item) => item.required);
      return (
        requiredDocuments.filter((requiredDocument) => values.find((value) => value.name === requiredDocument.type))
          .length === requiredDocuments.length
      );
    }),
  });

export const calculateProgress = (formik, me) => {
  const companyType = me?.companies[0].companyType === 'individual' ? '10.4' : '4.4';
  let result = 60;

  if (formik.errors.name) {
    result -= 4;
  }
  if (formik.errors.inn) {
    result -= 4;
  }

  if (formik.values.kpp?.length !== 9) {
    result -= 4;
  }

  if (formik.values.foundedYear.toString().length !== 4) {
    result -= 4;
  }

  if (formik.values.ogrn.length !== 13) {
    result -= 4;
  }

  if (formik.errors.registeredAddress) {
    result -= 4;
  }
  if (formik.errors.factAddress) {
    result -= 4;
  }
  if (formik.errors.owner) {
    result -= 4;
  }

  if (formik.values.businessTypes.length === 0) {
    result -= 4;
  }

  if (formik.values.employeesCountId === -1) {
    result -= 4;
  }
  // 2nd step
  if (formik.errors.description) {
    result -= 4;
  }

  if (formik.errors.phone) {
    result -= 4;
  }

  if (formik.errors.email) {
    result -= 4;
  }

  if (formik.values.avatar === null || _.isEmpty(formik.values.avatar)) {
    result -= 4;
  }

  if (formik.errors.webLink) {
    result -= 4;
  }

  result += Math.round(formik.values.documents.length * companyType);

  return result;
};

export const moveToElement = (formikError: { [key: string]: string }, tabKey: number) => {
  const elementsKeyInThisForm = Object.keys(PROFILE_COMPONY_FIELDS_TABS_KEY).filter(
    (key) => PROFILE_COMPONY_FIELDS_TABS_KEY[key as keyof typeof PROFILE_COMPONY_FIELDS_TABS_KEY].tabKey === tabKey,
  );
  const elementsToMove = Object.keys(formikError).filter((key) => elementsKeyInThisForm?.includes(key));

  if (elementsToMove.length) {
    const elementToMove = document.getElementById(elementsToMove[0]);

    if (elementToMove) {
      window.scrollTo(0, elementToMove.scrollHeight);
    }
  } else {
    window.scrollTo(0, 0);
  }
};

export const prepareDocumentList = (companyType) => {
  let finalList = DOCUMENT_LIST;
  if (companyType === 'individual') {
    finalList = finalList.filter((item) =>
      ['certificate_of_registration', 'egrul_extract', 'authority', 'passport_page_1', 'passport_page_2'].includes(
        item.type,
      ),
    );
  }

  return finalList;
};
