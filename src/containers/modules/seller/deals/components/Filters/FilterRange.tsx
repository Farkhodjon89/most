import { InputAdornment, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { OutlinedTextField } from '../../../../../../components/Textfield';
import { black } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterRange = ({
  titleStart,
  titleEnd,
  startType,
  endType,
  onFilterChange,
  queryParams,
  minName,
  maxName,
}: any) => {
  const handleChange = (name, value) => {
    onFilterChange && onFilterChange(name, value);
  };

  return (
    <>
      <Stack direction="row" alignItems={'center'} display={'flex'} spacing={2}>
        <OutlinedTextField
          size={'extraSmall'}
          label={titleStart}
          type={startType}
          InputProps={{
            startAdornment: startType !== 'date' && (
              <InputAdornment position="start">
                <Typography>От</Typography>
              </InputAdornment>
            ),
          }}
          name={minName}
          value={(queryParams && queryParams[minName]) || ''}
          onChange={(e) => handleChange(minName, e.target.value)}
        />
        <Typography> - </Typography>
        <OutlinedTextField
          label={titleEnd}
          type={endType}
          size={'extraSmall'}
          InputProps={{
            startAdornment: endType !== 'date' && (
              <InputAdornment position="start">
                <Typography>До</Typography>
              </InputAdornment>
            ),
          }}
          name={maxName}
          value={(queryParams && queryParams[maxName]) || ''}
        />
      </Stack>
    </>
  );
};

export default FilterRange;
