export const AUTH_ROUTES = [
  '/auth',
  '/auth/register',
  '/auth/register/check-email',
  '/auth/register/check-email-success',
  '/auth/login',
  '/auth/recovery',
  '/auth/recovery/check-email',
  '/auth/recovery/check-email-success',
];

export enum RouteTypes {
  PUBLIC = 0,
  PRIVATE = 1,
}

export const APP_ROUTES = [
  {
    path: '/',
    title: 'Главная',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/catalogs/[categoryId]',
    title: 'Каталог',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/products/[slug]',
    title: 'Объединенная карточка товара',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/register',
    title: 'Регистрация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/login',
    title: 'Авторизация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/register/check-email',
    title: 'Регистрация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/register/check-email-success',
    title: 'Регистрация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/recovery',
    title: 'Восстановление',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/recovery/check-email',
    title: 'Восстановление',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth/recovery/check-email-success',
    title: 'Восстановление',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/ui-kit',
    title: 'Восстановление',
    type: RouteTypes.PRIVATE,
  },
  {
    path: '/seller/profile',
    title: 'Профиль',
    type: RouteTypes.PRIVATE,
  },
  {
    path: '/auth/phone-verification',
    title: 'Двухфакторная аутентификация',
    type: RouteTypes.PRIVATE,
  },
];
