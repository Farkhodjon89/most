import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
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
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  blue,
  mainBlue900,
  mainGreen400,
  mainGreen900,
  mainRed400,
  mainRed900,
  monoBgGrey,
  monoDarkBlack,
  monoLightGrey1,
  monoWhite,
} from 'styles/colorPalette';

import Pagination from '../../../../../components/Pagination';
import { useStyles } from '../../../../products/components/SellersTable';
import { ProductOrderType } from '../../../../products/lib/types';
import { prepareSellersQueryParams } from '../../../../products/lib/utils';

enum Statuses {
  'Новый запрос' = 'NEW_REQUEST',
  'Подписание договора' = 'SIGNIN',
  'Исполнение договора' = 'FULFILMENT',
  'Приостановлена' = 'STOPPED',
  'Завершена' = 'FINISHED',
  'Отклонена' = 'DECLINED',
}

const StyledStatus = styled(Typography)(({ theme }) => ({
  ['&.status']: {
    width: 'fit-content',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    borderRadius: '6px',
    padding: '2px 6px',
    cursor: 'pointer',
  },
  [`&.status-NEW_REQUEST`]: {
    color: monoWhite,
    backgroundColor: mainGreen900,
  },
  [`&.status-SIGNIN`]: {
    color: mainGreen900,
    backgroundColor: mainGreen400,
  },
  [`&.status-FULFILMENT`]: {
    color: mainGreen900,
    backgroundColor: mainGreen400,
  },
  [`&.status-STOPPED`]: {
    color: monoDarkBlack,
    backgroundColor: monoBgGrey,
  },
  [`&.status-FINISHED`]: {
    color: blue,
    backgroundColor: monoBgGrey,
  },
  [`&.status-DECLINED`]: {
    color: mainRed900,
    backgroundColor: mainRed400,
  },
}));

const StyledBold = styled(Typography)(({ theme }) => ({
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
  // fontWeight: 700,
}));

const DealsTable: FC<{
  onFilterChange?: any;
  meta?: any;
  loading?: any;
  deals?: ProductOrderType[];
}> = ({ deals, onFilterChange, meta, loading }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(1);
  const [queryValue, setQueryValue] = useState(0);
  const query: any = router.query;
  const queryParams = prepareSellersQueryParams(query);

  useEffect(() => {
    if (queryParams && Number(queryParams.perPage) && Number(queryValue) !== Number(queryParams.perPage)) {
      setQueryValue(queryParams.perPage);
    }
  }, [queryParams]);

  useEffect(() => {
    if (onFilterChange) {
      handleClose();
      onFilterChange({
        perPage: Number(queryValue),
        page,
      });
    }
  }, [queryValue, page]);

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('wheel', (event) => {
      event.preventDefault();
      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  }, []);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading || !deals) {
    return <Typography> Loading...</Typography>;
  }

  return (
    <Paper sx={{ position: 'relative' }} className={classes.paper}>
      {/*Тут долго думал над тем как отображать кнопку слева в случае если у скролла начальная позиция*/}
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
          'marginTop': '16px',
          // 'position': 'relative',
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
            background: monoLightGrey1,
            borderRadius: 10,
          },
        }}
      >
        <Table className={classes.customTable} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Идентификатор<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Дата создания<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Контрагент<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 120, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  ИНН<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 110, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Тип сделки<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Статус<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Сумма оплаты<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: 177, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  Сумма предоплаты<i className="ui_chevron-select"></i>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((deal, index) => (
              <TableRow
                key={deal.id}
                onClick={() => router.push(`/seller/deals/seller?dealId=${deal.id}`)}
                sx={{ height: 36 }}
              >
                <TableCell sx={{ minWidth: 177 }}>
                  <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.id}</StyledBold>
                    <Box className={classes.notification}>
                      <i className={cx('ui_message-circle-filled', classes.message)}></i>?
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ minWidth: 177 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.creationDate}</StyledBold>
                </TableCell>
                <TableCell sx={{ minWidth: 177 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.contractor}</StyledBold>
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.contractorInn}</StyledBold>
                </TableCell>
                <TableCell sx={{ minWidth: 110 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>No Data</StyledBold>
                </TableCell>
                <TableCell sx={{ minWidth: 177 }}>
                  <StyledStatus className={cx(`status-${Statuses[deal.status]}`, 'status')}>{deal.status}</StyledStatus>
                </TableCell>
                <TableCell sx={{ minWidth: 177 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.orderSum}</StyledBold>
                </TableCell>
                <TableCell sx={{ minWidth: 177 }}>
                  <StyledBold style={{ fontWeight: index === 0 && 700 }}>{deal.prepaymentAmount}</StyledBold>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          border: '2px solid #F5F5F6',
          borderRadius: ' 0 0 16px 16px',
          height: '40px',
          position: 'relative',
        }}
      >
        <Pagination
          backgroundColor={monoWhite}
          count={meta?.lastPage}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
        <Stack
          key={loading}
          sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '16px' }}
          direction={'row'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography onClick={handleClick} className={classes.label}>
            Отображать по:{' '}
            <Typography style={{ color: mainBlue900 }} component={'span'}>
              {queryValue}
            </Typography>{' '}
            <i className="ui_down-arrow" style={{ fontSize: 12 }} />
          </Typography>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem value={10} selected={queryValue === 2} onClick={() => setQueryValue(2)}>
              2
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 10} onClick={() => setQueryValue(10)}>
              10
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 50} onClick={() => setQueryValue(50)}>
              50
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 100} onClick={() => setQueryValue(100)}>
              100
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Paper>
  );
};

export default DealsTable;
