import { Filters } from './TableNavigation';

export function combineFilters(filters: Filters) {
  return Object.keys(filters).reduce((obj, key) => {
    const filterKey = key as keyof Filters;
    if (key === 'statuses' && filters.statuses) {
      return {
        ...obj,
        'statuses[]': filters.statuses,
      };
    }

    if (key === 'countries' && filters.countries) {
      return {
        ...obj,
        'countries[]': filters.countries,
      };
    }

    if (key === 'scope_delivery_ed' && filters.scope_delivery_ed) {
      return {
        ...obj,
        'scope_delivery[id]': filters.scope_delivery_ed,
      };
    }

    if (key === 'scope_delivery_min' && filters.scope_delivery_min) {
      return {
        ...obj,
        'scope_delivery[value]': filters.scope_delivery_min,
      };
    }

    if (key === 'industry' && filters.industry) {
      return {
        ...obj,
        'catalogs[]': filters.industry,
      };
    }

    if (key === 'category' && filters.category) {
      return {
        ...obj,
        'catalogs[]': filters.category,
      };
    }

    if (key === 'subcategory' && filters.subcategory) {
      return {
        ...obj,
        'catalogs[]': filters.subcategory,
      };
    }

    if (key === 'groups' && filters.groups) {
      return {
        ...obj,
        'catalogs[]': filters.groups,
      };
    }

    return {
      ...obj,
      [key]: Object.keys(filters)
        .filter(
          (key) =>
            Boolean(filters[key as keyof Filters]) ||
            (Array.isArray(filters[key as keyof Filters]) &&
              (filters[key as keyof Filters] as unknown as number[]).length),
        )
        .reduce((obj, key) => ({ ...obj, [key]: filters[key as keyof Filters] }), {} as Filters)[filterKey],
    };
  }, {});
}
