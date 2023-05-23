import { FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import CheckBox from '../../../../components/CheckBox';
import { useStore } from '../../../../context/StoreContext';
import { black, monoLightGrey2, monoWhite } from '../../../../styles/colorPalette';
import { getCategoryById } from '../../../modules/seller/products/lib/utils';

const useStyles = makeStyles()((theme) => ({
  root: {
    'width': '100%',
    'backgroundColor': monoWhite,
    'borderRadius': '16px',
    'padding': '16px',
    'boxShadow': 'unset',
    'cursor': 'pointer',
    'marginBottom': '24px',
    'border': `1px solid ${monoLightGrey2}`,

    '& 	.MuiGrid-item': {
      paddingTop: 'unset',
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
    marginBottom: '20px',
  },
}));

const FilterGroup = ({ title, queryParams, onFilterChange }: any) => {
  const { branches } = useStore();
  const { classes } = useStyles();
  const router: any = useRouter();
  const categoryId = parseInt(router.query.categoryId);

  const activeSubcategory = getCategoryById(branches, 3, categoryId);
  const queryValue = queryParams['ids']?.map((id) => parseInt(id)) || [];

  const [timerID, setTimerID] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedValues: queryValue,
    },
    onSubmit: () => {
      onFilterChange(`ids`, formik.values.selectedValues);
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
    const id = setTimeout(formik.handleSubmit, 2000);
    setTimerID(id);
  };

  if (!activeSubcategory || activeSubcategory?.childs.length === 0) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Typography mb={1} className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {activeSubcategory?.childs.map(({ name, id }: any, key) => (
          <Grid key={id} item xs={3}>
            <FormControlLabel
              key={key}
              value={id}
              control={
                <CheckBox
                  checked={formik.values.selectedValues.map((val) => parseInt(val)).includes(id)}
                  onChange={(e) => handleChange(e, id)}
                />
              }
              label={name}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default FilterGroup;
