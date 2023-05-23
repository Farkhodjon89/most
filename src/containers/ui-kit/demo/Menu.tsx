import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import { Button, ButtonText } from '../../../components/Button';
import React, { useState } from 'react';
import cx from 'classnames';

import { makeStyles } from 'tss-react/mui';
import { mainBlue300, mainBlue500, mainBlue600, mainBlue900, monoDarkBlack } from '../../../styles/colorPalette';
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
  const [selectedValue, setSelectedValue] = useState(0);
  //======Code Input end=====//

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [options] = useState([
    { value: 1, label: 'Артикул' },
    { value: 2, label: 'Название' },
    { value: 3, label: 'Отрасль' },
    { value: 4, label: 'Категория' },
    { value: 5, label: 'Подкатегория' },
    { value: 6, label: 'Группа' },
    { value: 7, label: 'Единица измерения поставки' },
    { value: 8, label: 'Стоимость единицы измерения поставки' },
    { value: 9, label: 'Минимальный объем поставки' },
    { value: 10, label: 'Применяемая скидка, %' },
    { value: 11, label: 'Предоплата, %' },
    { value: 11, label: 'Страна производитель' },
    { value: 11, label: 'Срок отгрузки товара, дней' },
    { value: 11, label: 'Подкатегория' },
  ]);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Menu</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item xs={12}>
          <ButtonText extraSmall onClick={handleClick}>
            <i className={cx('ui_app', classes.filterIcon)}></i>Выбрать столбцы
          </ButtonText>
          <Menu
            // open={openMenu}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Stack>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    'borderBottom': '1px solid #E0E0E6',
                    'marginRight': 0,
                    'padding': '0px 16px 0px 16px',
                    '.MuiTypography-root ': { fontSize: ' 12px', color: monoDarkBlack, fontWeight: 700 },
                    '.MuiSvgIcon-root': { fontSize: 16 },
                  }}
                  control={<Checkbox />}
                  label="Выбрать все"
                />
              </FormGroup>
              {options.map((item, key) => (
                <FormGroup>
                  <MenuItem
                    key={key}
                    selected={selectedValue === item.value}
                    value={item.value}
                    // onClick={handleItemClick}
                    sx={{ padding: '0px 16px 0px 16px' }}
                  >
                    <FormControlLabel
                      sx={{
                        '.MuiTypography-root ': { fontSize: ' 12px', color: monoDarkBlack },
                        '.MuiSvgIcon-root': { fontSize: 16 },
                      }}
                      control={<Checkbox />}
                      label={item.label}
                    />
                    {/*{item.label}*/}
                  </MenuItem>
                </FormGroup>
              ))}
              <Stack padding={2}>
                <Button fullWidth extraSmall>
                  Применить
                </Button>
              </Stack>
            </Stack>
          </Menu>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseExample;
