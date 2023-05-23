import {
  Box,
  Checkbox,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import DotsButton from 'components/DotsButton';
import EmptyInfo from 'components/EmptyInfo';
import { Loader } from 'components/Loaders';
import Pagination from 'components/Pagination';
import { useSession } from 'context/UserContext';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import { getCatalogMainByParams } from 'utils/common';

import { Button } from '../../../../../components/Button';
import { ProductStatus, ProductStatuses } from '../../../../../const';
import {
  mainBlue600,
  mainBlue700,
  mainBlue900,
  mainRed900,
  monoBgGrey,
  monoBlack,
  monoDarkBlack,
  monoGrey,
  monoWhite,
} from '../../../../../styles/colorPalette';
import { productsColumns } from './columns';
import { combineFilters } from './helpers';
import StatusLabel from './StatusLabel';
import TableNavigation, { Filters } from './TableNavigation';

const useStyles = makeStyles()((theme) => ({
  paper: {
    padding: '16px',
    borderRadius: '24px',
    backgroundColor: monoWhite,
    // maxWidth: '1232px',
    // width: '100%',
  },
  customTable: {
    '& 	.MuiTableCell-body': {
      padding: '5px 15px',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '14px',
      color: monoBlack,
    },
    '& .MuiTableCell-head': {
      padding: '5px 15px',
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '14px',
      color: monoBlack,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
    '& .MuiTableRow-root': {
      borderBottom: '1px solid',
      borderColor: monoBgGrey,
    },
  },
  filterIcon: {
    fontSize: '18px',
    color: mainBlue900,
    marginRight: '8px',
  },
  fixColumn: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'red',
    height: '35px',
    marginTop: '-11px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  arrowButtons: {
    'position': 'absolute',
    'top': 22,
    'width': 24,
    'height': 24,
    'borderRadius': '50%',
    'backgroundColor': monoWhite,
    'outline': 'none',
    'zIndex': 5,
    'boxShadow': '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: monoWhite,
    },
  },
  arrowIcon: {
    color: mainBlue900,
    fontSize: theme.typography.pxToRem(12),
  },
  textTh: {
    'height': 42,
    'display': 'flex',
    'justifyContent': 'space-between',
    'flexDirection': 'row',
    'alignItems': 'center',
    'color': monoDarkBlack,
    'cursor': 'pointer',
    '&:hover, &:focus': {
      'color': monoGrey,
      '&  .ui_chevron-select': {
        color: mainBlue700,
      },
    },
    '&.active  .ui_chevron-select': {
      color: mainBlue900,
    },
  },
  thIcon: {
    color: monoGrey,
    marginLeft: '8px',
  },
  active: {
    color: `${mainBlue900} !important`,
  },
  dotsButnCell: {
    'backgroundColor': '#fff',
    'position': 'relative',
    'border': 'none',
    'padding': '13px 21px 7px 16px',

    'marginBottom': -1,
    '&:before': {
      content: '""',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '25%',
      backgroundColor: '#fff',
      boxShadow: '-15px 0px 16px 0px rgba(0, 0, 0, 0.04)',
    },
  },
}));

type TermSale = { id: number; name: string; type: number; value: number };

