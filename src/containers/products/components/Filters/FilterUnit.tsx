import { Box, FormControlLabel, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import CheckBox from '../../../../components/CheckBox';
import { TextField } from '../../../../components/Textfield';
import { useStore } from '../../../../context/StoreContext';
import { black } from '../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  label: {
    '& .MuiFormControlLabel-label': {
      color: black,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '14px',
    },
  },
}));

const FilterUnit = ({ onFilterChange, queryParams }) => {
  const { units } = useStore();
  const [search, setSearch] = useState('');
  const { classes } = useStyles();

  const queryValue: any = queryParams['u[1]']?.map((id) => parseInt(id)) || [];
  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedValues: queryValue,
    },
    onSubmit: (values) => {
      onFilterChange(`u[1]`, values.selectedValues);
    },
  });

  const handleChange = (e, itemId) => {
    let checkedIdsArr = [...formik.values.selectedValues];
    if (!e.target.checked) {
      checkedIdsArr = checkedIdsArr.filter((id) => id !== itemId);
    } else {
      checkedIdsArr.push(itemId);
    }

    formik.setFieldValue('selectedValues', checkedIdsArr);
    clearTimeout(timerID);
    const id = setTimeout(() => formik.handleSubmit(), 2000);
    setTimerID(id);
  };

  if (!units) {
    return null;
  }
  return (
    <Stack>
      <Typography mb={1} sx={{ fontSize: 14, lineHeight: '20px', fontWeight: 700, color: black }}>
        Ед. измерения товара
      </Typography>
      <TextField
        fullWidth
        label="Найти..."
        name="search"
        size={'extraSmall'}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Box sx={{ mt: 1 }} />
      {units.QUANTITY_PRODUCT.filter((item) => {
        if (search === '') {
          return true;
        }
        return item.name.startsWith(search);
      }).map((item, key) => (
        <FormControlLabel
          className={classes.label}
          key={key}
          control={
            <CheckBox
              checked={formik.values.selectedValues.map((val) => parseInt(val)).includes(item.id)}
              onChange={(e) => handleChange(e, item.id)}
            />
          }
          label={item.name}
        />
      ))}
    </Stack>
  );
};

export default FilterUnit;
