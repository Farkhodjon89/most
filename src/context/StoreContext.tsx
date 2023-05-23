import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { createContext, FC, useContext, useEffect } from 'react';

import { OverlayLoader } from '../components/Loaders';

type StoreContext = {
  countries: any;
};

const StoreContext = createContext<StoreContext | null>(null);

export const useStore = () => useContext(StoreContext);

const StoreProvider: FC<any> = ({ children }) => {
  const router = useRouter();
  const [branchState, refetch] = useAxios('/store/catalogs');
  // const [categoryByIdState, getCategoryById] = useAxios({}, { manual: true });
  const [attributeState, getAttributes] = useAxios('/store/catalogs/attributes', { manual: true });
  const [unitsState, getUnits] = useAxios({}, { manual: true });
  const [dictionaryState, refetchDictionary] = useAxios('/store/dictionary');
  // useEffect(() => {
  //   if (router.query.branchId) {
  //     getCategoryById({
  //       url: `/store/catalogs/${router.query.branchId}`,
  //     });
  //   }
  // }, [router.query]);

  useEffect(() => {
    const categoryId = router.query.categoryId;
    if (categoryId) {
      handleSubCategoryOrGroupChange(categoryId);
    }
  }, [router.query]);

  const handleBranchSelect = (branchId: number) => {
    //
  };

  const handleSubCategoryOrGroupChange = (id) => {
    //подгружаем атрибуты по подКатегории или группы
    getAttributes({
      params: {
        ids: [id],
      },
    })
      .then()
      .catch();

    //подгружаем ед. измерения по подКатегории или группы
    getUnits({
      url: `/store/catalogs/${id}/units`,
    })
      .then()
      .catch();
  };

  if (branchState.loading || dictionaryState.loading) {
    return <OverlayLoader />;
  }

  return (
    <StoreContext.Provider
      value={{
        branches: branchState.data?.data || [],
        countries: dictionaryState.data?.data.countries || [],
        currencies: dictionaryState.data?.data.currencie || [],
        attributes: attributeState.data?.data || [],
        units: unitsState.data?.data || null,
        commonUnits: dictionaryState.data?.data.units,
        onBranchSelect: handleBranchSelect,
        onSubCategoryOrGroupChange: handleSubCategoryOrGroupChange,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
