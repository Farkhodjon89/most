import { Accordion, AccordionDetails, AccordionSummary, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { InputSelector, OutlinedTextField, PasswordTextField, TextField } from '../../../components/Textfield';
import { monoDarkGrey, monoLightGrey1 } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  paper: {
    'maxHeight': 200,
    '&::-webkit-scrollbar': {
      width: 4,
    },
    'borderRadius': theme.spacing(2),
    'boxShadow': '0px 6px 20px rgba(0, 0, 0, 0.08)',
    '&::-webkit-scrollbar-track': {
      background: monoLightGrey1,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: monoDarkGrey,
      borderRadius: 10,
    },
  },
}));

export const Inputs = () => {
  const [addressFact, setAddressFact] = useState({ value: '', isValid: true, message: '' });
  const [selectedValue, setSelectedValue] = useState(0);
  return (
    <Grid item xs={12}>
      <Grid container rowSpacing={2}>
        <Accordion>
          <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
            <Grid item xs={12}>
              <Typography variant="h5">Inputs</Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label={'Фактический адрес'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Фактический адрес'}
                    value={addressFact.value}
                    error={true}
                    helperText={'Поле обязательно для заполнения'}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Фактический адрес (Опционально)'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <PasswordTextField fullWidth label="Password input" />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Инпут с маленьким размером'}
                    size={'small'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Инпут с самым маленьким размером'}
                    size={'extraSmall'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row" alignItems={'center'} display={'flex'} spacing={2}>
                    <OutlinedTextField
                      size={'small'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography>От</Typography>
                          </InputAdornment>
                        ),
                      }}
                      value={addressFact.value}
                      error={!addressFact.isValid}
                      helperText={addressFact.message}
                      onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                    />
                    <Typography> - </Typography>
                    <OutlinedTextField
                      size={'small'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography>До</Typography>
                          </InputAdornment>
                        ),
                      }}
                      value={addressFact.value}
                      error={!addressFact.isValid}
                      helperText={addressFact.message}
                      onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Срок отгрузки'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                    size={'small'}
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
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={'Стоимость единицы поставки*'}
                    value={addressFact.value}
                    error={!addressFact.isValid}
                    helperText={addressFact.message}
                    onChange={(e) => setAddressFact({ value: e.target.value, isValid: true, message: '' })}
                    size={'small'}
                    InputProps={{
                      endAdornment: (
                        <InputSelector
                          selectedValue={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          options={[
                            {
                              value: 0,
                              label: '₽',
                            },
                            {
                              value: 1,
                              label: '$',
                            },
                            { value: 2, label: '€' },
                          ]}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
