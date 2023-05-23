import currency from 'currency.js';
import { format } from 'date-fns';
import _ from 'lodash';

import countries from '../const/countres';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;

export const showErrors = (error: any, formik: any) => {
  _.forEach(error.data, (item, key) => {
    formik.setFieldError(`${key}`, item.text);
    // эта штука ломает логику, когда данные приходят с сервера, а setFieldTouched далее вызывает логику validateForm,
    // а validateForm в свою очередь возвращает true и снова стирает все ошибки
    // formik.setFieldTouched(`${key}`, true);
  });
};

export const validatePhone: any = ({ phone, data, e, formattedValue }) => {
  if (phone === '' || phone === undefined) {
    return true;
  }
  //При получении данных с сервера phone = formattedValue, почему то при вводе некоторых цифр + не появляется
  if (phone && phone === formattedValue && phone.startsWith('+')) {
    return true;
  }
  return countries.some((country: any) => {
    return (
      (_.startsWith(phone, country.dialCode) || _.startsWith(country.dialCode, phone)) &&
      country.format.length === formattedValue?.length
    );
  });
};

export function strongPasswordMethod() {
  return this.test('strongPasswordTest', _, function (value) {
    const { path, createError } = this;
    switch (Boolean(value)) {
      case /[а-яА-ЯЁё]/.test(value):
        return createError({ path, message: 'Пароль должен содержать только латинские символы' });
      case !/^(?=.{8,})/.test(value):
        return createError({ path, message: 'Пароль должен содержать как минимум 8 символов' });
      case value.length > 30:
        return createError({ path, message: 'Пароль должен содержать не более 30 символов' });
      case !/^(?=.*[a-z])/.test(value):
        return createError({ path, message: 'Пароль должен содержать как минимум одну маленькую букву(a-z)' });
      case !/^(?=.*[A-Z])/.test(value):
        return createError({ path, message: 'Пароль должен содержать как минимум одну большую букву(A-Z)' });
      case !/^(?=.*[0-9])/.test(value):
        return createError({ path, message: 'Пароль должен содержать как минимум одну цифру(0-9)' });
      case !/^\S*$/.test(value):
        return createError({ path, message: 'Пароль не должен содержать пробелы' });
      // case !/^(?=.*[!#$%&'*+-/=?^_`{|}~@])/.test(value):
      //   return createError({
      //     path,
      //     message: `Пароль должен содержать как минимум один специальный символ (! # $ % & ' * + — / =? ^ _ \` { | } ~@)`,
      //   });
      case !/^[a-zA-Z0-9!#$%&*+-\\/\=?^_`{|}~@:;,.\[\]\(\)\\\\]+$/.test(value): {
        return createError({
          path,
          message: `Пароль содержит недопустимые символы`,
        });
      }
      default:
        return true;
    }
  });
}

export const formatPhoneNumber = (phone) => {
  const number = phoneUtil.parseAndKeepRawInput(phone);
  return phoneUtil.format(number, PNF.INTERNATIONAL);
};

export const getShipmentDays = (value) => {
  return pluralize(Math.ceil(value / 24), ['день', 'дня', 'дней']);
};

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
export function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}

export const pluralizeWithoutNum = (number, arr) => {
  if (number % 100 >= 5 && number % 100 <= 20) {
    //5 дней
    return `${arr[0]}`;
  } else if (number % 10 == 1) {
    //1 день
    return `${arr[1]}`;
  } else if (number % 10 >= 2 && number % 10 <= 4) {
    //2 дня
    return `${arr[2]}`;
  }
  //6 дней
  return `${arr[0]}`;
};

/**
 * Если был изменен фильтр, обнуляем пагинацию
 * @param query
 */
export const withClearPagination = (query) => {
  const finalQuery = { ...query };
  if (finalQuery.page) {
    delete finalQuery.page;
  }

  return finalQuery;
};

export const withTempParams = (query) => {
  return { ...query };
};

export const MadFormatter = {
  // toDate: (unix, format = 'D MMMM YYYY') => moment.unix(unix).format(format), // дата типа 25 декабря 2010
  // toDateShort: (unix, format = 'DD.MM.YYYY') => moment.unix(unix).format(format), // дата типа 25.12.2010
  // toFormalRusDate: (date) => moment(date).locale('ru').format('DD MM YYYY').split(' ').join('.'), // дата типа 25.12.2010
  // toDateTime: (unix, format = 'D MMMM YYYY H:mm') => moment(unix * 1000).format(format), // дата-время типа 25 декабря 2010 10:00
  toCurrency: (value, unit = '₽', precision = 0) =>
    unit + currency(value, { symbol: '', separator: ' ', precision }).format(), // форматирование числа из 100000 на тип 100 000 руб
  toTime: (unix) => format(unix * 1000, 'HH:mm'), // время типа 10:00
};

// CatalogMain filter by params, it can be improved
export type CatalogType = {
  id: number;
  isMainCatalog: boolean;
  level: number;
  levelLabel: string;
  name: string;
  parents?: CatalogType[];
  childs?: CatalogType[];
};

type FilterParams = {
  id?: number;
  level?: number;
};

type ResultType = CatalogType[] | boolean | string | number;

export const getCatalogMainByParams = (
  catalogs: CatalogType[],
  params: FilterParams,
  key?: keyof CatalogType,
  direction?: boolean,
  childsKey?: 'parents' | 'childs',
  usedParams?: FilterParams,
): ResultType => {
  if (!catalogs?.length) {
    return [];
  }
  const currentCatalogs = catalogs[0];

  if (params.id && !usedParams?.id) {
    if (currentCatalogs.id !== params.id) {
      return getCatalogMainByParams(currentCatalogs[childsKey || 'parents'] || [], params, key, direction, childsKey);
    }
  }

  if (params.level && !usedParams?.level) {
    if (!direction ? params.level > currentCatalogs.level : params.level < currentCatalogs.level) {
      return [];
    }

    if (params.level !== currentCatalogs.level) {
      return getCatalogMainByParams(currentCatalogs[childsKey || 'parents'] || [], params, key, direction, childsKey, {
        id: currentCatalogs.id,
      });
    }
  }

  return (key ? currentCatalogs[key] : [currentCatalogs]) as ResultType;
};

//Функция для отсылки url корректного формата на бэк
export const changeUrlToCorrect = (url: string) => {
  if (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    url = url.replace('', 'https://');

    return url;
  }
  return '';
};

export const formatPhone = (value) => {
  if (value.startsWith('+')) {
    return value.replace('+', '');
  }
  return '+' + value;
};
