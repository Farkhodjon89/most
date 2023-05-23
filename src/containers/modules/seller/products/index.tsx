import { Stack } from '@mui/system';
import useAxios from 'axios-hooks';
import { useSession } from 'context/UserContext';
import { useState } from 'react';

import SellerLayout from '../../../layouts/seller';
import ProductsHeader from './components/ProductsHeader';
import ProductTable from './components/ProductTable';
// import TabPage from './components/TabPage';

const Products = () => {
  const [value, setValue] = useState(0);
  const { companyId } = useSession();

  const [{ data, loading, error }] = useAxios(`/companies/${companyId}/products?page_size=20`);
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <SellerLayout>
      <Stack spacing={2}>
        <ProductsHeader />
        <ProductTable />
      </Stack>
    </SellerLayout>
  );
};

export default Products;
