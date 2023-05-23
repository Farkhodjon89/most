import { Pagination as DefaultPagination, PaginationItem } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoDarkGrey, monoGrey, monoLightGrey1, monoLightGrey2, monoWhite } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    borderRadius: '0 0 16px 16px',
    padding: theme.spacing(1, 1),
  },
}));

const usePaginationItemStyles = makeStyles()((theme) => ({
  root: {
    '&.Mui-selected': {
      backgroundColor: mainBlue900,
      color: monoWhite,
    },
    '&.MuiPaginationItem-text': { fontSize: 12, height: 20, width: 20, minWidth: 20 },
    '&.MuiPaginationItem-previousNext': {
      'height': 32,
      'width': 32,
      'minWidth': 32,
      'color': monoGrey,
      'border': '1px solid #E0E0E6',
      ' &:hover, &:focus': {
        borderColor: monoLightGrey1,
        color: monoDarkGrey,
        backgroundColor: 'transparent',
      },
      '&.Mui-disabled': {
        borderColor: monoLightGrey2,
        color: monoLightGrey2,
      },
    },
  },
}));

const Pagination = ({ backgroundColor, ...rest }: any) => {
  const { classes } = useStyles();
  const paginationItemClasses = usePaginationItemStyles();

  return (
    <DefaultPagination
      sx={{ backgroundColor: backgroundColor }}
      className={classes.root}
      renderItem={(item) => <PaginationItem {...item} classes={paginationItemClasses.classes} />}
      {...rest}
    />
  );
};

export default Pagination;
