export const YupMessages = {
  MIN_STRING: 'Количество не должно быть меньше ${min} символов',
  MAX_STRING: 'Количество не должно превышать ${max} символов',
  EMAIL: 'Некорректный адрес электронной почты',
  REQUIRED: 'Поле обязательно для заполнения',
  VALID_TIME: 'Введите правильное время',
  VALID_URL: 'Введите правильный URL',
  SLOT_INTERVAL: 'Укажите 15-минутный интервал',
  INTEGER: 'Укажите целое число',
  FLOAT: 'Укажите число с плавающей точкой до сотых значений',
  LIST: 'Укажите один вариант',
  LIST_MIN_ONE_OPTION: 'Укажите минимум один вариант',
  MIN_INTEGER: 'Значение должно быть больше ${min}',
  MAX_INTEGER: 'Значение должно быть меньше ${max}',
  MIN_WORK_HOURS: 'Не менее одного часа',
  MAX_WORK_HOURS: 'Не более 12 часов',
  MIN_ONE_PERCENT: 'Не менее одного процента',
  MAX_HUNDRED_PERCENT: 'Не более 100 процентов',
  INVALID_PHONE_NUMBER: 'Неверный номер телефона',
  INN_STRING: 'ИНН должен содержать ${min} цифр',
  MAX_INN_STRING: 'ИНН должен содержать ${max} цифр',
  KPP_STRING: 'КПП должен содержать 9 цифр',
  OGRN_STRING: 'ОГРН должен содержать 13 цифр',
  YEAR_STRING: 'Укажите верный формат (например: 2009)',
  CYRILLIC_ONLY: 'Поле должно содержать кириллицу',
  FUTURE_YEAR: 'Не более текущего года',
  ONLY_NUM: 'Поле может содержать только цифры',
};

export const CODE_TIME_LIMIT = 90;

export const DOCUMENT_LIST = [
  {
    type: 'company_charter',
    title: 'Устав',
    required: true,
  },
  {
    type: 'founders_agreement',
    title: 'Учредительный договор',
    required: true,
  },
  {
    type: 'decision_on_establishment',
    title: 'Решение об учреждении компании',
    required: true,
  },
  {
    type: 'certificate_of_registration',
    title: 'Свидетельство о государственной регистрации',
    required: true,
  },
  {
    type: 'election_decision',
    title: 'Протокол, решение об избрании или иной документ, подтверждающий полномочия руководителя',
    required: true,
  },
  {
    type: 'authority',
    title: 'Свидетельство о постановке юридического лица на налоговый учёт',
    required: true,
  },
  {
    type: 'egrul_extract',
    title: 'Выписка из ЕГРЮЛ, действительная на момент подачи заявки',
    required: true,
  },
  {
    type: 'passport_page_1',
    title: 'Паспорт руководителя разворот страница №1',
    required: true,
  },
  {
    type: 'passport_page_2',
    title: 'Паспорт руководителя разворот страница №2',
    required: true,
  },
];

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const URL_REGEX =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Zа-яА-Я0-9_-]+(\.[a-zA-Zа-яА-Я]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Zя-яА-Я0-9_]+=\w+(&[a-zA-Zя-яА-Я0-9_]+=\w+)*)?$/gm;

export const SERVER_KEYS: { [key: string]: string } = {
  'auth::app.service.errors.login-attempt': 'Некорректный логин или пароль',
  'profile::app.incorrect-password': 'Некорректный текущий пароль',
  'profile::app.email-already-taken': 'Такой email уже используется в другом аккаунте',
  'profile::app.same-email': 'Введите email отличный от текущего',
  'validation.unique': 'Такой номер уже используется',
};

export const SHIPMENT_TIME = [
  { value: 1, label: 'День' },
  // { value: 168, label: 'Неделя' },
  // { value: 744, label: 'Месяц' },
];

export enum ProductStatus {
  Draft = 1,
  InModeration = 2,
  Refused = 3,
  ReadyForSale = 4,
  OnSale = 5,
  Archive = 6,
}

export const ProductStatuses: any = {
  [ProductStatus.Draft]: 'Черновик',
  [ProductStatus.InModeration]: 'На проверке',
  [ProductStatus.Refused]: 'Ошибка заполнения',
  [ProductStatus.ReadyForSale]: 'Готов к продаже',
  [ProductStatus.OnSale]: 'В продаже',
};

export enum AttributeType {
  STRING = 1,
  INTEGER = 2,
  FLOAT = 3,
  LIST = 4,
  LIST_MULTIPLE = 5,
  BOOLEAN = 6,
}

export const companyTypes = [
  { value: 'company', label: 'Юридическое лицо' },
  { value: 'individual', label: 'Индивидуальный предприниматель' },
];