const ProductTable = () => {
  const { companyId } = useSession();
  const [{ data, loading, error }, requestProducts] = useAxios(`/companies/${companyId}/products`);
  const { classes } = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showColumns, setShowColumns] = useState<number[] | boolean>(true);
  const [sort, setSort] = useState<{ key: string; direction: 'desc' | 'asc' } | null>(null);
  const [filters, setFilters] = useState<Filters>({ page: 1 });
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [changeStatusState, changeStatus] = useAxios({ method: 'PUT' }, { manual: true });
  const [, archiveProduct] = useAxios({ method: 'PUT' }, { manual: true });
  const [, removeProduct] = useAxios({ method: 'DELETE' }, { manual: true });

  const handleSaveFilters = useCallback(
    (filters: Filters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  const handleClickArrow = (direction) => {
    if (direction === 'left') {
      ref.current.scrollBy({
        left: -177,
      });
    } else {
      ref.current.scrollBy({
        left: 177,
      });
    }
  };

  const handleChangeSortColumn = useCallback(
    (key: string) => {
      return (): void => {
        if (!sort || sort?.key !== key) {
          setSort({ key, direction: 'asc' });
          return;
        }

        setSort({ key, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
      };
    },
    [setSort, sort],
  );

  const handleUpdateShowColumns = useCallback((columns: boolean | number[]) => {
    setShowColumns(columns);
  }, []);

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('wheel', (event) => {
      event.preventDefault();
      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  }, []);

  const requestProductsWithFilters = useCallback(() => {
    let link = `/companies/${companyId}/products?page_size=${rowsPerPage}`;
    link += sort ? `&sort[field]=${sort?.key}&sort[direction]=${sort.direction}` : '';
    const filteredFilters = combineFilters(filters);

    requestProducts({
      url: link,
      params: filteredFilters,
    }).then(() => {
      router.push({ pathname: '/seller/products', query: filters });
    });
  }, [rowsPerPage, sort, filters]);

  useEffect(() => {
    requestProductsWithFilters();
  }, [requestProductsWithFilters]);

  const getTermsSaleByType = (termsSale: TermSale[], type: number, key: keyof TermSale): string | number => {
    const sale = termsSale.find((item) => item.type === type);

    if (!sale) return '';

    return sale[key];
  };

  const renderColumns = useCallback(() => {
    if (typeof showColumns === 'boolean') {
      return showColumns === false
        ? null
        : productsColumns.map((column) => (
            <TableCell key={column.id}>
              <Stack className={classes.textTh}>
                {column.label}{' '}
                <i
                  onClick={column.key ? handleChangeSortColumn(column.key) : undefined}
                  className={cx(
                    'ui_chevron-select',
                    classes.thIcon,
                    sort && sort?.key === column.key ? classes.active : '',
                  )}
                ></i>
              </Stack>
            </TableCell>
          ));
    }
    return productsColumns
      .filter((item) => showColumns.find((id) => id === item.id))
      .map((column) => (
        <TableCell key={column.id}>
          <Stack className={classes.textTh}>
            {column.label}{' '}
            <i
              onClick={column.key ? handleChangeSortColumn(column.key) : undefined}
              className={cx(
                'ui_chevron-select',
                classes.thIcon,
                sort && sort?.key === column.key ? classes.active : '',
              )}
            ></i>
          </Stack>
        </TableCell>
      ));
  }, [showColumns, sort]);

  const renderBodyColumn = useCallback(
    (id: number, content: React.ReactNode | string | number, minWidth: number) => {
      if (showColumns === true || (Array.isArray(showColumns) && showColumns.some((itemId) => itemId === id))) {
        return <TableCell sx={{ minWidth }}>{content}</TableCell>;
      }

      return null;
    },
    [showColumns],
  );

  const handleChangePerPage = (set) => {
    setRowsPerPage(set);
    setFilters({ page: 1 });
  };

  const ActionsCell = ({ row }) => {
    const handlePublish = () => {
      changeStatus({
        url: `/companies/${companyId}/products/${row.id}/status`,
        data: {
          status: ProductStatus.OnSale,
        },
      }).then(() => {
        toast.success('Товар успешно опубликован');
        requestProductsWithFilters();
      });
    };

    const handleStopSale = () => {
      changeStatus({
        url: `/companies/${companyId}/products/${row.id}/status`,
        data: {
          status: ProductStatus.ReadyForSale,
        },
      }).then(() => {
        toast.success('Продажа товара остановлена');
        requestProductsWithFilters();
      });
    };

    const handleRevokeModeration = () => {
      changeStatus({
        url: `/companies/${companyId}/products/${row.id}/status`,
        data: {
          status: ProductStatus.Draft,
        },
      }).then(() => {
        toast.success('Модерация товара успешно отозвана');
        requestProductsWithFilters();
      });
    };

    const handleUpdate = () => {
      router.push(`/seller/products/update/${row.id}`);
    };

    const handleArchive = () => {
      archiveProduct({
        url: `/companies/${companyId}/products/${row.id}/archive`,
      }).then(() => {
        toast.success('Товар отправлен в архив');
        requestProductsWithFilters();
      });
    };

    const handleRestore = () => {
      archiveProduct({
        url: `/companies/${companyId}/products/${row.id}/restore`,
      }).then(() => {
        toast.success('Товар восстановлен из архива');
        requestProductsWithFilters();
      });
    };

    const handleRemove = () => {
      removeProduct({
        url: `/companies/${companyId}/products/${row.id}`,
      }).then(() => {
        toast.success('Товар удален');
        requestProductsWithFilters();
      });
    };

    let Buttons: Array<React.ReactNode> = [];
    if (!row.isArchived) {
      switch (row.status) {
        case ProductStatus.ReadyForSale: {
          Buttons = [
            <MenuItem value={10} onClick={() => router.push(`/seller/products/update/${row.id}`)} key={0}>
              <i className="ui_eye" style={{ marginRight: 8 }} /> Просмотреть
            </MenuItem>,
            <MenuItem value={10} onClick={handlePublish} key={0}>
              <i className="ui_rocket" style={{ marginRight: 8 }} /> Опубликовать в продажу
            </MenuItem>,
            <MenuItem value={10} key={1} onClick={handleUpdate}>
              <i className="ui_pencil" style={{ marginRight: 8 }} />
              Редактировать
            </MenuItem>,
            // <MenuItem value={10} key={2}>
            //   <i className="ui_copy" style={{ marginRight: 8 }} />
            //   Копировать
            // </MenuItem>,
            <MenuItem value={10} key={3}>
              <i className="ui_archive" style={{ marginRight: 8 }} />
              Архивировать
            </MenuItem>,
          ];
          break;
        }
        case ProductStatus.Draft || ProductStatus.Refused: {
          Buttons = [
            <MenuItem value={10} onClick={() => router.push(`/seller/products/update/${row.id}`)} key={0}>
              <i className="ui_eye" style={{ marginRight: 8 }} /> Просмотреть
            </MenuItem>,
            <MenuItem value={10} key={1} onClick={handleUpdate}>
              <i className="ui_pencil" style={{ marginRight: 8 }} />
              Редактировать
            </MenuItem>,
            // <MenuItem value={10} key={2}>
            //   <i className="ui_copy" style={{ marginRight: 8 }} />
            //   Копировать
            // </MenuItem>,
            <MenuItem value={10} key={3} onClick={handleArchive}>
              <i className="ui_archive" style={{ marginRight: 8 }} />
              Архивировать
            </MenuItem>,
          ];
          break;
        }
        case ProductStatus.OnSale: {
          Buttons = [
            <MenuItem value={10} onClick={() => router.push(`/seller/products/update/${row.id}`)} key={0}>
              <i className="ui_eye" style={{ marginRight: 8 }} /> Просмотреть
            </MenuItem>,
            <MenuItem value={10} key={1} onClick={handleStopSale}>
              <i className="ui_pencil" style={{ marginRight: 8 }} />
              Остановить продажу
            </MenuItem>,
            // <MenuItem value={10} key={2}>
            //   <i className="ui_copy" style={{ marginRight: 8 }} />
            //   Копировать
            // </MenuItem>,
            <MenuItem value={10} key={3}>
              <i className="ui_archive" style={{ marginRight: 8 }} />
              Архивировать
            </MenuItem>,
          ];
          break;
        }
        case ProductStatus.InModeration: {
          Buttons = [
            <MenuItem value={10} onClick={() => router.push(`/seller/products/update/${row.id}`)} key={0}>
              <i className="ui_eye" style={{ marginRight: 8 }} /> Просмотреть
            </MenuItem>,
            <MenuItem value={10} key={1} onClick={handleRevokeModeration}>
              <i className="ui_pencil" style={{ marginRight: 8 }} />
              Отозвать с проверки
            </MenuItem>,
            // <MenuItem value={10} key={2}>
            //   <i className="ui_copy" style={{ marginRight: 8 }} />
            //   Копировать
            // </MenuItem>,
          ];
          break;
        }
        case ProductStatus.Archive: {
          Buttons = [];
          break;
        }
      }
    } else {
      Buttons = [
        <MenuItem value={10} onClick={handleRestore} key={0}>
          <i className="ui_flip-backward" style={{ marginRight: 8 }} /> Вернуть с архива
        </MenuItem>,
        <MenuItem
          value={10}
          key={1}
          onClick={handleRemove}
          sx={{ 'color': mainRed900, '&:hover': { color: mainRed900 } }}
        >
          <i className="ui_trash" style={{ marginRight: 8 }} />
          Удалить
        </MenuItem>,
        // <MenuItem value={10} key={2}>
        //   <i className="ui_copy" style={{ marginRight: 8 }} />
        //   Копировать
        // </MenuItem>,
      ];
    }

    return (
      <TableCell
        sx={{
          minWidth: 30,
          width: 50,
          right: 0,
          zIndex: 2,
          position: 'sticky',
          heigth: '101%',

          padding: '0px !important',
          borderBottom: `1px solid #fff !important`,
        }}
      >
        <Box className={classes.dotsButnCell}>
          <DotsButton>{Buttons}</DotsButton>
        </Box>
      </TableCell>
    );
  };

  return (
    <>
      {data?.data.length !== 0 ? (
        <Paper sx={{ position: 'relative' }} className={classes.paper}>
          <TableNavigation
            onSaveFilters={handleSaveFilters}
            onUpdateColumnsToShow={handleUpdateShowColumns}
            perPage={rowsPerPage}
            handleChangePerPage={handleChangePerPage}
          />
          <IconButton
            style={{ left: 6 }}
            className={classes.arrowButtons}
            onClick={() => handleClickArrow('left')}
            size={'small'}
          >
            <i className={cx('ui_left-arrow', classes.arrowIcon)}></i>
          </IconButton>
          <IconButton
            style={{ right: 6 }}
            className={classes.arrowButtons}
            onClick={() => handleClickArrow('right')}
            size={'small'}
          >
            <i className={cx('ui_right-arrow', classes.arrowIcon)}></i>
          </IconButton>
          <TableContainer
            ref={ref}
            sx={{
              'border': '2px solid #F5F5F6',
              'borderRadius': '16px 16px 0 0',
              'width': '100%',
              'marginTop': '30px',
              'overflowX': 'auto',
              '&::-webkit-scrollbar': {
                height: 4,
              },
              '&::-webkit-scrollbar-track': {
                background: '#F5F5F7',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              },
              '&::-webkit-scrollbar-thumb': {
                background: mainBlue600,
                borderRadius: 10,
              },
            }}
          >
            {loading ? (
              <div className={classes.loadingContainer}>
                <Loader />
              </div>
            ) : (
              <Table className={classes.customTable} sx={{ width: '100%' }} aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    {renderColumns()}
                    {/* // TODO: Уточнить */}
                    {/* {ProductListColumns.map((item, key) => (
                  <TableCell key={key}>
                    <Box className={classes.textTh}>
                      {item.label} <i className={cx('ui_chevron-select', classes.thIcon)}></i>
                    </Box>
                  </TableCell>
                ))} */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data?.map((row) => {
                    const subCategory = row.catalogMain[0] || null;
                    const category = subCategory?.parents[0] || null;
                    const branch = category?.parents[0] || null;
                    return (
                      <TableRow key={row.id}>
                        <TableCell sx={{ minWidth: 90 }}>
                          <Checkbox />
                        </TableCell>
                        {renderBodyColumn(1, row.sku, 248)}
                        {renderBodyColumn(2, row.name, 288)}
                        {renderBodyColumn(
                          1000,
                          <StatusLabel className={cx(`status-${ProductStatus[row.status]}`, 'status')}>
                            {ProductStatuses[row.status]}
                          </StatusLabel>,
                          170,
                        )}
                        {renderBodyColumn(3, branch?.name, 232)}
                        {renderBodyColumn(4, category?.name, 232)}
                        {renderBodyColumn(5, subCategory?.name, 232)}
                        {renderBodyColumn(
                          6,
                          String(getCatalogMainByParams(row.catalogMain, { level: 4 }, 'name')),
                          232,
                        )}
                        {renderBodyColumn(7, getTermsSaleByType(row.termsSale, 2, 'name'), 140)}
                        {renderBodyColumn(8, getTermsSaleByType(row.termsSale, 2, 'value'), 140)}
                        {renderBodyColumn(9, getTermsSaleByType(row.termsSale, 1, 'value'), 140)}
                        {renderBodyColumn(10, row.sale || 0 + '%', 140)}
                        {renderBodyColumn(1001, row.additionalMarkup || 0 + '%', 140)}
                        {renderBodyColumn(11, row.prepaymentValue || 0 + '%', 140)}
                        {renderBodyColumn(12, row.country?.name, 140)}
                        {renderBodyColumn(13, Math.ceil(row.shipmentTime / 24), 140)}
                        <ActionsCell row={row} />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            widht={'100%'}
            justifyContent={'center'}
            backgroundColor={monoBgGrey}
            page={Number(filters.page)}
            onChange={(_, page: number) => handleSaveFilters({ ...filters, page })}
            count={data?.meta.lastPage}
          />
        </Paper>
      ) : (
        <EmptyInfo
          title="Список товаров пуст"
          description="Добавьте ваш первый товар"
          Buttons={[
            <Button key={1} onClick={() => router.push('/seller/products/create')}>
              Добавить товар
            </Button>,
            <Button key={2} small variant={'text'} onClick={() => router.push('/seller/products/create')}>
              Добавить несколько товаров
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default ProductTable;
