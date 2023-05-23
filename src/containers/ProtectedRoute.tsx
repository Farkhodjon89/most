import redirect from 'nextjs-redirect';
import { FC } from 'react';

import { OverlayLoader } from '../components/Loaders';
import { APP_ROUTES, AUTH_ROUTES, RouteTypes } from '../const/routes';
import { useSession } from '../context/UserContext';

// Надо тут протипизировать, пока не разбирался как это сделать
type ProtectedRouteProps = {
  router: any;
  pageProps: any;
  Component: any;
};

const RedirectEmployerProfile = redirect('/seller/profile');
const RedirectAuth = redirect('/auth/login');

const publicRoutes = APP_ROUTES.filter((item) => item.type == RouteTypes.PUBLIC).map((item) => item.path); //["/", "/team", "/auth"];

const ProtectedRoute: FC<ProtectedRouteProps> = ({ router, pageProps, Component }) => {
  const { me, refetch, enableRedirect } = useSession();

  const isProtectedRoutes = router.pathname.startsWith('/seller');
  const isEnabledRoutes = router.pathname.startsWith('/catalogs');

  const pathIsPrivate = publicRoutes.indexOf(router.pathname) === -1 && !isEnabledRoutes;

  // синхронизируем логин и логаут в табах браузера
  // useEffect(() => {
  //   window.addEventListener('storage', (event) => {
  //     if (event.key === 'mostLoginToken') {
  //       refetch();
  //     }
  //   });
  // }, []);
  // Если П незалогинен, роут приватный, а роут к которому обращались принадлежит работодателю - редиректим на страницу авторизации работодателя
  if (!me && enableRedirect && (pathIsPrivate || isProtectedRoutes)) {
    return (
      <RedirectAuth>
        <OverlayLoader />
      </RedirectAuth>
    );
  }
  // Если П залогинен и пытается попасть на страницы авторизации - редиректим на страницу профиля работодателя
  if (me && enableRedirect && AUTH_ROUTES.includes(router.pathname)) {
    return (
      <RedirectEmployerProfile>
        <OverlayLoader />
      </RedirectEmployerProfile>
    );
  }

  return <Component {...pageProps} />;
};

export default ProtectedRoute;
