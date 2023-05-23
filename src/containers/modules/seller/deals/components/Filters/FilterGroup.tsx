import { Stack, Typography } from '@mui/material';
import Select from 'components/Select';
import { StatusesByKey } from 'containers/products/lib/hooks';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../../../../components/Button';
import { black } from '../../../../../../styles/colorPalette';
import FilterInput from './FilterInput';
import FilterRange from './FilterRange';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '22px',
    color: black,
    fontWeight: 700,
  },
}));

const FilterGroup = ({ title, handleClear, filters, handleSave, onFilterChange }) => {
  const { classes } = useStyles();

  return (
    <>
      <Typography mb={2} variant={'h4'} className={classes.title}>
        {title}
      </Typography>
      <Stack spacing={2}>
        {/* <FilterInput placeholder={'Идентификатор сделки'} /> */}
        <Select
          onChange={(e) => onFilterChange && onFilterChange({ order_type: e.target.value })}
          options={[
            { label: 'Я продаю', value: 1 },
            { label: 'Я покупаю', value: 2 },
          ]}
          size={'extraSmall'}
          label={'Тип сделки'}
          value={Number(filters.order_type)}
        />
        <FilterRange
          queryParams={filters}
          titleStart="Предоплата от"
          titleEnd="Предоплата до"
          minName="order_amount_from"
          maxName="order_amount_to"
          onFilterChange={(name, value) => onFilterChange && onFilterChange({ [name]: value })}
        />
        {/* <FilterInput
          queryParams={filters}
          name="contractor"
          onFilterChange={(name, value) => onFilterChange && onFilterChange({ [name]: value })}
          placeholder={'Контрагент'}
        /> */}
        {/* <FilterInputDropdown placeholder={'Статус'} /> */}
        <Select
          onChange={(e) => onFilterChange && onFilterChange({ status: e.target.value })}
          options={Object.entries(StatusesByKey).map(([key, val]) => {
            return { label: val, value: key };
          })}
          size={'extraSmall'}
          label={'Статус'}
          value={filters.status}
        />
        <FilterRange
          queryParams={filters}
          titleStart="Дата от"
          titleEnd="Дата до"
          startType="date"
          endType="date"
          minName="from_date"
          maxName="to_date"
          onFilterChange={(name, value) => onFilterChange && onFilterChange({ [name]: value })}
        />
        <Stack direction={'row'} spacing={1}>
          <Button onClick={handleSave} extraSmall>
            Применить
          </Button>
          <Button onClick={handleClear} variant={'text'} extraSmall>
            Сбросить
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default FilterGroup;
