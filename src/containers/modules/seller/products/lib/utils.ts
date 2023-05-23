import { ProductStatus } from '../../../../../const';

export const initialValues = {
  name: '',
  sku: '',
  description: { value: '' },
  keyWords: '',
  countryId: '',
  attributes: [],
  customAttributes: [
    {
      label: '',
      value: '',
    },
  ],
  selectedCategories: [
    {
      branchId: 0,
      categoryId: 0,
      subCategoryId: 0,
      groupId: 0,
      isMain: true,
      isReady: false,
    },
  ],
  photos: [],
  certificates: [],
  terms: [
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
  ],
  price: '',
  priceUnitId: 1,
  sale: '',
  additionalMarkup: '',
  isPrepayment: false,
  isPostpaid: true,
  prepaymentValue: '',
  status: 0,
  shipmentTime: '',
};

export const prepareSubmitData = (values, status) => {
  const result = {
    status,
    name: values.name,
    sku: values.sku,
    catalogs: values.selectedCategories.filter((item) => item.isReady).map((cat) => cat.groupId || cat.subCategoryId),
    main_catalog: values.selectedCategories.find((cat) => cat.isMain)?.subCategoryId,
    country_id: values.countryId,
    description: values.description.value,
    key_words: values.keyWords,
    photo: values.photos.map((item) => item.uuid),
    certificates: values.certificates.map((item) => item.uuid),
    terms: values.terms.map((term) => ({ type: term.typeId, unitId: term.unitId, value: term.value })),
    price: parseFloat(values.price),
    currency_id: 1, //todo
    sale: parseInt(values.sale),
    additionalMarkup: parseInt(values.additionalMarkup),
    isPrepayment: values.isPrepayment,
    prepaymentValue: parseInt(values.prepaymentValue) || 0,
    shipmentTime: parseInt(values.shipmentTime) * 24, //parseInt(values.terms[2].value) * values.terms[2].unitId,
    isPostpaid: values.isPostpaid,
    attributes: values.attributes
      .filter((item) => item.value !== '')
      .map((item) => ({ attributeId: item.id, value: item.value })),
    seller_attributes: values.customAttributes
      .filter((item) => item.value !== '')
      .map((item) => ({ name: item.label, value: item.value })),
  };

  if (values.countryId === '') {
    delete result.country_id;
  }
  if (values.mainCatalog === 0) {
    delete result.mainCatalog;
  }

  if (values.selectedCategories.filter((item) => item.isReady).length === 0) {
    delete result.catalogs;
  }

  if (!values.sale && values.sale !== 0) {
    delete result.sale;
  }
  if (!values.additionalMarkup && values.additionalMarkup !== 0) {
    delete result.additionalMarkup;
  }

  if (!values.price) {
    delete result.price;
  }

  if (values.terms.some((item) => item.unitId === '')) {
    delete result.terms;
  }

  return result;
};

export const isValidCategory = (category) => {
  return category.branchId !== 0 && category.categeryId !== 0 && category.subCategoryId !== 0;
};

export const getCategoryById = (categories, level, id) => {
  let result = undefined;
  if (level === 1) {
    result = categories.find((item) => item.id === id);
  }
  if (level === 2) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);
    result = allCategories.find((item) => item.id === id);
  }

  if (level === 3) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allSubCategories = allCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);
    result = allSubCategories.find((item) => item.id === id);
  }

  if (level === 4) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allSubCategories = allCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allGroups = allSubCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    result = allGroups.find((item) => item.id === id);
  }

  return result;
};

export const getCategoryByIdV2 = (categories, id) => {
  let result = undefined;
  result = categories.find((item) => item.id === id);

  if (!result) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);
    result = allCategories.find((item) => item.id === id);
  }

  if (!result) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allSubCategories = allCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);
    result = allSubCategories.find((item) => item.id === id);
  }

  if (!result) {
    const allCategories = categories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allSubCategories = allCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    const allGroups = allSubCategories.reduce((acc, item) => {
      acc.push(...item.childs);
      return acc;
    }, []);

    result = allGroups.find((item) => item.id === id);
  }

  return result;
};

export const getCategoryByIdV3 = (categories, categoryId) => {
  let result = undefined;
  for (const branch of categories) {
    if (branch.id === categoryId) {
      result = branch;
      result.parents = [];
      return result;
    }

    for (const category of branch.childs) {
      if (category.id === categoryId) {
        result = category;
        result.parents = [branch];
        return result;
      }
      for (const subCategory of category.childs) {
        if (subCategory.id === categoryId) {
          result = subCategory;
          result.parents = [branch, category];
          return result;
        }
        // for (const group of subCategory.childs) {
        //   result = group;
        //   result.parents = [branch, category, subCategory];
        //   return result;
        // }
      }
    }
  }

  return result;
};

