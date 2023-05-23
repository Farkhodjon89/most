import { List, ListItemButton, ListItemText } from '@mui/material';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { black, mainBlue900 } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  link: {
    fontSize: `${theme.typography.pxToRem(12)}!important`,
    color: black,
  },
  activeLink: {
    color: mainBlue900,
    fontWeight: 700,
  },
}));

/**
 * @deprecated
 * @param name
 * @param childs
 * @param id
 * @param onCategoryChange
 * @constructor
 */
const Category = ({ name, childs, id, onCategoryChange }: any) => {
  const router: any = useRouter();
  const categoryId = parseInt(router.query.categoryId);

  const { classes } = useStyles();

  return (
    <>
      <ListItemButton onClick={() => onCategoryChange(id)}>
        <ListItemText
          className={cx(classes.link, id === categoryId && classes.activeLink)}
          primary={name}
          disableTypography
        />
      </ListItemButton>
      {/*Если есть активная категория или подкатегория, отображаем список*/}
      {(categoryId === id || childs.some((subCategory) => subCategory.id === categoryId)) && (
        <List component="div" disablePadding>
          {childs.map((subCategory) => (
            <React.Fragment key={subCategory.id}>
              <ListItemButton sx={{ pl: 4 }} onClick={() => onCategoryChange(subCategory.id)}>
                <ListItemText
                  className={cx(classes.link, subCategory.id === categoryId && classes.activeLink)}
                  disableTypography
                  primary={subCategory.name}
                />
              </ListItemButton>
              {/*<Collapse in timeout="auto" unmountOnExit>*/}
              {/*  <List component="div" disablePadding>*/}
              {/*    {category.childs.map((subCategories) => (*/}
              {/*      <React.Fragment key={subCategories.id}>*/}
              {/*        <ListItemButton sx={{ pl: 6 }} onClick={() => handleClick(subCategories.id)}>*/}
              {/*          <ListItemText*/}
              {/*            className={cx(classes.link, subCategories.id === categoryId && classes.activeLink)}*/}
              {/*            disableTypography*/}
              {/*            primary={subCategories.name}*/}
              {/*          />*/}
              {/*        </ListItemButton>*/}
              {/*      </React.Fragment>*/}
              {/*    ))}*/}
              {/*  </List>*/}
              {/*</Collapse>*/}
            </React.Fragment>
          ))}
        </List>
      )}
      {/*</Collapse>*/}
    </>
  );
};

export default Category;
