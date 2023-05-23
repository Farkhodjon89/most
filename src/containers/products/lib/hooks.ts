import useAxios from 'axios-hooks';
import { useSession } from 'context/UserContext';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { axiosClient } from '../../../pages/_app';
import { withClearPagination, withTempParams } from '../../../utils/common';
import { ProductOrderType, STATUSES } from './types';
import { prepareQueryParams, prepareSellersQueryParams } from './utils';

export const useProducts = () => {
  const router = useRouter();
  const query: any = router.query;
  const categoryId = parseInt(query.categoryId);
  const url = `/store/catalogs/${categoryId}/union-products`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryParams = prepareQueryParams(query);

  useEffect(() => {
    if (categoryId) {
      const finalQuery = { ...queryParams };
      delete finalQuery.categoryId;

      setLoading(true);
      axiosClient
        .get(url, {
          params: withTempParams(queryParams),
        })
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        });
    }
  }, []);

  const handleCategoryChange = (categoryId) => {
    setLoading(true);
    axiosClient
      .get(`/store/catalogs/${categoryId}/union-products`, {
        params: withTempParams(withClearPagination(query)),
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        router.push({ pathname: `/catalogs/${categoryId}` });
      });
  };

  const handleClearParams = (categoryId) => {
    setLoading(true);
    axiosClient
      .get(`/store/catalogs/${categoryId}/union-products`, {
        params: withTempParams({}),
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        router.push({ pathname: `/catalogs/${categoryId}` });
      });
  };

  const handleFilterChange = (name, value) => {
    let finalQuery = { ...queryParams };
    if (value) {
      finalQuery = {
        ...finalQuery,
        [name]: value,
      };
    } else {
      delete finalQuery[name];
    }

    delete finalQuery.categoryId;

    if (name !== 'page') {
      finalQuery = withClearPagination(finalQuery);
    }

    setLoading(true);
    axiosClient
      .get(url, {
        params: withTempParams(finalQuery),
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        router.push({ pathname: `/catalogs/${categoryId}`, query: finalQuery });
      });
  };

  const handleFilterRemove = (name) => {
    const finalQuery = { ...queryParams };
    delete finalQuery[name];
    delete finalQuery.categoryId;

    setLoading(true);
    axiosClient
      .get(url, {
        params: withTempParams(finalQuery),
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        router.push({ pathname: `/catalogs/${categoryId}`, query: finalQuery });
      });
  };

  return {
    products: data?.data || [],
    loading,
    meta: data?.meta || undefined,
    queryParams,
    onFilterChange: handleFilterChange,
    onCategoryChange: handleCategoryChange,
    onFilterRemove: handleFilterRemove,
    onClearParams: handleClearParams,
  };
};

type Seller = {
  id: number;
  inn: string;
  kpp: string;
  name: string;
  ogrn: string;
};

export const useSellers = ({ productIds, pushUrl }: { productIds?: number[] | null; pushUrl?: string }) => {
  const router = useRouter();
  const query: any = router.query;
  const { companyId } = useSession();
  const url = `/sales/${companyId}/cart/find-same-seller`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryParams = prepareSellersQueryParams(query);

  const fastRequest = useCallback((productIds?: number[] | null) => {
    if (productIds && productIds.length) {
      const finalQuery = { ...queryParams };
      delete finalQuery.slug;

      setLoading(true);
      axiosClient
        .get(
          `${url}?${productIds.reduce(
            (params, id, idx) =>
              idx + 1 < productIds.length
                ? (params += `union_product_ids[]=${id}&`)
                : (params += `union_product_ids[]=${id}`),
            '',
          )}`,
          {
            params: queryParams,
          },
        )
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        });
    }
  }, []);

  const request = useCallback(_.debounce(fastRequest, 2000), []);

  useEffect(() => {
    request(productIds);
  }, [request, productIds]);

  const handleFilterChange = (productIds: number) => (name: string, value: number | string | number[]) => {
    let finalQuery = { ...queryParams };

    if (value) {
      finalQuery = {
        ...finalQuery,
        [name]:
          (name === 'is_prepayment' || name === 'is_postpayment' || name === 'company_type') && Array.isArray(value)
            ? value[0]
            : value,
      };
    } else {
      delete finalQuery[name];
    }

    delete finalQuery.slug;

    if (name !== 'page') {
      finalQuery = withClearPagination(finalQuery);
    }

    setLoading(true);
    if (!productIds) {
      return;
    }
    axiosClient
      .get(
        `${url}?${productIds.reduce(
          (params, id, idx) =>
            idx + 1 < productIds.length
              ? (params += `union_product_ids[]=${id}&`)
              : (params += `union_product_ids[]=${id}`),
          '',
        )}`,
        {
          params: withTempParams(finalQuery),
        },
      )
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        router.push({ pathname: pushUrl, query: finalQuery });
      });
  };

  return {
    sellers: (data?.data || []) as Seller[],
    loading,
    meta: data?.meta || undefined,
    queryParams: queryParams,
    onFilterChange: handleFilterChange,
    request,
    fastRequest,
  };
};

