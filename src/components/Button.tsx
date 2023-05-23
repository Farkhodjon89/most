import { CircularProgress, Stack, ToggleButton as DefaultToggleButton, ToggleButtonGroup } from '@mui/material';
// eslint-disable-next-line import/named
import DefaultButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import cx from 'classnames';
import { FC, forwardRef } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  mainBlue300,
  mainBlue500,
  mainBlue600,
  mainBlue700,
  mainBlue800,
  mainBlue900,
  monoDarkBlack,
  monoGrey,
  monoLightGrey1,
  monoLightGrey2,
  monoWhite,
} from '../styles/colorPalette';

const useStyles = makeStyles<{ small: boolean; extraSmall: boolean; color: string }>()(
  (theme, { small, extraSmall, color }) => {
    let rootPadding = theme.spacing(1.75, 4);
    let rootFontSize = theme.typography.pxToRem(16);
    let rootBorderRadius = 12;
    let rootColor = mainBlue900;
    let rootBorder = mainBlue900;
    if (small) {
      rootPadding = theme.spacing(1.25, 2);
    }
    if (extraSmall) {
      rootPadding = theme.spacing(0.97, 1);
      rootFontSize = theme.typography.pxToRem(14);
      rootBorderRadius = 8;
    }
    if (color) {
      rootColor = monoDarkBlack;
      rootBorder = monoLightGrey1;
    }
    return {
      root: {
        'borderRadius': rootBorderRadius,
        'fontSize': rootFontSize,
        'padding': rootPadding,
        'whiteSpace': 'nowrap',
        // 'height': small ? 44 : 56,
        'minWidth': '150px',
        // 'fontWeight': 500,
        '&.Mui-disabled': {
          backgroundColor: monoLightGrey2,
          color: monoGrey,
        },
      },
      startIcon: {
        '> i': {
          fontSize: '16px !important',
        },
      },
      endIcon: {
        fontSize: '16px !important',
      },
      contained: {
        'background': mainBlue900,
        '&:hover, &:focus': {
          background: mainBlue800,
          boxShadow: 'none',
        },
        '&:active': {
          background: mainBlue600,
        },
      },
      outlined: {
        'border': `1px solid ${rootBorder}`,
        'color': rootColor,
        '&:hover, &:focus': {
          background: 'transparent',
          border: `1px solid ${rootColor}`,
          boxShadow: 'none',
        },
        '&:active': {
          color: rootColor,
        },
      },
      text: {
        'color': mainBlue900,
        '&:hover, &:focus': {
          background: mainBlue300,
          boxShadow: 'none',
        },
        '&:active': {
          color: mainBlue600,
        },
      },
    };
  },
);

const useSecondaryStyles = makeStyles<{ small: boolean; extraSmall: boolean; fullWidth: boolean }>()(
  (theme, { small, extraSmall, fullWidth }) => {
    let rootPadding = theme.spacing(1.75, 4);
    let rootFontSize = theme.typography.pxToRem(16);
    let rootBorderRadius = 12;
    if (small) {
      rootPadding = theme.spacing(1, 2);
    }

    if (extraSmall) {
      rootPadding = theme.spacing(1, 1);
      rootFontSize = theme.typography.pxToRem(14);
      rootBorderRadius = 8;
    }
    return {
      root: {
        'width': fullWidth ? '100%' : 'fit-content',
        'borderRadius': rootBorderRadius,
        'fontSize': rootFontSize,
        'padding': rootPadding,
        'whiteSpace': 'nowrap',
        // 'height': small ? 44 : 56,
        'minWidth': '150px',
        // 'fontWeight': 600,
        'color': mainBlue900,
        '&.Mui-disabled': {
          backgroundColor: monoLightGrey2,
          color: monoGrey,
        },
      },
      startIcon: {
        '> i': {
          fontSize: '16px !important',
        },
      },
      endIcon: {
        fontSize: '16px !important',
      },
      contained: {
        'background': mainBlue300,
        '&:hover, &:focus': {
          background: mainBlue500,
          boxShadow: 'none',
        },
        '&:active': {
          background: mainBlue600,
        },
      },
    };
  },
);

const useButtonTexStyle = makeStyles()((theme) => ({
  root: {
    'width': 'fit-content',
    'color': mainBlue900,
    'fontSize': theme.typography.pxToRem(14),
    // 'fontWeight': 500,
    // 'padding': 0,
    '&:hover': {
      backgroundColor: 'unset',
      color: mainBlue700,
    },
    '&:focus': {
      backgroundColor: 'unset',
      color: mainBlue700,
    },
    '&:active': {
      backgroundColor: 'unset',
      color: mainBlue600,
    },
  },
}));

const useToggleButtonStyles = makeStyles()((theme) => ({
  root: {
    'borderRadius': '8px',
    'border': `1px solid ${monoLightGrey2}`,
    'backgroundColor': monoWhite,

    '& .MuiToggleButton-root': {
      border: 'none',
    },
  },
  appIcon: {
    color: mainBlue900,
  },
  equalsIcon: {
    color: mainBlue900,
  },
}));

type ButtonProps = MuiButtonProps & {
  small?: boolean;
  extraSmall?: boolean;
  loading?: boolean;
};

// export const Button: FC<ButtonProps> = (props) => {
//   const { variant = 'contained', small = false, loading, ...rest } = props;
//   const { classes } = useStyles({ small });
//   return (
//     <DefaultButton classes={classes} variant={variant} disableRipple {...rest}>
//       {loading ? <CircularProgress size={24} /> : props.children}
//     </DefaultButton>
//   );
// };

export const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  const { variant = 'contained', small = false, extraSmall = false, color = ``, loading, ...rest } = props;
  console.log(loading);
  const { classes } = useStyles({ small, extraSmall, color });
  return (
    <DefaultButton classes={classes} variant={variant} disableRipple {...rest}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </DefaultButton>
  );
});

export const SecondaryButton: FC<ButtonProps> = (props) => {
  const { variant = 'contained', small = false, extraSmall = false, loading, fullWidth = false, ...rest } = props;
  const { classes } = useSecondaryStyles({ small, fullWidth, extraSmall });
  return (
    <DefaultButton size={'small'} classes={classes} variant={variant} disableRipple {...rest}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </DefaultButton>
  );
};

export const ButtonText: FC<ButtonProps> = (props) => {
  const { variant = 'text', loading, ...rest } = props;
  const { classes } = useButtonTexStyle();
  return (
    <DefaultButton classes={classes} variant={variant} disableRipple {...rest}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </DefaultButton>
  );
};

export const ToggleButton = ({ setViewType, viewType }: any) => {
  const { classes } = useToggleButtonStyles();
  return (
    <Stack direction={'row'} display={'flex'} alignItems={'center'}>
      <ToggleButtonGroup className={classes.root} size="small">
        <DefaultToggleButton onClick={() => setViewType('products')} value={'products'}>
          <i className={viewType === 'products' ? cx('ui_app-filled', classes.appIcon) : 'ui_app-filled'}></i>
        </DefaultToggleButton>
        <DefaultToggleButton value={'table'} onClick={() => setViewType('table')}>
          <i className={viewType === 'table' ? cx('ui_equals-filled', classes.equalsIcon) : 'ui_equals-filled'}></i>
        </DefaultToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
