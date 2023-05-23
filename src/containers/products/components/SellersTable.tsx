import {
  Box,
  Checkbox,
  FormControlLabel,
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
import { Button } from 'components/Button';
import { axiosClient } from 'pages/_app';
import Link from 'next/link';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  mainBlue900,
  mainRed900,
  monoBgGrey,
  monoBgGreyLight,
  monoBlack,
  monoDarkBlack,
  monoGrey,
  monoLightGrey1,
  monoWhite,
} from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import cx from 'classnames';
import Pagination from '../../../components/Pagination';
import { useCart } from '../lib/hooks';

export const useStyles = makeStyles()((theme) => ({
  label: {
    color: monoGrey,
    fontSize: 14,
    cursor: 'pointer',
    height: '100%',
    fontWeight: 700,
    paddingRight: theme.spacing(1),
    // borderRight: `2px solid ${monoLightGrey1}`,
  },
  arrowButtons: {
    'position': 'absolute',
    'top': 12,
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
  message: {
    marginRight: 3,
    color: monoWhite,
  },
  notification: {
    padding: '2px 6px',
    backgroundColor: mainRed900,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    color: monoWhite,
    fontSize: theme.typography.pxToRem(10),
    cursor: 'pointer',
  },
  //table
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
  sticky: {
    'position': 'sticky',
    'left': 0,
    'zIndex': 9,
    'background': monoWhite,
    'boxShadow': '5px 0px 16px rgba(0, 0, 0, 0.06)',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '10px',
      height: '100%',
      top: 0,
      bottom: 0,
      left: '100%',
      background: ' linear-gradient(90deg, rgba(0, 0, 0, 0.06), rgba(255, 255, 255, 0));',
    },
  },
  messageIcon: {
    color: mainBlue900,
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: '13px',
    borderLeft: `1px solid ${monoLightGrey1}`,
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
      backgroundColor: monoWhite,
    },
    '& .MuiTableHead-root': {
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '72px',
        height: '34px',
        background: ' linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 78.12%);',
        zIndex: 5,
        right: 25,
      },
    },
    '& .MuiTableRow-root': {
      'borderBottom': `1px solid ${monoBgGrey}`,
      '&:hover': {
        backgroundColor: monoBgGreyLight,
      },
    },
  },
  arrowIcon: {
    color: mainBlue900,
    fontSize: theme.typography.pxToRem(12),
  },
  paper: {
    boxShadow: 'none',
    borderRadius: '16px',
    // cursor: 'pointer',
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
  fontSize: theme.typography.pxToRem(14),
  lineHeight: '14px',
  color: monoDarkBlack,
  cursor: 'pointer',
}));

const StyledGreyText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(10),
  fontWeight: 700,
  lineHeight: '16px',
  color: monoGrey,
}));

const StyledPrice = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 700,
  lineHeight: '14px',
  color: monoDarkBlack,
  cursor: 'pointer',
}));

const SellersTable: FC<any> = ({ sellers, ids, queryParams, onFilterChange, meta, loading }) => {
  const { classes } = useStyles();
  const [checkeds, setCheckeds] = React.useState<number[]>([]);
  const queryValue = parseInt(queryParams['per_page']) || 2;
  const { generateOrdersByIds } = useCart();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollDimensions, setScrollDimensions] = useState(0);

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('wheel', (event) => {
      event.preventDefault();
      setScrollDimensions(event.deltaY);
      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeCheckeds = React.useCallback(
    (id: number) => {
      if (checkeds.some((ids) => ids === id)) {
        setCheckeds(checkeds.filter((ids) => ids !== id));
      } else {
        setCheckeds([...checkeds, id]);
      }
    },
    [checkeds],
  );

  const handleSelect = (perPage: number) => {
    onFilterChange('per_page', perPage);
    handleClose();
  };

  if (loading) {
    return <Typography> Loading...</Typography>;
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction={'row'} spacing={2}>
          <Button small variant={'text'}>
            Показать выбранных поставщиков
          </Button>
          <Button disabled={!checkeds.length} onClick={() => generateOrdersByIds(ids, checkeds)} small>
            Уточнить условия ({checkeds.length})
          </Button>
        </Stack>
        <Stack direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography onClick={handleClick} className={classes.label}>
            Отображать по:{' '}
            <Typography style={{ color: mainBlue900 }} component={'span'}>
              {queryValue}{' '}
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
            <MenuItem value={10} selected={queryValue === 2} onClick={() => handleSelect(2)}>
              2
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 10} onClick={() => handleSelect(10)}>
              10
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 50} onClick={() => handleSelect(50)}>
              50
            </MenuItem>
            <MenuItem value={10} selected={queryValue === 100} onClick={() => handleSelect(100)}>
              100
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
      <Paper className={classes.paper}>
        <TableContainer
          ref={ref}
          sx={{
            'border': '2px solid #F5F5F6',
            'borderRadius': '16px 16px 0 0',
            'width': '100%',
            'marginTop': '16px',
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
            <TableHead sx={{ position: 'relative' }}>
              <TableRow>
                <TableCell sx={{ minWidth: 230 }}>
                  {/*<Checkbox />*/}
                  Поставщик
                </TableCell>
                <TableCell sx={{ minWidth: 125 }}>Артикул</TableCell>
                <TableCell sx={{ minWidth: 125 }}>ИНН</TableCell>
                <TableCell sx={{ minWidth: 125 }}>
                  Цена за ед.<StyledGreyText>(₽)</StyledGreyText>
                </TableCell>
                <TableCell sx={{ minWidth: 125 }}>
                  Мин. заказ <StyledGreyText>(шт)</StyledGreyText>
                </TableCell>
                <TableCell sx={{ minWidth: 125 }}>
                  Срок отгрузки <StyledGreyText>(часы)</StyledGreyText>
                </TableCell>
                <TableCell sx={{ minWidth: 125 }}>
                  Стоимость доставки <StyledGreyText>(₽)</StyledGreyText>
                </TableCell>
                <TableCell sx={{ minWidth: 125 }}>
                  Срок доставки <StyledGreyText>(дней)</StyledGreyText>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ minWidth: 230 }}>
                    <StyledName>
                      <FormControlLabel
                        onChange={() => handleChangeCheckeds(row.id)}
                        control={<Checkbox />}
                        checked={checkeds.some((id) => id === row.id)}
                        label={row.name}
                      />
                    </StyledName>
                  </TableCell>
                  <TableCell sx={{ minWidth: 100 }}>{row.sku}</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>
                    <StyledPrice>{row.inn}</StyledPrice>
                  </TableCell>
                  <TableCell sx={{ minWidth: 100 }}>{row.price}</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>{row.minOrder}</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>{row.shipmentTime}</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    <Link href={`#`}>
                      <a>
                        <Button onClick={() => generateOrdersByIds(ids, [row.id])} variant={'outlined'} small>
                          Уточнить условия
                        </Button>
                      </a>
                    </Link>
                    <IconButton>
                      <i className={cx('ui_message-circle', classes.messageCircle)}></i>
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ minWidth: 125 }}>{row.shipmentTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/*<Box className={classes.root} mt={4} mb={4}>*/}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            border: '2px solid #F5F5F6',
            borderRadius: ' 0 0 16px 16px',
            height: '40px',
          }}
        >
          <Pagination
            backgroundColor={monoWhite}
            count={meta?.lastPage}
            page={meta?.currentPage}
            onChange={(e, value) => onFilterChange('page', value)}
          />
          {/*    <Typography className={classes.showMore}>Показать ещё 15</Typography>*/}
        </Box>
        {/*</Box>*/}
      </Paper>
    </>
  );
};

export default SellersTable;