// Хук для работы с корзиной

export type CartType = {
  id: number;
  countSellers: number;
  quantity: number;
  product: {
    countSeller: number;
    id: number;
    maxPriceForOneProduct: string;
    minOrder: number;
    minPriceForOneProduct: string;
    name: string;
    photos: Array<{
      extension: string;
      fileName: string;
      name: string;
      order: number;
      originalUrl: string;
      previewUrl: string;
      size: number;
      uuid: string;
    }>;
  };

  // Custom field
  checked?: boolean;
};

export const useCart = (id?: string) => {
  const { companyId, me } = useSession();
  const [checkeds, setCheckeds] = useState<number[]>([]);
  const [deleted, setDeleted] = useState<number[]>([]);
  const [{ data, loading, error }, refetch] = useAxios(`/sales/${companyId}/cart`);
  const [quantities, setQuantity] = useState<Array<{ id: CartType['id']; quantity: number }>>([]);
  const carts: CartType[] = (data?.data || [])
    .map((cart: CartType) => {
      const quantityCart = quantities.find((item) => item.id === cart.id);
      if (quantityCart) {
        return { ...cart, quantity: quantityCart.quantity };
      }
      return cart;
    })
    .filter((cart: CartType) => !deleted.includes(cart.product.id));
  const checkedsCarts = `checkedsCartsJson__${id || 'products'}`;

  useEffect(() => {
    const checkedsCartsJson = localStorage.getItem(checkedsCarts);

    if (checkedsCartsJson) {
      const checkedsCarts = JSON.parse(checkedsCartsJson);
      setCheckeds(Array.isArray(checkedsCarts) ? checkedsCarts : []);
    }
  }, []);

  const handleUpdateQuantity = useCallback(
    _.debounce((union_product_id: number, quantity: number) => {
      axiosClient.post(`/sales/${companyId}/cart/${union_product_id}`, { quantity }).then(() => {
        const idx = quantities.findIndex((item) => carts.some((cart) => cart.product.id === item.id));
        if (idx !== -1) {
          setQuantity([...quantities.slice(0, idx), { id: union_product_id, quantity }, ...quantities.slice(idx + 1)]);
        } else {
          setQuantity([...quantities, { id: union_product_id, quantity }]);
        }
      });
    }, 1000),
    [companyId],
  );

  const handleRefetch = useCallback(() => {
    refetch();
    setQuantity([]);
  }, [refetch]);

  const deleteProducts = useCallback(
    ({ all, union_product_ids }: { all?: number; union_product_ids?: number[] }) => {
      axiosClient
        .delete(`/sales/${companyId}/cart`, {
          params: {
            union_product_id: union_product_ids,
            all,
          },
        })
        .then(() => {
          if (all) {
            handleRefetch();
          } else {
            setDeleted(union_product_ids);
          }
        });
    },
    [companyId],
  );

  const handleChecked = useCallback(
    (id: number) => {
      let newCheckeds = [];
      if (checkeds.some((ids) => ids === id)) {
        newCheckeds = checkeds.filter((ids) => ids !== id);
      } else {
        newCheckeds = [...checkeds, id];
      }
      setCheckeds(newCheckeds);
      localStorage.setItem(checkedsCarts, JSON.stringify(newCheckeds));
    },
    [setCheckeds, checkeds],
  );

  const handleChooseAll = useCallback(() => {
    if (checkeds.length !== carts.length) {
      const newCheckeds = carts.map((cart) => cart.id);
      setCheckeds(newCheckeds);
      localStorage.setItem(checkedsCarts, JSON.stringify(newCheckeds));
    } else {
      setCheckeds([]);
      localStorage.setItem(checkedsCarts, JSON.stringify([]));
    }
  }, [setCheckeds, checkeds]);

  const filterCheckedData = useMemo(() => {
    // return carts.map((cart) => (checkeds.some((ids) => ids === cart.id) ? { ...cart, checked: true } : cart));
    const dataColumns = carts.reduce(
      (obj: { checkeds: CartType[]; notCheckeds: CartType[] }, item) => {
        if (checkeds.some((ids) => ids === item.id)) {
          return {
            checkeds: [...obj.checkeds, { ...item, checked: true }],
            notCheckeds: [...obj.notCheckeds],
          };
        }

        return {
          checkeds: [...obj.checkeds],
          notCheckeds: [...obj.notCheckeds, item],
        };
      },
      { checkeds: [], notCheckeds: [] },
    ) as unknown as { checkeds: CartType[]; notCheckeds: CartType[] };

    return [...dataColumns.checkeds, ...dataColumns.notCheckeds];
  }, [carts, checkeds]);

  const isCheckedCart = useCallback(
    (idCart: CartType['id']) => {
      return checkeds.some((ids) => ids === idCart);
    },
    [carts, checkeds],
  );

  const handleGenerateOrder = useCallback(
    (ids: number[], seller_ids: number[]) => {
      const params: {
        comment: string;
        products: Array<{ product_id: number; quantity: number }>;
        buyer_id: number;
        seller_ids: number[];
      } = {
        comment: 'Комментария к заказу',
        products: [],
        buyer_id: me.id,
        seller_ids,
      };
      ids.forEach((id: number) => {
        params.products.push({
          product_id: id,
          quantity: carts.find((item) => item.product.id === id)?.quantity || 1,
        });
      });
      axiosClient
        .post('/orders', params)
        .then(() => toast.success('Запросы успешно отправлены поставщикам.'))
        .catch(() => toast.error('Не удалось отправить'));
    },
    [carts],
  );

  return {
    carts,
    loading,
    error,
    fetchCarts: handleRefetch,
    filteredCartsByChecked: filterCheckedData,
    updateQuantityByProductId: handleUpdateQuantity,
    deleteProducts,
    checkedsCartsIds: checkeds,
    toggleCheckCartById: handleChecked,
    toggleCheckAllCarts: handleChooseAll,
    checkIsCheckedCart: isCheckedCart,
    isCheckedAll: checkeds.length === carts.length,
    generateOrdersByIds: handleGenerateOrder,
  };
};

