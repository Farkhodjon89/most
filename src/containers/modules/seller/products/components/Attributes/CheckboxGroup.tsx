import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import CheckboxIcon from 'components/icons/CheckboxIcon';
import CheckboxIconActive from 'components/icons/CheckboxIconActive';
import React, { useEffect, useState } from 'react';

import { useStyles } from '../../style';

const CheckboxGroupAttribute = ({ item, onChange, options, readOnlyMode, isRequired = false }) => {
  const { classes } = useStyles();
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    setSelectedValues([...item.value]);
  }, [item.value]);
  //Проверка делать активной кнопку Удалить все или нет
  const isDisabled = () => {
    let dis = true;
    options?.map((itemItem) => {
      if (selectedValues.some((d) => d === itemItem.id)) {
        dis = false;
      }
    });
    if (readOnlyMode) {
      dis = true;
    }
    return dis;
  };

  const handleChange = (e) => {
    let valuesArr = [...selectedValues];
    const found = valuesArr.some((value) => value === parseInt(e.target.value));
    if (found) {
      valuesArr = valuesArr.filter((value) => value !== parseInt(e.target.value));
    } else {
      valuesArr.push(parseInt(e.target.value));
    }

    setSelectedValues(valuesArr.map((value) => parseInt(value)));
    onChange(
      item,
      valuesArr.filter((value) => !isNaN(value)).map((value) => parseInt(value)),
    );
  };

  const handleDeleteAll = () => {
    onChange(item, []);
    setSelectedValues([]);
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Grid container columnSpacing={2} justifyContent="space-between" alignItems={'center'}>
          <Grid item>
            <Typography variant="h4" className={classes.TitleMain}>
              {item.name}
              {isRequired && '*'} <span className={classes.SmallTitleText}>(несколько параметров)</span>
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text" className={classes.textBtn} disabled={isDisabled()} onClick={handleDeleteAll}>
              Сбросить
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          {options?.map((variant, key) => (
            <Grid item xs={4} key={key} className={classes.RadioLabelMain}>
              <FormControlLabel
                value={variant.id}
                onClick={handleChange}
                control={
                  <Checkbox
                    disableRipple
                    icon={<CheckboxIcon size={20} />}
                    checkedIcon={<CheckboxIconActive size={20} />}
                    checked={selectedValues.includes(variant.id)}
                    // onChange={handleCheckbox}
                    // name="checkboxDate"
                  />
                }
                label={variant.name}
              />
            </Grid>
          ))}
          {/*<Grid item xs={4} className={classes.RadioLabelMain}>*/}
          {/*  <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">*/}
          {/*    */}
          {/*    <FormControlLabel value="male" control={<Radio />} label="Ноутбуки" />*/}
          {/*    <FormControlLabel value="other" control={<Radio />} label="Компьютеры и перферия" />*/}
          {/*    <FormControlLabel value="disabled" control={<Radio />} label="Наушники" />*/}
          {/*    <FormControlLabel value="disabled" control={<Radio />} label="Прямой производитель" />*/}
          {/*  </RadioGroup>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={4} className={classes.RadioLabelMain}>*/}
          {/*  <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">*/}
          {/*    <FormControlLabel value="female" control={<Radio />} label="Сухое зерно" />*/}
          {/*    <FormControlLabel value="male" control={<Radio />} label="Электроника" />*/}
          {/*    <FormControlLabel value="other" control={<Radio />} label="Электронные товары для дома" />*/}
          {/*    <FormControlLabel value="disabled" disabled control={<Radio />} label="Сухие смеси" />*/}
          {/*    <FormControlLabel value="disabled" disabled control={<Radio />} label="Краски" />*/}
          {/*  </RadioGroup>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={4} className={classes.RadioLabelMain}>*/}
          {/*  <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">*/}
          {/*    <FormControlLabel value="female" control={<Radio />} label="Товары для кухни и столовой" />*/}
          {/*    <FormControlLabel value="male" control={<Radio />} label="Столовые приборы" />*/}
          {/*    <FormControlLabel value="other" control={<Radio />} label="Устройство комнаты" />*/}
          {/*    <FormControlLabel value="disabled" disabled control={<Radio />} label="Умный дом" />*/}
          {/*    <FormControlLabel value="disabled" disabled control={<Radio />} label="Зарубежные товары" />*/}
          {/*  </RadioGroup>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckboxGroupAttribute;
