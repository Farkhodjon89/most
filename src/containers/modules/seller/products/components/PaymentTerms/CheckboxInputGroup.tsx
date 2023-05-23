import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import CheckboxIcon from 'components/icons/CheckboxIcon';
import CheckboxIconActive from 'components/icons/CheckboxIconActive';
import { useFormikContext } from 'formik';
import React, { FC, useCallback } from 'react';
import { mainBlue300, mainBlue500, monoBgGreyLight } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

import { TextField } from '../../../../../../components/Textfield';

const useStyles = makeStyles<{ border: boolean }>()((theme, { border, checked }) => ({
  formGroup: {
    '& .MuiCheckbox-root': {
      padding: theme.spacing(1),
    },
    '& .MuiFormControlLabel-root': {
      'transition': 'all 0.3s',
      'border': border ? `1px solid ${mainBlue500}` : 'none',
      'borderRadius': 8,
      'borderBottomRightRadius': 4,
      'borderTopRightRadius': 4,
      'paddingRight': theme.spacing(1),
      'marginBottom': theme.spacing(1),
      'marginLeft': 0,
      'marginRight': theme.spacing(1),
      'userSelect': 'none',
      '&:hover': {
        backgroundColor: mainBlue300,
      },
      'backgroundColor': checked ? mainBlue300 : monoBgGreyLight,
    },
  },
  prepaymentValue: {
    'backgroundColor': monoBgGreyLight,
    'borderRadius': '4px 12px 12px 4px',
    '& .MuiInputBase-root': {
      fontSize: theme.typography.pxToRem(12),
      height: 48,
    },
    '.MuiOutlinedInput-notchedOutline': {
      overflow: 'hidden',
      border: 'none',
      borderRadius: '4px 12px 12px 4px',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
  },
  formCheckbox: {
    width: '100%',
    height: 48,
    backgroundColor: monoBgGreyLight,
  },
}));

type Props = {
  border?: boolean;
};

const CheckboxInputGroup: FC<Props> = ({ border = true, readOnlyMode }) => {
  const formik = useFormikContext();
  const { classes } = useStyles({ border: border, checked: formik.values.isPrepayment });
  const handleChange = useCallback(
    (e) => {
      if (!e.target.checked) {
        formik.setFieldValue('prepaymentValue', '');
      }
      formik.setFieldValue('isPrepayment', e.target.checked);
    },
    [formik.values.isPrepayment],
  );

  return (
    <FormGroup row className={classes.formGroup}>
      <Grid container>
        <Grid item xs={10} pr={0.2}>
          <FormControlLabel
            disabled={readOnlyMode}
            className={classes.formCheckbox}
            control={
              <Checkbox
                disableRipple
                icon={<CheckboxIcon />}
                checkedIcon={<CheckboxIconActive />}
                checked={formik.values.isPrepayment}
                onChange={handleChange}
              />
            }
            label={'Предоплата'}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            disabled={!formik.values.isPrepayment || readOnlyMode}
            placeholder={'0%'}
            // label={'Аванс, %'}
            size={'small'}
            name={'prepaymentValue'}
            className={classes.prepaymentValue}
            onFocus={() => formik.setFieldTouched('prepaymentValue', false)}
            onBlur={() => formik.setFieldTouched('prepaymentValue', true)}
            value={formik.values.prepaymentValue}
            onChange={formik.handleChange}
            error={formik.touched.prepaymentValue && Boolean(formik.errors.prepaymentValue)}
            // helperText={formik.touched.prepaymentValue && formik.errors.prepaymentValue}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default CheckboxInputGroup;
