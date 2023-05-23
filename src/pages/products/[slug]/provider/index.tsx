import Breadcrumbs from '../../../../components/Breadcrumbs';
import MainLayout from '../../../../containers/layouts/main';
import ProviderPage from '../../../../containers/products/components/ProviderPage';

// eslint-disable-next-line react/function-component-definition
export default function Index() {
  const data = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Средства коммуникации',
      link: '/',
    },
  ];
  return (
    <MainLayout>
      <Breadcrumbs data={data} />
      <ProviderPage />
    </MainLayout>
  );
}
