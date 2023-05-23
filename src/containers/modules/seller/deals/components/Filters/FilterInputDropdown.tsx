import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { InputSelector, TextField } from '../../../../../../components/Textfield';
import { black } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterRange = ({ title, onFilterChange, queryParams, minName, maxName, placeholder }: any) => {
  const { classes } = useStyles();
  const [timerID, setTimerID] = useState(null);
  const [addressFact, setAddressFact] = useState({ value: '', isValid: true, message: '' });
  const [selectedValue, setSelectedValue] = useState(0);
  // const formik = useFormik({
  //   // initialValues: {
  //   //   [minName]: queryParams[minName] || '',
  //   //   [maxName]: queryParams[maxName] || '',
  //   // },
  //   onSubmit: () => {
  //     //do nothing
  //   },
  // });

  return (
    <>
      <TextField
        // label={'Срок отгрузки'}
        placeholder={placeholder}
        value={addressFact.value}
        error={!addressFact.isValid}
        helperText={addressFact.message}
        onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
        size={'extraSmall'}
        InputProps={{
          endAdornment: (
            <InputSelector
              selectedValue={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                {
                  value: 0,
                  label: 'Дней',
                },
                {
                  value: 1,
                  label: 'Недель',
                },
                { value: 2, label: 'Месяцев' },
              ]}
            />
          ),
        }}
      />
    </>
  );
};

export default FilterRange;
