import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  FormControlLabel,
  Grid,
  InputAdornment,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { OutlinedTextField, TextField } from '../../../components/Textfield';
import Select from '../../../components/Select';
import { Button, ButtonText } from '../../../components/Button';
import React, { useState } from 'react';
import cx from 'classnames';

import { makeStyles } from 'tss-react/mui';
import { mainBlue300, mainBlue500, mainBlue600, mainBlue900 } from '../../../styles/colorPalette';
const useStyles = makeStyles()((theme) => ({
  filterIcon: {
    fontSize: '18px',
    color: mainBlue900,
    marginRight: '8px',
  },
  сollapseButton: {
    'width': 'fit-content',
    'display': 'flex',
    'justifyContent': 'center',
    'padding': '4px, 8px, 4px, 8px',
    'background': mainBlue300,
    'borderRadius': theme.spacing(1),

    '&:hover, &:focus': {
      background: mainBlue500,
      boxShadow: 'none',
    },
    '&:active': {
      background: mainBlue600,
    },
    '& .MuiSwitch-root': {
      display: 'none',
    },
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      color: mainBlue900,
      fontWeight: 600,
    },
  },
  imputFirst: {
    '& .MuiInputBase-root ': {
      borderRadius: ' 12px 0px 0px 12px ',
    },
    '.MuiOutlinedInput-input': {
      padding: theme.spacing(1, 2),
      height: '1.5em',
    },

    '& .MuiInputLabel-root': {
      'transform': 'translate(14px, -8px) scale(0.75)',
      'fontSize': 14,
      '&.Mui-focused': {
        transform: 'translate(14px, -8px) scale(0.75)',
      },
    },
  },
  imputSecond: {
    '& .MuiInputBase-root ': {
      borderRadius: ' 0px 12px 12px 0px ',
    },
    '.MuiOutlinedInput-input': {
      padding: theme.spacing(1, 2),
      height: '1.5em',
    },

    '& .MuiInputLabel-root': {
      'transform': 'translate(14px, -8px) scale(0.75)',
      'fontSize': 14,
      '&.Mui-focused': {},
    },
  },
}));

const CollapseExample = () => {
  const { classes } = useStyles();
  const [addressFact, setAddressFact] = useState({ value: '', isValid: true, message: '' });
  const [selectedValue, setSelectedValue] = useState(0);
  //======Code Input end=====//

  //======Select =====//
  const [selected, setSelected] = useState('');
  //======Select end=====//
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Сollapse</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>
          <Grid item xs={4} className={classes.сollapseButton} mr={2}>
            <i className={cx('ui_filter-funnel', classes.filterIcon)}></i>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Показать фильтры"
              className={cx(classes.filterIcon)}
            />
          </Grid>
          <Collapse in={checked}>
            <Grid container spacing={2} ml={'1px'} pr={2} mt={1}>
              <Grid item xs={4}>
                <TextField
                  label={'Артикул'}
                  size={'extraSmall'}
                  value={addressFact.value}
                  error={!addressFact.isValid}
                  helperText={addressFact.message}
                  onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                />
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Отрасль'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={2}>
                {/*@ts-ignore*/}
                <Select
                  label={'Ед. измерения поставки'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={2}>
                {/*@ts-ignore*/}
                <Select
                  label={'Мин. объем поставки'}
                  value={selected}
                  size={'extraSmall'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label={'Название'}
                  value={addressFact.value}
                  size={'extraSmall'}
                  error={!addressFact.isValid}
                  helperText={addressFact.message}
                  onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                />
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Категория'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={2}>
                {/*@ts-ignore*/}
                <Select
                  label={'Применяемая скидка'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={2}>
                {/*@ts-ignore*/}
                <Select
                  label={'Применяемая наценка'}
                  value={selected}
                  size={'extraSmall'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Статус'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Подкатегория'}
                  size={'extraSmall'}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Stack direction="row" alignItems={'center'} display={'flex'}>
                  <OutlinedTextField
                    className={classes.imputFirst}
                    size={'extraSmall'}
                    label={'Стоимость'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography fontSize={14}>От</Typography>
                        </InputAdornment>
                      ),
                    }}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) =>
                      setAddressFact({
                        value: e.target.value,
                        isValid: true,
                        message: '',
                      })
                    }
                  />
                  <OutlinedTextField
                    size={'extraSmall'}
                    className={classes.imputSecond}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography fontSize={14}>До</Typography>
                        </InputAdornment>
                      ),
                    }}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) =>
                      setAddressFact({
                        value: e.target.value,
                        isValid: true,
                        message: '',
                      })
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Страна производитель'}
                  value={selected}
                  size={'extraSmall'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Select
                  label={'Группа товаров'}
                  value={selected}
                  size={'extraSmall'}
                  onChange={(e) => setSelected(e.target.value as string)}
                  options={[
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                  ]}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                {/*@ts-ignore*/}
                <Stack direction="row" alignItems={'center'} display={'flex'}>
                  <OutlinedTextField
                    className={classes.imputFirst}
                    size={'extraSmall'}
                    label={'Срок отгрузки'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography fontSize={14}>От</Typography>
                        </InputAdornment>
                      ),
                    }}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) =>
                      setAddressFact({
                        value: e.target.value,
                        isValid: true,
                        message: '',
                      })
                    }
                  />
                  <OutlinedTextField
                    size={'extraSmall'}
                    className={classes.imputSecond}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography fontSize={14}>До</Typography>
                        </InputAdornment>
                      ),
                    }}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) =>
                      setAddressFact({
                        value: e.target.value,
                        isValid: true,
                        message: '',
                      })
                    }
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Grid spacing={2} container>
                  <Grid item>
                    <Button extraSmall>Применить </Button>
                  </Grid>
                  <Grid item>
                    <ButtonText>Скрыть фильтры</ButtonText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseExample;
