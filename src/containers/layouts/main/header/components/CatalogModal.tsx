import { Box, Collapse, Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoBlack, monoLightGrey2, monoWhite } from '../../../../../styles/colorPalette';
import CategoryGroup from './CategoryGroup';

const useStyles = makeStyles()((theme) => ({
  content: {
    'position': 'absolute',
    'width': '100vw',
    'left': '50%',
    'right': '50%',
    'marginLeft': '-50vw',
    'marginRight': '-50vw',
    'background': 'monoWhite',
    'top': '68px',
    'height': '100vh',
    'zIndex': 1000,
    'boxShadow': '0px 16px 40px rgba(0, 0, 0, 0.08)',
    'backgroundColor': monoWhite,
    'borderTop': `1px solid ${monoLightGrey2}`,

    '&	.MuiListItemButton-root': {
      width: '100%',
      // height: '40px',
      borderRadius: '8px',
    },
    '& .MuiListItemText-root': {
      marginLeft: '12px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: '20px',
      color: monoBlack,
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoBlack,
  },
  leftSide: {
    'overflowY': 'auto',
    '&:before': {
      position: 'absolute',
      content: '""',
      top: 0,
      left: '21%',
      width: '1px',
      backgroundColor: monoLightGrey2,
      height: '100vh',
    },
  },
  inner: {
    width: '100%',
    padding: '0 64px',
    // height: '100%',
  },
  rightSide: {
    'position': 'absolute',
    'left': '20%',
    'top': '0',
    'overflowY': 'auto',
    'height': '650px',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: '#F5F5F7',
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: monoLightGrey2,
      borderRadius: 10,
    },
  },
  hidden: {
    display: 'none',
  },
}));

const CatalogModal = ({ categories, open }: any) => {
  const { classes } = useStyles();
  const [activeCategory, setActiveCategory] = useState(1);
  // console.log(categories);

  return (
    <>
      {open && (
        <Box className={classes.content}>
          <Box className={classes.inner}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List>
                {categories?.map(({ id, name, childs, icon }: any) => (
                  <Grid key={id} container spacing={2}>
                    <Grid className={classes.leftSide} item xs={2.5}>
                      <Link href={`/catalogs/${id}`}>
                        <a>
                          <ListItemButton onMouseEnter={() => setActiveCategory(id)}>
                            <Image src={icon?.originalUrl} width={20} height={20} alt={''} />
                            <ListItemText style={{ color: activeCategory === id && mainBlue900 }}>{name}</ListItemText>
                          </ListItemButton>
                        </a>
                      </Link>
                    </Grid>
                    <Grid ml={2} className={activeCategory === id ? classes.rightSide : classes.hidden} item xs={9}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant={'h4'} className={classes.title}>
                            {activeCategory === id ? name : ''}
                          </Typography>
                        </Grid>
                        {childs.map(({ id, name, childs }: any) => (
                          <CategoryGroup id={id} name={name} childs={childs} key={id} />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </List>
            </Collapse>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CatalogModal;
