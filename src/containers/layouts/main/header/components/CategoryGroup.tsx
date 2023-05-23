import { Grid, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoBlack } from '../../../../../styles/colorPalette';
import Popover from './Popover';

const useStyles = makeStyles()((theme) => ({
  subCategoryText: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoBlack,
    marginBottom: theme.spacing(1),
  },
  categoryText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoBlack,
    textTransform: 'capitalize',
    marginBottom: theme.spacing(1),
  },
  showAll: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '14px',
    color: mainBlue900,
    cursor: 'pointer',
  },
  arrowIcon: {
    marginLeft: '5px',
    fontSize: theme.typography.pxToRem(10),
  },
  active: {
    color: mainBlue900,
  },
}));

const CategoryGroup = ({ id, childs, name }: any) => {
  const { classes } = useStyles();
  const [isShown, setIsShown] = useState(false);
  const [openedPopover, setOpenedPopover] = useState(null);
  const popoverAnchor = useRef(null);

  const popoverEnter = (id) => {
    setOpenedPopover(id);
  };

  const popoverLeave = () => {
    setOpenedPopover(null);
  };

  return (
    <Grid item xs={3.5}>
      <Link href={`/catalogs/${id}`}>
        <a>
          <Typography variant={'h4'} className={classes.categoryText}>
            {name}
          </Typography>
        </a>
      </Link>
      {(isShown ? childs : childs.slice(0, 5)).map(({ id, name, childs }) => (
        <React.Fragment key={id}>
          <Link href={`/catalogs/${id}`}>
            <a>
              <Typography
                onMouseEnter={() => popoverEnter(id)}
                onMouseLeave={popoverLeave}
                ref={popoverAnchor}
                className={openedPopover === id ? cx(classes.subCategoryText, classes.active) : classes.subCategoryText}
              >
                <Stack display={'flex'} alignItems={'center'} direction={'row'}>
                  {name}
                  {openedPopover === id && <i className={cx('ui_right-arrow', classes.arrowIcon)}></i>}
                </Stack>
              </Typography>
            </a>
          </Link>
          {childs.length > 0 ? (
            <Popover
              popoverEnter={popoverEnter}
              popoverLeave={popoverLeave}
              id={id}
              popoverAnchor={popoverAnchor}
              openedPopover={openedPopover}
            >
              {childs.map(({ id, name }) => (
                <Link key={id} href={`/catalogs/${id}`}>
                  <a>
                    <Typography className={classes.subCategoryText}>{name}</Typography>
                  </a>
                </Link>
              ))}
            </Popover>
          ) : null}
        </React.Fragment>
      ))}
      {childs.length <= 5 ? null : (
        <Typography onClick={() => setIsShown((prev) => !prev)} className={classes.showAll}>
          {!isShown ? 'Показать все' : 'Свернуть'}
        </Typography>
      )}
    </Grid>
  );
};

export default CategoryGroup;