export const prepareInitialData = (serverData) => {
  const result = initialValues;
  result.sku = serverData.sku;
  result.name = serverData.name;
  result.description = { value: serverData.description };
  result.keyWords = serverData.keyWords;
  result.shipmentTime = serverData.shipmentTime;
  result.countryId = serverData.country?.id || '';
  result.attributes = serverData.attributes.map((attr) => {
    if (attr.typeLabel === 'LIST') {
      return {
        ...attr,
        ...{
          value: attr.value.id,
        },
      };
    }
    if (attr.typeLabel === 'LIST_MULTIPLE') {
      return {
        ...attr,
        ...{
          value: attr.value.map((val) => val.id),
        },
      };
    }
    return attr;
  });
  if (serverData.sellerAttributes.length) {
    result.customAttributes = serverData.sellerAttributes.map((attr) => ({ value: attr.value, label: attr.name }));
  }

  result.selectedCategories = serverData.catalogs.map((catalog) => {
    const groupId = catalog.level === 4 ? catalog.id : 0;
    const subCategoryId = groupId === 0 ? catalog.id : catalog.parents[0].id;
    const categoryId = groupId === 0 ? catalog.parents[0].id : catalog.parents[0].parents[0].id;
    const branchId = groupId === 0 ? catalog.parents[0].parents[0].id : catalog.parents[0].parents[0].parents[0].id;
    return {
      branchId,
      categoryId,
      subCategoryId,
      groupId,
      isMain: catalog.isMainCatalog || false,
      isReady: true,
    };
  });
  result.photos = serverData.photo;
  result.certificates = serverData.certificates;
  result.terms.forEach((defaultTerm, index) => {
    if (serverData.termsSale[index]) {
      // console.log('serverData.termsSale[index]', serverData.termsSale[index]);
      result.terms[index] = {
        typeId: serverData.termsSale[index].type,
        unitId: serverData.termsSale[index].id,
        value: serverData.termsSale[index].value,
      };
    }
  });
  result.priceUnitId = 1; // пока константа, в рублях
  result.price = serverData.price || '';
  result.sale = serverData.sale;
  result.additionalMarkup = serverData.additionalMarkup;
  result.isPrepayment = serverData.isPrepayment;
  result.isPostpaid = serverData.isPostpaid;
  result.prepaymentValue = serverData.prepaymentValue;
  result.status = serverData.status;
  const isThereMainCatalog = result.selectedCategories.some((item) => item.isMain);
  if (!isThereMainCatalog && result.selectedCategories.length !== 0) {
    result.selectedCategories[0].isMain = true;
  }
  return result;
};

/**
 * Функция нужна для того, чтобы понять, нужно ли отправлять товар на повторную модерацию
 * Правила
 * https://most-space.atlassian.net/wiki/spaces/BR/pages/27164821/-#%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0
 */
export const checkIfNeedValidation = (formikValues, serverValues) => {
  let result = false;
  //Если товар в черновике, по любому нужно на модерацию
  if (serverValues.status === ProductStatus.Draft) {
    result = true;
  }
  if (formikValues.name !== serverValues.name) {
    result = true;
  }
  if (formikValues.description.value !== serverValues.description) {
    result = true;
  }

  if (formikValues.keyWords !== serverValues.keyWords) {
    result = true;
  }

  formikValues.selectedCategories.forEach((selectedCategory, index) => {
    const targetCatalog = serverValues.catalogs[index];
    if (targetCatalog) {
      const groupId = targetCatalog.level === 4 ? targetCatalog.id : 0;
      const subCategoryId = groupId === 0 ? targetCatalog.id : targetCatalog.parents[0].id;
      const categoryId = groupId === 0 ? targetCatalog.parents[0].id : targetCatalog.parents[0].parents[0].id;
      const branchId =
        groupId === 0 ? targetCatalog.parents[0].parents[0].id : targetCatalog.parents[0].parents[0].parents[0].id;
      if (
        selectedCategory.branchId !== branchId ||
        selectedCategory.categoryId !== categoryId ||
        selectedCategory.subCategoryId !== subCategoryId ||
        selectedCategory.groupId !== groupId
      ) {
        result = true;
      }
    }
  });

  formikValues.attributes.forEach((attr, index) => {
    const targetAttr = serverValues.attributes[index];
    if (targetAttr && attr.isHasValidation) {
      switch (attr.typeLabel) {
        case 'LIST': {
          if (attr.value !== targetAttr.value.id) {
            result = true;
          }
          break;
        }
        case 'LIST_MULTIPLE': {
          if (JSON.stringify(attr.value) !== JSON.stringify(targetAttr.value.map((val) => val.id))) {
            result = true;
          }
          break;
        }
        default: {
          if (JSON.stringify(attr.value) !== JSON.stringify(targetAttr.value)) {
            result = true;
          }
        }
      }
    }
  });

  formikValues.customAttributes.forEach((customAttribute, index) => {
    const targetCustomAttribute = serverValues.sellerAttributes[index];
    if (
      targetCustomAttribute &&
      (targetCustomAttribute.value !== customAttribute.value || targetCustomAttribute.label !== customAttribute.label)
    ) {
      result = true;
    }
  });
  if (serverValues.termsSale[0] && formikValues.terms[0].unitId !== serverValues.termsSale[0].id) {
    result = true;
  }

  formikValues.photos.forEach((photo) => {
    const found = serverValues.photo.find((p) => p.uuid === photo.uuid);
    if (!found) {
      result = true;
    }
  });

  formikValues.certificates.forEach((photo) => {
    const found = serverValues.certificates.find((p) => p.uuid === photo.uuid);
    if (!found) {
      result = true;
    }
  });

  return result;
};

export const checkAvailableStatuses = (currentStatus) => {
  let result = [];
  if (currentStatus === ProductStatus.Draft) {
    result = [ProductStatus.Draft, ProductStatus.InModeration];
  }
  if (currentStatus === ProductStatus.InModeration) {
    result = [ProductStatus.Draft];
  }
  if (currentStatus === ProductStatus.Refused) {
    result = [ProductStatus.Draft, ProductStatus.InModeration];
  }

  if (currentStatus === ProductStatus.ReadyForSale) {
    result = [ProductStatus.OnSale, ProductStatus.ReadyForSale, ProductStatus.Draft];
  }

  if (currentStatus === ProductStatus.OnSale) {
    result = [ProductStatus.ReadyForSale, ProductStatus.Draft];
  }

  return result;
};
