import { useFormik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { TextField } from '../../../../../../components/Textfield';
import { black } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterInput = ({ name, queryParams, onFilterChange, placeholder }: any) => {
  const handleChange = (e) => {
    onFilterChange && onFilterChange(name, e.target.value);
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder={placeholder}
        name={name}
        size={'extraSmall'}
        value={(queryParams && queryParams[name]) || ''}
        onChange={handleChange}
      />
    </>
  );
};

export default FilterInput;
