import { Box } from '@mui/material';

import Chip from '../../../../components/Chip';
import { useStore } from '../../../../context/StoreContext';
import { prepareQueryAttributes } from '../../lib/utils';

const FilterSelected = ({ queryParams, onFilterRemove }) => {
  const { units, attributes } = useStore();

  let queryUnits = queryParams['u[1]'] || [];
  if (queryUnits.length > 0) {
    queryUnits = queryUnits.map(
      (queryUnitId) => units?.QUANTITY_PRODUCT.find((item) => item.id === parseInt(queryUnitId))?.name || '',
    );
  }
  const queryAttibutes = prepareQueryAttributes(attributes, queryParams);

  const minOrder = queryParams['min_order'] || null;
  const minPrice = queryParams['min_price'] || null;
  const maxPrice = queryParams['max_price'] || null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component={'ul'}
    >
      {queryUnits.length > 0 && (
        <Chip label={`Ед. измерения товара: ${queryUnits.join(', ')}`} onDelete={() => onFilterRemove('u[1]')} />
      )}
      {minOrder && <Chip label={`Минимальный заказ: ${minOrder}`} onDelete={() => onFilterRemove('min_order')} />}
      {minPrice && (
        <Chip label={`Минимальная цена за единицу (₽): ${minPrice}`} onDelete={() => onFilterRemove('min_price')} />
      )}
      {maxPrice && (
        <Chip label={`Максимальная цена за единицу (₽): ${maxPrice}`} onDelete={() => onFilterRemove('max_price')} />
      )}
      {queryAttibutes.map((attr, key) => (
        <Chip key={key} label={`${attr.label}: ${attr.value}`} onDelete={() => onFilterRemove(attr.paramKey)} />
      ))}
    </Box>
  );
};

export default FilterSelected;
