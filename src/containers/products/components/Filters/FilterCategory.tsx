import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { useStore } from '../../../../context/StoreContext';
import { black, mainBlue900 } from '../../../../styles/colorPalette';
import { getCategoryByIdV3 } from '../../../modules/seller/products/lib/utils';

const useStyles = makeStyles()((theme) => ({
  root: {
    'width': '100%',
    // 'backgroundColor': monoBgGrey,
    'borderRadius': '16px',
    'padding': '0',

    '&	.MuiListItemButton-root': {
      paddingTop: 'unset',
      paddingBottom: 'unset',
    },
    '& .MuiListItemText-root': {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '14px',
      color: black,
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '20px',
    color: black,
    marginBottom: '16px',
  },
  link: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 400,
    lineHeight: '14px',
    color: black,
  },
}));

const FilterCategory = ({ categories, categoryTitle, onCategoryChange }: any) => {
  const { branches } = useStore();
  const { classes } = useStyles();
  const router: any = useRouter();
  const categoryId = parseInt(router.query.categoryId);
  // const [activeBranchId, setActiveBranchId] = useState(0);
  const activeCategory = getCategoryByIdV3(branches, categoryId);
  const nearestParent = activeCategory.parents.at(-1);

  // useEffect(() => {
  //   branches.forEach((branch) => {
  //     if (
  //       branch.childs.some((category) => category.id === categoryId) ||
  //       branch.childs.some((category) => category.childs.some((subCategory) => subCategory.id === categoryId))
  //     ) {
  //       setActiveBranchId(branch.id);
  //     }
  //   });
  // }, []);

  const handleGoBack = () => {
    onCategoryChange(nearestParent.id);
  };

  let list = [];
  let backLabel = '';

  //Если активная категория отрасль, отображаем список категорий
  if (activeCategory.level === 1) {
    list = activeCategory.childs;
    backLabel = '';
  }
  //Если это категория, отображаем все подкатегории
  if (activeCategory.level === 2) {
    list = activeCategory.childs;
    backLabel = 'Все категории';
  }

  // отображаем только саму подкатегорию
  if (activeCategory.level === 3) {
    list = [];
    backLabel = 'Все подкатегории';
  }
  return (
    <Box className={classes.root}>
      {backLabel && (
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer', color: mainBlue900 }}
          mb={2}
          onClick={handleGoBack}
        >
          <i className="ui_left-arrow" style={{ fontSize: 10 }} /> {backLabel}
        </Typography>
      )}

      <Typography sx={{ fontSize: 14, fontWeight: 600, color: black }}>{activeCategory.name}</Typography>
      <List>
        {list.map((item, key) => {
          return (
            <ListItemButton key={key} onClick={() => onCategoryChange(item.id)}>
              <ListItemText disableTypography primary={item.name} />
            </ListItemButton>
          );
        })}
      </List>
      {/*<Typography className={classes.title} variant={'h4'}>*/}
      {/*  {categoryTitle}*/}
      {/*</Typography>*/}
      {/*<List>*/}
      {/*  {branches.map(({ name, childs, id }: any) => {*/}
      {/*    const isOpen = activeBranchId === id;*/}
      {/*    return (*/}
      {/*      <React.Fragment key={id}>*/}
      {/*        <Typography*/}
      {/*          sx={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }}*/}
      {/*          onClick={() => handleBranchClick(id)}*/}
      {/*        >*/}
      {/*          {name}*/}
      {/*        </Typography>*/}
      {/*        <Collapse in={isOpen} timeout="auto" unmountOnExit>*/}
      {/*          {childs.map(({ name, childs, id }) => (*/}
      {/*            <Category key={id} id={id} name={name} childs={childs} onCategoryChange={onCategoryChange} />*/}
      {/*          ))}*/}
      {/*        </Collapse>*/}
      {/*      </React.Fragment>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</List>*/}
    </Box>
  );
};

export default FilterCategory;