// useProductInteractions

type UpdatedProduct = {
  product_id: number;
  quantity: number;
  price: number;
};

type AddedProduct = {
  product_id: number;
  quantity: number;
  price: number;
  prepayment_amount: number;
};

export type ProductsFilterParams = {
  'from_date'?: string;
  'to_date'?: string;
  'perPage'?: number;
  'contractor'?: string;
  'status'?: string;
  'order_type'?: 1 | 2;
  'order_amount_from'?: number;
  'order_amount_то'?: number;
  'sort[key][]'?: string;
  'sort[value][]'?: string | number;
};

export type ProductUpdateParams = {
  orderId: string;
  status?: string;
  prepayment_amount?: number;
  updated_products?: UpdatedProduct[];
  added_products?: AddedProduct[];
  deleted_products?: number[];
};

export const useProductInteractions = () => {
  const router = useRouter();
  const query: any = router.query;
  const { companyId } = useSession();
  const queryParams = prepareSellersQueryParams(query);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductOrderType[]>([]);
  const [productsToAdd, setProductsToAdd] = useState<Array<any>>([]);
  const [loadingProductsToAdd, setLoadingProductsToAdd] = useState(false);
  const [productsMeta, setProductsMeta] = useState<{ currentPage: number; lastPage: number; perPage: number } | null>(
    null,
  );
  const [product, setProduct] = useState<ProductOrderType | null>(null);

  const fetchProductById = useCallback((orderId: number | string) => {
    setLoading(true);
    axiosClient
      .get(`/orders/${orderId}`, { params: { companyId } })
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchProducts = useCallback((params?: ProductsFilterParams): void => {
    setLoading(true);

    axiosClient
      .get('/orders', { params: params || queryParams })
      .then((res) => {
        setProducts(res.data?.data);
        setProductsMeta(res.data?.meta);
        router.push({ pathname: router.pathname, query: params });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchProductsToAdd = useCallback((): void => {
    setLoadingProductsToAdd(true);
    axiosClient
      .get(`/store/companies/${companyId}/products`)
      .then((res) => {
        setProductsToAdd(res.data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingProductsToAdd(false));
  }, []);

  const fetchUpdateProduct = useCallback(
    _.debounce((params: ProductUpdateParams, callback?: (status?: boolean) => void) => {
      setLoading(true);
      return axiosClient
        .put(`/orders/${params.orderId}`, { ...params, companyId })
        .then(() => callback && callback(true))
        .catch((err) => callback && callback(false))
        .finally(() => setLoading(false));
    }, 2000),
    [],
  );

  return [
    { loading, products, product, loadingProductsToAdd, productsToAdd, productsMeta, queryParams },
    { fetchUpdateProduct, fetchProducts, fetchProductById, fetchProductsToAdd },
  ];
};
