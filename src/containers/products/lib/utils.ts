import { AttributeType } from '../../../const';
import { getCategoryByIdV3 } from '../../modules/seller/products/lib/utils';

export const generateBreadcrumbs = (branches, categoryId) => {
  const currentCategory = getCategoryByIdV3(branches, categoryId);
  return [
    {
      name: 'Главная',
      link: '/',
    },
    ...currentCategory.parents.map((parent) => ({
      name: parent.name,
      link: `/catalogs/${parent.id}`,
    })),
    {
      name: currentCategory.name,
      link: `/catalogs/${currentCategory.id}`,
    },
  ];
};

/**
 * Не могу понять почему или Nextjs или браузер:
 * Если у квери парам массива один элемент. то он автоматом конвертит его в стринг ([1] => 1)
 * @param routerQuery
 */
export const prepareQueryParams = (routerQuery) => {
  if (routerQuery['u[1]']) {
    if (typeof routerQuery['u[1]'] === 'string') {
      routerQuery['u[1]'] = [routerQuery['u[1]']];
    }
  }
  if (routerQuery['ids']) {
    if (typeof routerQuery['ids'] === 'string') {
      routerQuery['ids'] = [routerQuery['ids']];
    }
  }
  Object.keys(routerQuery).forEach((paramKey) => {
    if (paramKey.startsWith('a[5]')) {
      if (typeof routerQuery[paramKey] === 'string') {
        routerQuery[paramKey] = [routerQuery[paramKey]];
      }
    }
  });
  return routerQuery;
};

export const prepareQueryAttributes = (attributes, queryParams) => {
  const result = [];
  Object.keys(queryParams).forEach((paramKey) => {
    if (paramKey.startsWith('a[')) {
      // console.log('paramKey', paramKey.split(/([\[\]])/));

      const [type, id] = getNumberValues(paramKey);

      const found = attributes.find((attr) => attr.id === id && attr.type === type) || null;
      switch (found.type) {
        case AttributeType.STRING:
        case AttributeType.INTEGER:
        case AttributeType.FLOAT:
          result.push({ label: found.name, value: queryParams[paramKey], paramKey });
          break;
        case AttributeType.LIST:
          const foundVariant = found.variants.find((variant) => variant.id === parseInt(queryParams[paramKey]));
          result.push({ label: found.name, value: foundVariant.name, paramKey });
          break;
        case AttributeType.LIST_MULTIPLE: {
          const foundVariantNames = queryParams[paramKey].map(
            (paramValue) => found.variants.find((variant) => variant.id === parseInt(paramValue)).name,
          );
          result.push({ label: found.name, value: foundVariantNames.join(', '), paramKey });
          break;
        }
        case AttributeType.BOOLEAN: {
          result.push({ label: found.name, value: parseInt(queryParams[paramKey]) === 1 ? 'Да' : 'Нет' }, paramKey);
          break;
        }
      }
    }
  });

  return result;
};

export const prepareSellersQueryParams = (routerQuery) => {
  if (routerQuery['u[1]']) {
    if (typeof routerQuery['u[1]'] === 'string') {
      routerQuery['u[1]'] = [routerQuery['u[1]']];
    }
  }
  return routerQuery;
};

export const getNumberValues = (queryString) => {
  return queryString
    .split('[')
    .filter((val) => val.replace(/^\D+/g, '') !== '')
    .map((val) => parseInt(val.match(/\d+/)[0]));
};
