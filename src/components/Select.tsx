import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import DefaultSelect from '@mui/material/Select';
// eslint-disable-next-line import/named
import { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue400, mainBlue900, monoDarkBlack, monoDarkGrey, monoLightGrey1 } from '../styles/colorPalette';
import ChevronDown from './icons/ChevronDown';

// @ts-ignore
const useStyles = makeStyles<{ size?: string }>()((theme, { size }) => {
  // input: {
  //   padding: size === 'small' ? '21px 12px 4px 12px' : '25px 12px 8px 12px',
  // },
  // }));
  if (size === 'extraSmall') {
    return {
      root: {
        //.MuiOutlinedInput-root

        '.MuiOutlinedInput-input': {
          padding: size === 'extraSmall' ? theme.spacing(1.001, 2) : 'inherit',
          height: size === 'extraSmall' ? '1.5em' : 'inherit',
        },
        '&.Mui-disabled': {
          '& .MuiSelect-icon': {
            display: 'none',
          },
        },
      },
    };
  }
  return {
    root: {
      // 'borderRadius': theme.spacing(1),
      // 'color': monoDarkBlack,
      'borderRadius': 12,
      'color': monoDarkBlack,
      // 'backgroundColor': monoBgGrey,
      // 'border': `1px solid red`,
      // ':hover': {
      //   // border: `1px solid ${mainBlue900}`,
      //   backgroundColor: monoBgGrey,
      // },
      '.MuiSelect-select': {
        '&:focus': {
          borderRadius: `${theme.spacing(1)} !important`,
          // backgroundColor: `${monoBgGrey} !important`,
        },
      },
      '&.Mui-disabled': {
        '& .MuiSelect-icon': {
          display: 'none',
        },
      },
    },

    input: {
      padding: `16.5px 14px`,
    },
    inputSizeSmall: {
      padding: '12.5px 14px',
    },

    notchedOutline: {
      borderRadius: theme.spacing(1),
      borderColor: `#E0E0E5 !important`,
      transition: '0.3s',
    },
  };
});
// &::-webkit-scrollbar {
//   width: 4px;
// }
//
// '&::-webkit-scrollbar-track': {
//   background: monoLightGrey1;
//   border-radius: 10;
// }
//

const useMenuStyles = makeStyles()((theme) => ({
  root: {},
  paper: {
    'maxHeight': 200,
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: monoLightGrey1,
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: monoDarkGrey,
      borderRadius: 10,
    },
  },

  list: {
    'padding': theme.spacing(0.5),
    '.MuiMenuItem-root': {
      'borderRadius': theme.spacing(1),
      ':hover': {
        color: mainBlue900,
        backgroundColor: mainBlue400,
      },
    },
    '.Mui-focusVisible': {
      color: mainBlue900,
      backgroundColor: `${mainBlue400} !important`,
    },
    '.Mui-selected': {
      color: mainBlue900,
      backgroundColor: `${mainBlue400} !important`,
    },
  },
}));
const useLabelStyles = makeStyles<{ size?: string }>()((theme, { size }) => {
  if (size === 'extraSmall') {
    return {
      root: {
        'transform': 'translate(14px, 11px)',
        'fontSize': 14,
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -8px) scale(0.75)',
        },
      },
    };
  }

  if (size === 'small') {
    return {
      root: {
        'transform': 'translate(14px, 10px)',
        'fontSize': 16,
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -8px) scale(0.75)',
        },
      },
    };
  }
  return {
    root: {
      'transform': 'translate(14px, 17px)',
      'fontSize': 16,
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
  };
});
const useSelectSX = makeStyles<{ size?: string }>()((theme, { size }) => {
  let topIcon = 25;
  if (size === 'extraSmall') {
    topIcon = 17;
  }
  if (size === 'small') {
    topIcon = 20;
  }
  return { root: { '& .MuiSelect-icon': { top: topIcon, width: 12, right: 16 } } };
});

/**
 * Дефолтное значение всегда должно быть равно null
 * @param props
 * @constructor
 */
export const Select: FC<any> = (props) => {
  const { label, options, placeholder = 'Не выбрано', size = 'medium', error, helperText, ...rest } = props;
  const { classes } = useStyles({ size });
  const menuStyles = useMenuStyles();
  const labelStyles = useLabelStyles({ size });
  const selectSX = useSelectSX({ size });
  return (
    <FormControl variant="outlined" fullWidth size={size} error={error}>
      <InputLabel className={labelStyles.classes.root}>{label}</InputLabel>
      <DefaultSelect
        MenuProps={{
          classes: menuStyles.classes,
          PaperProps: {
            style: {
              borderRadius: 12,
              boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.08)',
            },
          },
        }}
        input={<OutlinedInput label={label} classes={classes} fullWidth />}
        className={selectSX.classes.root}
        IconComponent={ChevronDown}
        {...rest}
      >
        {/* <MenuItem value={''}>
          <Typography component={'em'} sx={{ color: monoGrey }}>
            {placeholder}
          </Typography>
        </MenuItem> */}
        {options?.map((item, key) => (
          <MenuItem key={key} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </DefaultSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Select;
