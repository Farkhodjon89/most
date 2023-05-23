import { useRouter } from 'next/router';

import Breadcrumbs from '../../../../components/Breadcrumbs';
import MainLayout from '../../../../containers/layouts/main';
import ProviderProductPage from '../../../../containers/products/components/ProviderProductPage';

const Provider = () => {
  const router = useRouter();
  const productId = Number(router.query.providerId);

  const data = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Средства коммуникации',
      link: '/',
    },
    {
      name: products[productId].name,
      link: '/',
    },
  ];
  return (
    <MainLayout>
      <Breadcrumbs data={data} />
      <ProviderProductPage product={products[productId]} />
    </MainLayout>
  );
};

export default Provider;
