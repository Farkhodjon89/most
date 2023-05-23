import { Box, Grid, Typography } from '@mui/material';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoDarkBlack } from '../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    'display': 'flex',
    'alignItems': 'flex-start',
    'color': monoDarkBlack,
    'fontSize': 16,
    'fontWeight': 700,
    'lineHeight': '135%',
    '&:hover, &:focus ': {
      'background': 'transparent',
      'boxShadow': 'none',
      'color': mainBlue900,
      'cursor': 'pointer',
      '.css-zcdj21-titleNum': { color: mainBlue900 },
    },
    '&:hover , &:focus  ': {
      background: 'transparent',
      boxShadow: 'none',
      color: mainBlue900,
      cursor: 'pointer',
      titleNum: {
        color: mainBlue900,
      },
    },
    '&:hover i, &:focus i': {
      background: 'transparent',
      boxShadow: 'none',
      color: mainBlue900,
      cursor: 'pointer',
    },
    '&:hover div, &:focus div': {
      color: mainBlue900,
    },
  },
  titleNum: {
    color: monoDarkBlack,
    fontSize: 12,
    fontWeight: 600,
    marginLeft: '4px',
    lineHeight: '14px',
    paddingTop: 0,
  },
  mainTitle: {
    color: monoDarkBlack,
    fontSize: 26,
    fontWeight: 700,
    paddingLeft: '5px',
    lineHeight: '32px',
  },
  titleIcon: {
    color: monoDarkBlack,
    fontSize: 9,
    marginLeft: 3,
  },
  mainTitleIcon: {
    color: monoDarkBlack,
    fontSize: 12,
    marginLeft: 3,
    marginTop: 5,
  },
  wrapperTitle: {
    'display': 'flex',
    'alignItems': 'center',
    '&:hover h2, &:focus h2': {
      background: 'transparent',
      boxShadow: 'none',
      color: mainBlue900,
      cursor: 'pointer',
    },
    '&:hover i, &:focus i': {
      background: 'transparent',
      boxShadow: 'none',
      color: mainBlue900,
      cursor: 'pointer',
    },
  },
  linkItem: {
    'color': monoDarkBlack,
    'fontSize': 14,
    'fontWeight': 500,
    'display': 'block',
    'lineHeight': '20px',
    '&:hover, &:focus': {
      background: 'transparent',
      boxShadow: 'none',
      color: mainBlue900,
      cursor: 'pointer',
    },
  },
  img: {
    width: '100%',
    maxHeight: 420,
  },
  titleInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.4),
  },
  imgGrid: {
    width: 296,
  },
}));

const CategoryItem = ({ data }: any) => {
  const { classes } = useStyles();
  return (
    <Grid container rowSpacing={8}>
      {data?.map(({ levelLabel, name, id, childs, backgroundImage }: any) => (
        <Grid item xs={12} key={id}>
          <Grid container rowSpacing={1.5}>
            <Grid item>
              <Link href={`/catalogs/${id}`}>
                <a className={classes.wrapperTitle}>
                  <Typography className={classes.mainTitle} variant={'h2'}>
                    {name}
                  </Typography>
                  <i className={cx('ui_right-arrow', classes.mainTitleIcon)}></i>
                </a>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={6}>
                <Grid item className={classes.imgGrid}>
                  {backgroundImage ? (
                    <Box>
                      <img alt="Services Item Image" className={classes.img} src={backgroundImage.originalUrl} />
                    </Box>
                  ) : null}
                </Grid>
                <Grid item xs>
                  <Grid container columnSpacing={2} rowSpacing={4} pt={3.8}>
                    {childs.map(({ id, name, subtitle, subtitleNum, childs }: any) => (
                      <Grid item xs={3} key={id}>
                        <Grid container rowSpacing={1}>
                          <Grid item xs={12}>
                            <Link href={`/catalogs/${id}`}>
                              <a>
                                <Typography className={classes.title} variant={'h3'} component="span">
                                  {name} ({childs.length}) &#10095;
                                </Typography>
                              </a>
                            </Link>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container key={id} rowSpacing={0.2}>
                              {childs?.map(({ name, id }) => (
                                <Grid item xs={12}>
                                  <Link href={`/catalogs/${id}`}>
                                    <a className={classes.linkItem}>
                                      <Typography fontSize={14}>{name}</Typography>
                                    </a>
                                  </Link>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryItem;
