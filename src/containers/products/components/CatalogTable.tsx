import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { useSession } from '../../../context/UserContext';
import { mainBlue900, monoBgGrey, monoBgGreyLight, monoBlack, monoDarkBlack } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    'display': 'flex',
    'justifyContent': 'center',
    'cursor': 'pointer',
    '& .MuiTableRow-root': {
      '&:hover': {
        backgroundColor: monoBgGreyLight,
      },
    },
  },
  showMore: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
  },
  customTable: {
    '& 	.MuiTableCell-body': {
      padding: '5px 10px',
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '14px',
      color: monoBlack,
    },
    '& .MuiTableCell-head': {
      height: '50px',
      padding: '5px 10px',
      fontSize: theme.typography.pxToRem(10),
      fontWeight: 700,
      lineHeight: '16px',
      color: monoDarkBlack,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      // backgroundColor: monoBgGreyLight,
    },
    '& .MuiTableRow-root': {
      borderBottom: `1px solid ${monoBgGrey}`,
    },
  },
}));

const StyledName = styled(Typography)(({ theme }) => ({
  'whiteSpace': 'pre-line',
  'WebkitBoxOrient': 'vertical',
  'WebkitLineClamp': '1',
  'overflow': 'hidden',
  'display': '-webkit-box',
  'textOverflow': 'ellipsis',
  'fontSize': theme.typography.pxToRem(14),
  'lineHeight': '20px',
  'color': monoDarkBlack,
  'cursor': 'pointer',
  '&:hover': {
    color: mainBlue900,
  },
}));

const StyledPrice = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 700,
  lineHeight: '14px',
  color: monoDarkBlack,
  cursor: 'pointer',
}));

const CatalogTable = ({ products, loading }) => {
  const { classes } = useStyles();
  const { me, companyId } = useSession();
  const router = useRouter();

  const [, addToCart] = useAxios({ method: 'post' }, { manual: true });
  const handleAddToCart = (id) => {
    if (me) {
      addToCart({
        url: `/sales/${companyId}/cart/${id}`,
        data: { quantity: 1 },
      })
        .then(() => {
          toast.success('Товар успешно добавлен в список закупок');
        })
        .catch(() => {});
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          border: '2px solid #F5F5F6',
          borderRadius: '16px',
          width: '100%',
          marginTop: '16px',
          overflowX: 'hidden',
          cursor: 'pointer',
        }}
        className={classes.root}
      >
        <Table className={classes.customTable} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>
                {/*<Checkbox />*/}
                Название
              </TableCell>
              <TableCell>Ед. изм. </TableCell>
              <TableCell>Мин. заказ</TableCell>
              <TableCell>Доставка (дней)</TableCell>
              <TableCell>Цена (₽)</TableCell>
              <TableCell>кол-во продавцов</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box display={'flex'} alignItems={'center'} component={'span'}>
                    {/*<Checkbox />*/}
                    <StyledName> {product.name}</StyledName>
                  </Box>
                </TableCell>
                <TableCell sx={{ minWidth: 90 }}>{product.quantityUnit.name}</TableCell>
                <TableCell sx={{ minWidth: 120 }}>{product.minOrder}</TableCell>
                <TableCell sx={{ minWidth: 120 }}>{product.minShipmentTime}</TableCell>
                <TableCell sx={{ minWidth: 90 }}>
                  <StyledPrice>
                    {product.minPriceForOneProduct} - {product.maxPriceForOneProduct}
                  </StyledPrice>
                </TableCell>
                <TableCell sx={{ minWidth: 90 }}>{product.countSeller}</TableCell>
                <TableCell sx={{ minWidth: 110 }}>
                  <Button variant={'outlined'} small onClick={() => handleAddToCart(product.id)}>
                    Добавить в закупку
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<Pagination*/}
      {/*  backgroundColor={monoBgGrey}*/}
      {/*  page={page}*/}
      {/*  setPage={setPage}*/}
      {/*  rowsPerPage={rowsPerPage}*/}
      {/*  rows={tableData.length}*/}
      {/*/>*/}
    </>
  );
};

export default CatalogTable;
