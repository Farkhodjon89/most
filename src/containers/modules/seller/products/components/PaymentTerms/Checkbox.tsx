import { Checkbox as DefaultCheckbox, FormControlLabel, FormGroup } from '@mui/material';
import CheckboxIcon from 'components/icons/CheckboxIcon';
import CheckboxIconActive from 'components/icons/CheckboxIconActive';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { mainBlue300, mainBlue500, monoBgGreyLight } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<{ border: boolean }>()((theme, { border, checked }) => ({
  formGroup: {
    '& .MuiCheckbox-root': {
      padding: theme.spacing(1),
    },
    '& .MuiFormControlLabel-root': {
      'transition': 'all 0.3s',
      'border': border ? `1px solid ${mainBlue500}` : 'none',
      'borderRadius': 8,
      'paddingRight': theme.spacing(1),
      'marginBottom': theme.spacing(1),
      'marginLeft': 0,
      '&:hover': {
        backgroundColor: mainBlue300,
      },
      'backgroundColor': checked ? mainBlue300 : monoBgGreyLight,
      // marginRight: theme.spacing(1),
      'userSelect': 'none',
    },
  },
}));

type CheckBoxItem = {
  value: string;
  name: string;
  isCheck: boolean;
};

type Props = {
  border?: boolean;
  arr: CheckBoxItem[];
  setArr: (arr: CheckBoxItem[]) => void;
};

const Checkbox: FC<Props> = ({ border = true, readOnlyMode }) => {
  const formik = useFormikContext();
  const { classes } = useStyles({ border: border, checked: formik.values.isPostpaid });

  return (
    <FormGroup row className={classes.formGroup}>
      <FormControlLabel
        disabled={readOnlyMode}
        control={
          <DefaultCheckbox
            disableRipple
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxIconActive />}
            checked={formik.values.isPostpaid}
            onChange={(e) => formik.setFieldValue('isPostpaid', e.target.checked)}
          />
        }
        label={'Постоплата'}
      />
    </FormGroup>
  );
};

export default Checkbox;
