import { Breadcrumbs as DefaultBreadcrumbs } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from 'tss-react/mui';

import { generateBreadcrumbs } from '../containers/products/lib/utils';
import { useStore } from '../context/StoreContext';
import { monoGrey } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: '20px',
    color: monoGrey,
    padding: '24px 0',
  },
}));

const Breadcrumbs = () => {
  const { classes } = useStyles();
  const { branches } = useStore();
  const { query } = useRouter();

  const categoryId = parseInt(query.categoryId);
  const breadcrumbs = generateBreadcrumbs(branches, categoryId);

  return (
    <DefaultBreadcrumbs className={classes.root}>
      {breadcrumbs.map(({ name, link }: any, i) => (
        <NextLink key={i} href={link}>
          <a>{name}</a>
        </NextLink>
      ))}
    </DefaultBreadcrumbs>
  );
};

export default Breadcrumbs;
