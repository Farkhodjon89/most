import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import cx from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoBgGrey, monoBgGreyLight, monoBlack, monoDarkBlack, monoWhite } from '../styles/colorPalette';
import { Button } from './Button';
import Pagination from './Pagination';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
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
    '& .MuiTableBody-root': {
      borderRadius: '16px',
      backgroundColor: monoWhite,
    },
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
      backgroundColor: monoBgGreyLight,
    },
    '& .MuiTableRow-root': {
      'borderBottom': `1px solid ${monoBgGrey}`,
      '&:hover': {
        backgroundColor: monoBgGreyLight,
      },
    },
  },
  paper: {
    boxShadow: 'none',
    backgroundColor: monoBgGrey,
    borderRadius: '16px',
    cursor: 'pointer',
  },
  messageCircle: {
    fontSize: theme.typography.pxToRem(18),
    color: mainBlue900,
  },
}));

const StyledName = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-line',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
  overflow: 'hidden',
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  fontSize: theme.typography.pxToRem(12),
  lineHeight: '14px',
  color: monoDarkBlack,
  cursor: 'pointer',
}));

const StyledPrice = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 700,
  lineHeight: '14px',
  color: monoDarkBlack,
  cursor: 'pointer',
}));

const CheckoutTable = ({ product }: any) => {
  const { classes } = useStyles();
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  return (
    <Paper className={classes.paper}>
      <TableContainer
        sx={{
          border: '2px solid #F5F5F6',
          borderRadius: '16px',
          width: '100%',
          marginTop: '16px',
          overflowX: 'hidden',
        }}
      >
        <Table className={classes.customTable} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Артикул</TableCell>
              <TableCell>ИНН</TableCell>
              <TableCell>Цена за ед.(₽)</TableCell>
              <TableCell>Мин. заказ (шт)</TableCell>
              <TableCell>Срок отгрузки</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ minWidth: 230 }}>
                  <StyledName>
                    <FormControlLabel control={<Checkbox />} label={row.name} />
                  </StyledName>
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>{row.sku}</TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  <StyledPrice>{row.price}</StyledPrice>
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>{row.delivery}</TableCell>
                <TableCell sx={{ minWidth: 100 }}>{row.status}</TableCell>
                <TableCell sx={{ minWidth: 100 }}>5</TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  <Link href={`/products/${product?.id}/provider/${row.id}`}>
                    <a>
                      <Button variant={'outlined'} small>
                        Уточнить условия
                      </Button>
                    </a>
                  </Link>
                  <IconButton>
                    <i className={cx('ui_message-circle', classes.messageCircle)}></i>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<Box className={classes.root} mt={4} mb={4}>*/}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          backgroundColor={monoBgGrey}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          rows={tableData.length}
        />
        {/*    <Typography className={classes.showMore}>Показать ещё 15</Typography>*/}
      </Box>
      {/*</Box>*/}
    </Paper>
  );
};

export default CheckoutTable;

const tableData = [
  {
    id: 1,
    sku: 'NP-00X',
    name: `ООО Электроторг”`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 2,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 3,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 4,
    sku: 'NP-00X',
    name: `ООО Электроторг”`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 5,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 6,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 7,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 8,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 9,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 10,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Предоплата',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 11,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 12,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 13,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 14,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Ошибка',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 15,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 16,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Черновик',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 17,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В архиве',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 18,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 19,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 20,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 21,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 22,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 23,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 24,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Ошибка',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 25,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 26,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Черновик',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 27,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В архиве',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 28,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 29,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 30,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 31,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 32,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 33,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 34,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Ошибка',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 35,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 36,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Черновик',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 37,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В архиве',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 38,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 39,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 40,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 41,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 42,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 43,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 44,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Ошибка',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 45,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 46,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Черновик',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 47,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'В архиве',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 48,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'Готов к продаже',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 49,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
  {
    id: 50,
    sku: 'NP-00X',
    name: `ООО Электроторг`,
    description: 'Чай вкусный очень сильно Чай вкусный очень сильно',
    status: 'На проверке',
    delivery: '10-14 дней',
    measurement: 'Кор.',
    price: '41500 - 46500',
  },
];
