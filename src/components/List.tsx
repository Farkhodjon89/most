import { List as DefaultList, ListItem, ListItemButton, ListItemText, ListProps } from '@mui/material';
import { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue400,
  mainBlue500,
  monoDarkGrey,
  monoGrey,
  monoLightGrey1,
  monoLightGrey2,
} from '../styles/colorPalette';

const useStyles = makeStyles()(() => ({
  root: {
    'height': 200,
    'overflow': 'auto',
    'width': '100%',
    '&::-webkit-scrollbar': {
      width: 10,
      height: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      border: '3.5px solid rgba(0, 0, 0, 0)',
      backgroundClip: 'padding-box',
      borderRadius: 10,
      backgroundColor: monoLightGrey1,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 10,
      marginTop: 7,
      marginBottom: 7,
      background: 'transparent',
    },
  },
}));

const useListItemButtonStyles = makeStyles()((theme) => ({
  root: {
    'borderRadius': theme.spacing(1),
    '&:hover': {
      backgroundColor: `${mainBlue400} !important`,
    },
    '&.Mui-selected': {
      backgroundColor: `${mainBlue500} !important`,
    },
    '.MuiTypography-root': {
      fontSize: theme.typography.pxToRem(14),
    },
    '&.Mui-disabled': {
      cursor: 'default',
      backgroundColor: `${monoLightGrey2} !important`,
      color: monoDarkGrey,
      opacity: '1 !important',
    },
  },
  selected: {},
}));

const List: FC<
  ListProps & {
    options: { value: any; label: string }[];
    selectedValue: any;
    onChange?: (value: any) => void;
    emptyListMessage?: string;
    group?: boolean;
    selectedCategory?: any;
  }
> = (props) => {
  const {
    options = [],
    selectedValue = null,
    onChange,
    emptyListMessage = 'Пусто',
    group = false,
    selectedCategory = [],
    ...other
  } = props;
  const { classes } = useStyles();
  const buttonStyles = useListItemButtonStyles();

  // Нельзя давать юзеру 2 раза выбирать полностью одинаковую конечную иерархию. Функцияя проверяет была ли ранее выбрана группа и если да, то дизейблить возвожность выбрать ее еще раз
  const hasThisCategory = (i) => {
    let disable = false;
    selectedCategory.map((item) => {
      if (item.groupId === i && i !== selectedValue) {
        disable = true;
      }
    });
    return disable;
  };

  return (
    <DefaultList classes={classes} {...other}>
      {options.length === 0 && <ListItem sx={{ color: monoGrey, fontSize: 14 }}>{emptyListMessage}</ListItem>}

      {options.map((item, key) => {
        const disabled = group && hasThisCategory(item.value);
        return (
          <ListItem
            key={key}
            onClick={disabled ? null : () => onChange(item.value)}
            sx={{ paddingTop: 0, paddingBottom: 0.5, paddingLeft: 1, paddingRight: 1 }}
            disabled={group && hasThisCategory(item.value)}
          >
            <ListItemButton classes={buttonStyles.classes} selected={item.value === selectedValue} disabled={disabled}>
              <ListItemText sx={{ margin: 0, fontSize: 14, wordWrap: 'break-word' }}>{item.label}</ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </DefaultList>
  );
};

export default List;
