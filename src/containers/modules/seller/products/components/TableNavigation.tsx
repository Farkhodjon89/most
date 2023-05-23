import {
  Box,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import cx from 'classnames';
import { ProductStatuses } from 'const';
import { prepareQueryParams } from 'containers/products/lib/utils';
import { useStore } from 'context/StoreContext';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { getCatalogMainByParams } from 'utils/common';

import { Button, ButtonText, SecondaryButton } from '../../../../../components/Button';
import Select from '../../../../../components/Select';
import { OutlinedTextField, TextField } from '../../../../../components/Textfield';
import { mainBlue300, mainBlue600, mainBlue900, monoDarkBlack, monoGrey } from '../../../../../styles/colorPalette';
import AuthDropdown from '../../../../layouts/seller/header/components/AuthDropdown';

const useStyles = makeStyles<{ filterOpen: boolean }>()((theme, { filterOpen }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  filterIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    color: mainBlue900,
    marginRight: '8px',
    paddingRight: '8px',
  },

  filterText: {
    fontWeight: 700,
    fontSize: '12px !important',
    lineHeight: '14px',
    color: monoGrey,
  },
  ImputsFromToWrapp: {
    display: 'flex',
  },
  imputFirst: {
    '& .MuiInputBase-root ': {
      borderRadius: ' 12px 0px 0px 12px ',
    },
    '.MuiOutlinedInput-input': {
      padding: theme.spacing(1, 2),
      height: '1.5em',
    },
    '& .MuiInputLabel-root': {
      'transform': 'translate(14px, -8px) scale(0.75)',
      'fontSize': 14,
      '&.Mui-focused': {
        transform: 'translate(14px, -8px) scale(0.75)',
      },
    },
  },
  imputSecond: {
    '& .MuiInputBase-root ': {
      borderRadius: ' 0px 12px 12px 0px ',
    },
    '.MuiOutlinedInput-input': {
      padding: theme.spacing(1, 2),
      height: '1.5em',
    },

    '& .MuiInputLabel-root': {
      'transform': 'translate(14px, -8px) scale(0.75)',
      'fontSize': 14,
      '&.Mui-focused': {},
    },
  },
  сollapseButton: {
    'width': 'fit-content',
    'display': 'flex',
    'justifyContent': 'center',
    'padding': '4px, 8px, 4px, 8px',
    'background': filterOpen ? mainBlue300 : 'transparent',
    'borderRadius': theme.spacing(1),
    'transition': 'all 0.3s',
    '&:hover, &:focus': {
      background: mainBlue300,
      boxShadow: 'none',
    },
    '&:active': {
      background: mainBlue600,
    },
    '& .MuiSwitch-root': {
      display: 'none',
    },
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      color: mainBlue900,
      fontWeight: 600,
    },
  },
  menuItem: {
    'backgroundColor': 'red',
    '.MuiMenuItem-root': {
      backgroundColor: 'red',
    },
  },
}));
type Props = {
  onSubmit: (e: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  handleChangePerPage?: (count: number) => void;
  perPage?: number;
  onUpdateColumnsToShow?: (columns: number[] | boolean) => void;
  onSaveFilters?: (filters: Filters) => void;
};

const PER_PAGE_SIZE = [10, 20, 30];

// TODO: некоторые поля пока в типе number, будет массивом позже
export type Filters = {
  sku?: string;
  name?: string;
  statuses?: number;
  countries?: number;
  sale?: number;
  additional_markup?: string;
  min_price?: number;
  max_price?: number;
  min_shipment_time?: number;
  max_shipment_time?: number;
  scope_delivery_ed?: number;
  scope_delivery_min?: number;
  industry?: number;
  subcategory?: number;
  category?: number;
  groups?: string;
  page?: number;
};

const TableNavigation: FC<Props> = ({
  onChange,
  onUpdateColumnsToShow,
  onClose,
  perPage,
  handleChangePerPage,
  onSubmit,
  onCancel = null,
  onSaveFilters,
}) => {
  const router = useRouter();
  const query: any = router.query;
  const { commonUnits, branches, countries } = useStore();
  const [addressFact, setAddressFact] = useState<Filters>({});
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [selectedAllValues, setSelectedAllValues] = useState(false);
  const [selected, setSelected] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [checked, setChecked] = React.useState(false);
  const [openContent, setOpenContent] = useState(false);
  const open = Boolean(anchorEl);

  const { classes } = useStyles({ filterOpen: checked });

  const queryParams = prepareQueryParams(query);

  const handleClearFilters = useCallback(() => {
    const lengthFilters = Object.keys(addressFact).length;
    if (lengthFilters) {
      setAddressFact({});
      if (onSaveFilters) {
        onSaveFilters({
          page: 1,
        });
      }
    }
  }, [setAddressFact, onSaveFilters, addressFact]);

  useEffect(() => {
    setAddressFact({ ...addressFact, ...queryParams });
    if (onSaveFilters) onSaveFilters({ ...addressFact, ...queryParams, page: 1 });
  }, []);

  const industries = useMemo(() => {
    return branches;
  }, [branches]);

  const categories = useMemo(() => {
    return industries?.find((item) => item.id === Number(addressFact.industry))?.childs || [];
  }, [industries, addressFact]);

  const subcategories = useMemo(() => {
    return categories?.find((item) => item.id === Number(addressFact.category))?.childs || [];
  }, [categories, addressFact]);

  const groups = useMemo(() => {
    return subcategories?.find((item) => item.id === Number(addressFact.subcategory))?.childs || [];
  }, [subcategories, addressFact]);

  const createSelectData = (items: Array<{ id: number; name: string }>) =>
    items.map((item) => ({
      ...item,
      value: item.id,
      label: item.name,
    }));

  useEffect(() => {
    const dataColumnsJson = localStorage.getItem('productsColumns');
    const showAllProductsColumnsJsoj = localStorage.getItem('showAllProductsColumns');
    let status = true;

    if (showAllProductsColumnsJsoj) {
      status = Boolean(Number(showAllProductsColumnsJsoj));
      setSelectedAllValues(status);
      if (status && onUpdateColumnsToShow) {
        onUpdateColumnsToShow(status);
      }
    }

    if (dataColumnsJson) {
      const columns = JSON.parse(dataColumnsJson).map((item: string) => Number(item));
      setSelectedValues(columns);
      if (!status && onUpdateColumnsToShow) {
        onUpdateColumnsToShow(columns);
      }
    }
  }, []);

  const handleSaveFilters = useCallback(() => {
    if (onSaveFilters) {
      onSaveFilters({ ...addressFact, page: 1 });
    }
  }, [addressFact]);

  const handleChangeFilters = useCallback(
    (key: keyof Filters) => {
      return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddressFact({
          ...addressFact,
          [key]: e.target.value,
        });
      };
    },
    [addressFact, setAddressFact],
  );

  const handleChangeSearch = useCallback(
    _.debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleChangeFilters('sku')(e);
      if (onSaveFilters) {
        onSaveFilters({
          ...addressFact,
          sku: e.target.value,
        });
      }
    }, 2000),
    [handleChangeFilters, addressFact, handleSaveFilters],
  );

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleSaveColumnsOptions = useCallback((): void => {
    localStorage.setItem('productsColumns', JSON.stringify(selectedValues));
    localStorage.setItem('showAllProductsColumns', String(Number(selectedAllValues)));
    if (!onUpdateColumnsToShow) {
      return;
    }
    if (selectedAllValues) {
      onUpdateColumnsToShow(true);
    } else {
      onUpdateColumnsToShow(selectedValues);
    }
    handleClose();
  }, [selectedAllValues, selectedValues]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [options] = useState([
    { value: 1, label: 'Артикул' },
    { value: 2, label: 'Название' },
    { value: 1000, label: 'Статус' },
    { value: 3, label: 'Отрасль' },
    { value: 4, label: 'Категория' },
    { value: 5, label: 'Подкатегория' },
    { value: 6, label: 'Группа' },
    { value: 7, label: 'Единица измерения поставки' },
    { value: 8, label: 'Стоимость единицы измерения поставки' },
    { value: 9, label: 'Минимальный объем поставки' },
    { value: 10, label: 'Применяемая скидка, %' },
    { value: 11, label: 'Предоплата, %' },
    { value: 12, label: 'Страна производитель' },
    { value: 13, label: 'Срок отгрузки товара, дней' },
  ]);

  const handleCloseContent = () => {
    setOpenContent(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleChooseColumns = useCallback(
    _.debounce((value: number) => {
      if (selectedValues.find((item: number) => item === value)) {
        setSelectedValues(selectedValues.filter((val) => val !== value));
        setSelectedAllValues(false);
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    }, 100),
    [selectedValues, setSelectedValues, setSelectedAllValues],
  );

  const handleChangeAll = useCallback(() => {
    const isAllSelected = !selectedAllValues;
    if (!isAllSelected) {
      setSelectedValues([]);
    } else {
      setSelectedValues(options.map((item) => item.value));
    }
    setSelectedAllValues(isAllSelected);
  }, [selectedAllValues]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={classes.rightSide}>
            <Grid container wrap={'nowrap'}>
              <Grid item xs={4} className={classes.сollapseButton} mr={2}>
                <i className={cx('ui_filter-funnel', classes.filterIcon)}></i>
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label="Показать фильтры"
                  className={cx(classes.filterIcon)}
                />
              </Grid>

              <Grid item xs={4}>
                <ButtonText extraSmall onClick={handleClick}>
                  <i className={cx('ui_app', classes.filterIcon)}></i>Выбрать столбцы
                </ButtonText>
                <Menu
                  // open={openMenu}
                  open={open}
                  anchorEl={anchorEl}
                  classes={classes}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Stack>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          'borderBottom': '1px solid #E0E0E6',
                          'marginRight': 0,
                          'padding': '0px 16px 0px 16px',
                          '.MuiTypography-root ': { fontSize: ' 12px', color: monoDarkBlack, fontWeight: 700 },
                          '.MuiSvgIcon-root': { fontSize: 16 },
                        }}
                        control={<Checkbox checked={selectedAllValues} />}
                        onChange={handleChangeAll}
                        label="Выбрать все"
                      />
                    </FormGroup>
                    {options.map((item) => (
                      <FormGroup key={item.value}>
                        <MenuItem
                          value={item.value}
                          onClick={() => handleChooseColumns(item.value)}
                          sx={{ padding: '0px 16px 0px 16px' }}
                        >
                          <FormControlLabel
                            sx={{
                              '.MuiTypography-root ': { fontSize: ' 12px', color: monoDarkBlack },
                              '.MuiSvgIcon-root': { fontSize: 16 },
                            }}
                            control={<Checkbox checked={Boolean(selectedValues.find((t) => t === item.value))} />}
                            label={item.label}
                          />
                          {/*{item.label}*/}
                        </MenuItem>
                      </FormGroup>
                    ))}
                    <Stack padding={2}>
                      <Button onClick={handleSaveColumnsOptions} fullWidth extraSmall>
                        Применить
                      </Button>
                    </Stack>
                  </Stack>
                </Menu>
              </Grid>
              <Grid item xs={4}>
                <ButtonText onClick={(e) => setOpenContent(!openContent)}>
                  <i className={cx('ui_pencil', classes.filterIcon)}></i>Редактировать
                </ButtonText>
              </Grid>
            </Grid>
            <Grid container justifyContent={'flex-end'}>
              <Box mr={2} display={'flex'} alignItems={'center'}>
                <AuthDropdown
                  Icon={<div className={cx(classes.filterText)}>Отображать по:</div>}
                  buttonLabel={perPage || PER_PAGE_SIZE[0]}
                  key={perPage}
                >
                  {PER_PAGE_SIZE.map((item) => (
                    <MenuItem onClick={() => handleChangePerPage && handleChangePerPage(item)} key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </AuthDropdown>
              </Box>
              <Box>
                <TextField
                  size={'extraSmall'}
                  onChange={handleChangeSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton tabIndex={-1} aria-label="toggle password visibility" size="large">
                          <i className="ui_search" style={{ fontSize: 16 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Поиск по артикулу"
                />
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Collapse in={checked}>
          <Grid container spacing={2} ml={'1px'} pr={2} mt={1}>
            <Grid item xs={4}>
              <TextField
                label={'Артикул'}
                size={'extraSmall'}
                value={addressFact.sku || ''}
                onChange={handleChangeFilters('sku')}
              />
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Отрасль'}
                size={'extraSmall'}
                value={Number(addressFact.industry)}
                onChange={handleChangeFilters('industry')}
                options={createSelectData(industries)}
              ></Select>
            </Grid>
            <Grid item xs={2}>
              {/*@ts-ignore*/}
              <Select
                label={'Ед. измерения поставки'}
                size={'extraSmall'}
                value={Number(addressFact.scope_delivery_ed)}
                onChange={handleChangeFilters('scope_delivery_ed')}
                options={commonUnits.map((item) => ({
                  ...item,
                  value: item.id,
                  label: item.name,
                }))}
              ></Select>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label={'Мин. объем поставки'}
                value={addressFact.scope_delivery_min || ''}
                type="number"
                size={'extraSmall'}
                onChange={handleChangeFilters('scope_delivery_min')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={'Название'}
                value={addressFact.name || ''}
                size={'extraSmall'}
                onChange={handleChangeFilters('name')}
              />
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Категория'}
                size={'extraSmall'}
                disabled={!addressFact.industry}
                value={Number(addressFact.category)}
                onChange={handleChangeFilters('category')}
                options={createSelectData(categories)}
              ></Select>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label={'Применяемая скидка'}
                type="number"
                value={addressFact.sale || ''}
                size={'extraSmall'}
                onChange={handleChangeFilters('sale')}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label={'Применяемая наценка'}
                value={addressFact.additional_markup || ''}
                type="number"
                size={'extraSmall'}
                onChange={handleChangeFilters('additional_markup')}
              />
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Статус'}
                size={'extraSmall'}
                value={Number(addressFact.statuses)}
                onChange={handleChangeFilters('statuses')}
                options={Object.keys(ProductStatuses).map((key) => ({ value: key, label: ProductStatuses[key] }))}
              ></Select>
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Подкатегория'}
                size={'extraSmall'}
                value={Number(addressFact.subcategory)}
                disabled={!addressFact.industry || !addressFact.category}
                onChange={handleChangeFilters('subcategory')}
                options={createSelectData(subcategories)}
              ></Select>
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Stack direction="row" alignItems={'center'} display={'flex'}>
                <OutlinedTextField
                  className={classes.imputFirst}
                  size={'extraSmall'}
                  label={'Стоимость'}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14}>От</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={addressFact.min_price || ''}
                  onChange={handleChangeFilters('min_price')}
                />
                <OutlinedTextField
                  size={'extraSmall'}
                  className={classes.imputSecond}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14}>До</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={addressFact.max_price || ''}
                  onChange={handleChangeFilters('max_price')}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Страна производитель'}
                value={Number(addressFact.countries)}
                size={'extraSmall'}
                onChange={handleChangeFilters('countries')}
                options={createSelectData(countries)}
              ></Select>
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Select
                label={'Группа товаров'}
                value={Number(addressFact.groups)}
                size={'extraSmall'}
                onChange={handleChangeFilters('groups')}
                disabled={!addressFact.industry || !addressFact.category || !addressFact.subcategory}
                options={createSelectData(groups)}
              ></Select>
            </Grid>
            <Grid item xs={4}>
              {/*@ts-ignore*/}
              <Stack direction="row" alignItems={'center'} display={'flex'}>
                <OutlinedTextField
                  className={classes.imputFirst}
                  size={'extraSmall'}
                  label={'Срок отгрузки'}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14}>От</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={addressFact.min_shipment_time || ''}
                  onChange={handleChangeFilters('min_shipment_time')}
                />
                <OutlinedTextField
                  size={'extraSmall'}
                  className={classes.imputSecond}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14}>До</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={addressFact.max_shipment_time || ''}
                  onChange={handleChangeFilters('max_shipment_time')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Grid spacing={2} container>
                <Grid item>
                  <Button onClick={handleSaveFilters} extraSmall>
                    Применить{' '}
                  </Button>
                </Grid>
                <Grid item>
                  <ButtonText onClick={handleClearFilters}>Очистить</ButtonText>
                </Grid>
                <Grid item>
                  <ButtonText onClick={() => setChecked(false)}>Скрыть фильтры</ButtonText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Dialog open={openContent} onClose={handleCloseContent} sx={{ borderRadius: 12 }}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleCloseContent}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <i className="ui_close" style={{ fontSize: 12 }}></i>
          </IconButton>
          <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
            <Typography
              sx={{
                width: '100%',
                color: monoDarkBlack,
                fontWeight: 700,
                fontSize: 20,
                textAlign: 'left',
              }}
            >
              Массовое редактирование
            </Typography>
            <Typography sx={{ color: monoDarkBlack, fontWeight: 500, fontSize: 14, textAlign: 'left' }}>
              Выберите атрибут, который вы хотите обновить для всех выбранных записей
            </Typography>
            <Grid container>
              <Grid item xs={12} mb={1}>
                {/*@ts-ignore*/}
                <Select
                  label={'Статус'}
                  value={selected}
                  size={'small'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={12}>
                {/*@ts-ignore*/}
                <Select
                  label={'Черновик'}
                  value={selected}
                  size={'small'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
            </Grid>
            <Stack display={'flex'} flexDirection={'row'} pt={2} width={'100%'}>
              <Button
                small
                fullWidth
                onClick={(e) => {
                  onSubmit(e);
                  setOpenContent(false);
                }}
              >
                Применить
              </Button>
              <SecondaryButton small variant={'text'} fullWidth onClick={handleCloseContent}>
                Отмена
              </SecondaryButton>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TableNavigation;
