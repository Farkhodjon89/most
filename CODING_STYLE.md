
# Описание и рекомендации для проекта MOST

- [Общее представление о проекте](#общее-представление-о-проекте)
    - [Файловая структура](#файловая-структура)
    - [React компоненты](#react-компоненты)
    - [Требования к компоненту](#требования-к-компоненту)
    - [Импорты (import)](#импорты-import)
    - [Доступ к DOM](#доступ-к-dom)
- [Стиль и качество кода](#стиль-и-качество-кода)
    - [Соглашение об именовании](#соглашение-об-именовании)
    - [Общие рекомендации по оформлению кода](#общие-рекомендации-по-оформлению-кода)

## Общее представление о проекте
Данный проект базируется на фреймворке Next.js, подробную документацию к которому можно найти на [официальном сайте](https://nextjs.org/). В качестве языка программирования используется Typescript. Typescript является надмножеством Javascript, более подробно о нем можно узнать на [официальном сайте](https://www.typescriptlang.org/), а в повседневной работе использовать [краткую документацию](https://react-typescript-cheatsheet.netlify.app/) для проектов на React. Для готовых UI компонентов используется библиотека [Material UI](https://mui.com/material-ui/getting-started/overview/).

### Файловая структура
* __components__ - директория для хранения переиспользуемых react компонентов;
* __constants__ - директория для хранения константных значений, используемых повсеместно;
* __containers__ - директория, содержащая отдельные страницы проекта:  auth, applicants, employers, и т.д;
* __context__ - директория с файлами [контекста приложения](https://reactjs.org/docs/context.html);
* __i18n__ - директория фреймворка [i18n](https://www.i18next.com/) для файлов интернационализации проекта;
* __pages__ - служебная директория Next.js, подробнее о которой можно прочитать в [документации](https://nextjs.org/docs/basic-features/pages);
* __styles__ - директория, содержащая стили используемые повсеместно, такие как цветовая палитра, переменные темы и т.д;
* __types__ - склад типов для типизации компонентов;
* __utils__ - директория для вспомогательных утилит: функции для форматирования данных, валидаторы, генераторы данных и т.д;

### React компоненты
Компонент представляет из себя файл, имя которой начинается с заглавной буквы в формате tsx. Также в этом файле может находиться функция [useStyles](https://mui.com/material-ui/guides/interoperability/#jss-tss) для стилизации данного компонента. Суб-компоненты, используемые только в данном компоненте, также располагаются в данной директории и могут содержать собственные суб-компоненты. Перед созданием нового переиспользуемого компонента необходимо убедиться, что такой компонент не реализован в [библиотеке MUI](https://mui.com/material-ui/getting-started/overview/).

#### Требования к компоненту

Каждый React-компонент удовлетворяет следующим требованиям:

-   является [функциональным компонентом](https://reactjs.org/docs/components-and-props.html#function-and-class-components);
-   определен в виде анонимной функции, которая присваивается переменной, имя которой совпадает с именем компонента;
-   данная переменная объявлена с использованием ключевого слова `const` и имеет тип `FC`;
-   если компонент принимает какие-либо пропсы (props), то необходимо определить их типы. Для этого перед объявлением переменной, содержащей компонент, необходимо создать тип с именем `Props` (либо в формате <ИмяКомпонента>Props в случаях, когда в файле несколько компонентов), который описывает типы пропсов, а затем уточнить [общий тип (generic type)](https://www.typescriptlang.org/docs/handbook/2/generics.htmll) `FC`:

```ts
import React, { FC } from 'react';

type Props = {
    count: number;
}

const Counter: FC<Props> = (props) => { ... }
```
-   в конце файла находится экспорт по умолчанию (default export) переменной, содержащей компонент:
```ts
export default Counter;
```
### Импорты (import)

Модули импортируются относительно директории _src_ (кроме тех, что являются локальными для данного компонента или установлены из [npmjs](https://www.npmjs.com/)). При импортировании модулей необходимо придерживаться порядка, который советует ESLint.
```ts
// ❌ Плохо:
import { SomeFunc } from '../../../../../../veryFarFolder/someFunc'
import { SomeFunc } from 'modules/employee/profile/settings/security/components/slider/someFunc'

// ✅ Хорошо:
import { SomeFunc } from 'utils/veryFarFolder/someFunc'
import { SomeFunc } from './someFunc'
import { SomeHelper } from '../someHelper'
```
🟠 Примечание: настройте IDE или текстовый редактор для автоматического импорта элементов согласно правилам.

### Доступ к DOM

Запрещается использовать выборку элементов из DOM с помощью таких методов как `getElementById` или `querySelector`. Взамен следует использовать [ссылки](https://reactjs.org/docs/refs-and-the-dom.html). Однако не стоит злоупотреблять ссылками, всегда необходимо стараться реализовать задуманное, используя декларативный подход. Исключением для выборки элементов из DOM могут стать библиотеки, не имеющие npmjs пакеты.

## Стиль и качество кода
При написании кода необходимо придерживаться в первую очередь единообразия стиля. Для того, чтобы получить общее представление о стиле, просмотрите текущую кодовую базу и прочтите разделы ниже.

### Соглашение об именовании

1.  Все имена должны являться осмысленными и состоять из символов латинского алфавита;
2.  Название файлов компонентов должен удовлетворять соглашению об именовании [PascalCase](https://techterms.com/definition/pascalcase);
    Пример: `LoginScreen.tsx`
3.  Имя типа должно удовлетворять следующим простым правилам:
    -   удовлетворяет соглашению об именовании PascalCase;
    -   не имеет какие-либо префиксы;
```ts
❌ Плохо:
type AppPropsTypes = {...}
type AppPropsT = {...}
type IAppProps = {...}

✅ Хорошо:
type AppProps = {...}
type ProfileDTO = {...}
type SomeFunctionParams = {...}
```
4. Имя поля, метода, функции, переменной должно удовлетворять соглашению об именовании [camelCase](https://techterms.com/definition/camelcase);
5. Имя директория должно удовлетворять соглашению об именовании camelCase;
   Примеры: `components/`,  `loginScreen/`

### Общие рекомендации по оформлению кода

1. Функции-обработчики пользовательского ввода должны иметь имена следующего формата: `handle<Имя элемента с заглавной буквы><Имя события с заглавной буквы>`. Обработчик формата handleSomething должен жить только в рамках компонента, в котором используется;
```ts
❌ Плохо:
const handleClick = (...) => {}
<SomeCoponent handleClick={handleClick}>

✅ Хорошо:
const handleClick = (...) => {}
<SomeCoponent onClick={handleClick} onChange={handleChange}>
```
2. При использовании `boolean` пропсов, нельзя использовать префикс `isSomething`, а просто `something`.
```jsx
❌ Плохо:
const isVisible = true
<SomeCoponent isVisible={isVisible}>

✅ Хорошо:
const isVisible = true
<SomeCoponent visible={isVisible} multiple={isMultiple}>
```
3. Не использовать вложенные тернарные операторы. Вместо них можно обойтись конструкцией `if-else`
```jsx
❌ Плохо:
const powerLevel = you === 'Darth Vader' ? age === 30 ? married ? '100lv' : '90lvl' : '88lvl' : '1lvl'

✅ Хорошо:
const powerLevel = you === 'Darth Vader' ? '80lvl' : '1lvl';

if (you === 'Darth Vader') {
	powerLevel = '80lvl';
} else {
	powerLevel = '1lvl';
}
```
4. Избавляться от использования px в шрифтах. Преимущественно использовать функцию theme.typography.pxToRem()
```ts
❌ Плохо:
fontSize: 20px

✅ Хорошо:
fontSize: theme.typography.pxToRem(18)
```
5. Если переменная имеет строковый тип, и варианты значении заранее известны, то необходимо вместо типа `string` использовать `enum`
```ts
❌ Плохо:
setRole('employee')

✅ Хорошо:
// types/User.ts
export enum RoleTypes {
  Employee = 'employee',
  Employer = 'employer',
  Education = 'education'
}

export enum MaleType {
  Male = 1,
  Female = 2
}
...
setRole(RoleTypes.Employee)
setMale(MaleType.Male)
```
6. Не импортировать функции, компоненты, типы из чужого модуля или компонента. Если есть необходимость, переместите его в "общую" (common) папку или файл
```ts
❌ Плохо:
// существует компонент
/modules/employee/profile/AwesomeComponent.tsx

// Импортируем его тут
/modules/education/profile/user.tsx

import AwesomeComponent from 'modules/employee/profile/AwesomeComponent'

✅ Хорошо:
// Создаем или помещаем его в modules/common/profile/AwesomeComponent
// Импортируем его тут
/modules/education/profile/user.tsx
import AwesomeComponent from 'modules/common/profile/AwesomeComponent'

// и тут 
/modules/employee/profile/user.tsx
import AwesomeComponent from 'modules/common/profile/AwesomeComponent'
```
7. Ограничиваться 2-3 пропсами для стилей, которые предлагает MUI для стилизации. Когда стилей становится больше, то лучше вынести их в отдельный класс
```jsx
❌ Плохо:
<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flexWrap="nowrap" />
<Typography sx={{pt: 5, pb: 5, mt: 5, mb:5, bgColor: '#fff'}>Я - Халк и я все крушить<Typography>

✅ Хорошо:
<Box display="flex" alignItems="center" />
<Typography sx={{pt: 5}}>Я - Человек Муравей. Хоть и неинтересный персонаж, но компактный и удобный<Typography>
```
8. Не использовать пропс style в React компонентах, если в этом нет необходимости. Взамен можно использовать classes, className, sx.
```jsx
❌ Плохо:
<Typography style={{ display: 'flex', fontSize: 18, color: '#000', marginTop: 20, }}>Ооочень длинный заголовок<Typography>

✅ Хорошо:
<Typography className={classes.heading}>Компактно и удобно<Typography>
```
9. Не употреблять 2 или более множественных чисел в одном названии переменной. Для начала необходимо определить что из контекста является во множественном числе
```ts
❌ Плохо:
//отсюда не понятно - ваканкий много или вариантов, много компаний или их названия, много городов или айдишников
vacanciesOptions, rolesTypes, companiesNames, citiesIds
onChangeVacanciesOptions

✅ Хорошо:
//как бонус, отсюда я могу быть уверен, что companyNames это массив строк, или cityIds - массив цифр
vacancyOptions, roleType, companyNames, cityIds
``` 
10. Если в компоненте больше 3-х пропсов, запрещается [деструктуризировать](https://learn.javascript.ru/destructuring-assignment) пропсы при объявлении самого компонента
```jsx
❌ Плохо:
const Person = ({gender, age, height, weight, religion, temperament, crazy, ...restProps}) => {...}

✅ Хорошо:
const Person = (props) => {
	const { gender, age, height, weight } = props;
	...
};
const Person = ({gender, age, ...rest}) 
```
11. Не использовать `@ts-ignore.` Исключением является случаи, когда блок кода блокирует процесс билда (build). В данном случае нужно оставить комментарии и указать причину использования `@ts-ignore`
12. Не использовать тип `any` Исключением является случаи, когда блок кода блокирует процесс билда (build). В данном случае нужно оставить комментарии и указать причину использования типа `any`
13. Если компонент принимает какие-либо пропсы, то тип этих пропсов должен стоять прямо перед этим компонентом. Такми образом, разработчику легче видеть какие пропсы принимает компонент, не переходя в другие файлы. А вот типы которые используются в пропсах данного компонента можно импортировать из других файлов
```ts
❌ Плохо:
import {MethamphetamineProps} from 'types/common'

// придется перейти 'types/common/index' чтобы знать какие пропсы у Methamphetamine, неудобно
const Methamphetamine: FC<MethamphetamineProps> = () => {...}

----------

type Methylamine = {
  one: number;
  two: string;
  three: boolean;
};

type Phosphorus = {
  one: number;
  two: string;
  three: boolean;
};

type MethamphetamineProps = {
  methylamine: Methylamine;
  phosphorus: Phosphorus;
  cookedByPinkman: boolean;
};

// перегруженный файл
const Methamphetamine: FC<MethamphetamineProps> = () => {...}

✅ Хорошо:
import {Methylamine, Phosphorus} from 'types/common';

type MethamphetamineProps = {
  methylamine: Methylamine;
  phosphorus: Phosphorus;
  cookedByPinkman: boolean;
};

const Methamphetamine: FC<MethamphetamineProps> = () => {...}
```
14. Всегда обрабатывать состояние `error` у axios запроса. Если есть ошибка, вывести компонент ошибки или вызвать toast c универсальной ошибкой
15. Всегда обрабатывать состояние `loading` у axios запроса. если `loading = true,` вывести Loader или Skeleton компонент
16. При вызове функции axios как Promise, обязательно обрабатывать состояние `then()` и `catch()`
17. Если prop у React компонента опционален, всегда предусматривайте значение по умолчанию
```ts
❌ Плохо:
type GreetProps = { helloText?: string };

const Greet: FC<GreetProps> = ({ helloText }) => {...}

✅ Хорошо:
type GreetProps = { helloText?: string };

const Greet: FC<GreetProps> = ({ helloText = 'Hi!' }) => {...}
```
18. Импортировать тяжелые библиотеки только с помощью [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy). Пример тяжелых библиотек: sortable.js, moment.js, chart.js
19. При передачи статичной строки как props, отправлять строку без фигурных скобок `{}`
```jsx
❌ Плохо:
<Greet helloText={"What's up?"}>

✅ Хорошо:
<Greet helloText="What's up?">
```