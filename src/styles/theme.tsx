import { createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';

import { blue, mainBlue700, mainBlue900, mainRed900, monoBgGrey, monoDarkBlack, monoGrey } from './colorPalette';

const breakpoints = createBreakpoints({});

// declare module '@mui/styles/defaultTheme' {
//   // @ts-ignore
//   type DefaultTheme = Theme;
// }

/**
 * All future global styles, and mui component overrides should be implemented there
 */
// Все стили оверрайда, закомиченные внизу, остались от версии mui4 и не встают в mui5. Надо читать доку и дорабатывать эти стили.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#419CF9',
      dark: '#003B77',
    },
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeightRegular: 500,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            textDecoration: 'none !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       '& .Mui-disabled': {
    //         '& fieldset': {
    //           border: 'none',
    //         },
    //       },
    //     },
    //     input: {
    //       'paddingBottom': 10,
    //       '&:-webkit-autofill': {
    //         backgroundColor: 'unset',
    //         WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
    //       },
    //     },
    //   },
    // },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          'fontWeight': 400,
          '&.Mui-error': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          '&.Mui-disabled': {
            color: monoDarkBlack,
            fontWeight: 600,
          },
        },
        filled: {
          color: monoGrey,
        },
        sizeSmall: {
          top: 4,
        },
        outlined: {
          'color': blue,
          '&.Mui-error': {
            color: mainRed900,
          },
          '&.Mui-focused': {
            color: blue,
          },
          // transform: 'translate(27px, 25px) scale(1)',
          // [breakpoints.down('xs')]: {
          //   transform: 'translate(22px, 19px) scale(1)',
          // },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // '& .Mui-disabled': {
          //   backgroundColor: monoBgGrey,
          //   border: 'none',
          //   // minHeight: 60
          // },
        },
        // input: {
        //   'color': monoDarkBlack,
        //   'paddingRight': 20,
        //   '&:-webkit-autofill': {
        //     WebkitBoxShadow: 'inset 0 0 0 1000px #fff inset !important',
        //   },
        // },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          'backgroundColor': '#F5F5F7',
          'borderRadius': 12,
          'color': monoGrey,
          '&.Mui-error': {
            // backgroundColor: mainRed400,
            input: {
              color: mainRed900,
            },
          },
        },
        input: {
          '&:-webkit-autofill': {
            // 'backgroundColor': 'unset',
            // 'WebkitBoxShadow': `0 0 0 1000px #F5F5F7 inset !important`,
            // '&:hover': {
            //   WebkitBoxShadow: `0 0 0 1000px #F5F5F7 inset !important`,
            // },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& $notchedOutline': {
            borderColor: 'green',
          },
          // 'transition': '0.3s',

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${mainBlue900} !important`,
            // boxShadow: `0px 0px 5px 3px rgba(86, 86, 255, 0.2)`,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            border: `1px solid #E0E0E5 !important`,
            // boxShadow: 'none !important',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${monoGrey} !important`,
            // boxShadow: 'none !important',
          },
          // 'backgroundColor': monoBgGreyLight,
          // 'borderColor': '#E0E0E5',
          'borderRadius': 12,
          'color': monoDarkBlack,
          'fontWeight': 400,
          '&.Mui-error': {
            // backgroundColor: mainRed400,
            input: {
              color: `${mainRed900} !important`,
              WebkitTextFillColor: mainRed900,
            },
          },
        },
        notchedOutline: {
          borderColor: `#E0E0E5 !important`,
          transition: '0.3s',
        },
        inputSizeSmall: {
          padding: '12.5px 14px',
        },
        input: {
          '&:-webkit-autofill': {
            'backgroundColor': 'unset',
            'WebkitBoxShadow': `0 0 0 1000px white inset !important`,
            '&:hover': {
              WebkitBoxShadow: `0 0 0 1000px white inset !important`,
            },
          },
          '&:-internal-autofill-selected': {
            color: 'red !important',
          },
        },
      },
    },
    // MuiFormLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: 'red',
    //       fontSize: '16px',
    //     },
    //   },
    // },
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& .MuiButton-label': {
            color: 'red',
            padding: '5px 15px',
            transition: 'all 0.5s',
          },
          '& .MuiButton-root': {
            border: `1px solid red`,
            margin: 10,
            transition: 'all 0.5s',
          },
          '& .MuiButtonBase-root:first-child': {
            display: 'none',
          },
          '& .MuiButton-textPrimary:hover': {
            'backgroundColor': 'red',
            '& .MuiButton-label': {
              color: '#fff',
            },
          },
          'padding': '4px 0px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          color: '#000',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          'paddingLeft': '14px',
          'fontSize': '9px',
          '&.Mui-error': {
            color: monoGrey,
            fontSize: 12,
            marginLeft: 0,
            lineHeight: '110%',
            [breakpoints.down('xs')]: {
              position: 'relative',
              bottom: 'unset',
            },
          },
          [breakpoints.down('xs')]: {
            fontSize: '12px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    // MuiCssBaseline: {
    //   styleOverrides: `
    //       a {
    //         color: red;
    //         text-decoration: none;
    //       },
    //       html {
    //         height: "100%";
    //       },
    //       body {
    //         min-height: 100%;
    //         background-color: #fff;
    //       },
    //   `,
    // },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: 1300,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          'marginLeft': 0,
          'fontWeight': 500,
          '&:hover': {
            color: mainBlue700,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: mainBlue900,
          },
        },
        colorPrimary: {
          color: monoGrey,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          'borderRadius': 8,
          ':hover': {
            color: mainBlue900,
            backgroundColor: monoBgGrey,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          'padding': 4,
          '&.Mui-checked': {
            color: mainBlue900,
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
        colorPrimary: {
          color: monoGrey,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: mainRed900,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          width: 534,
        },
      },
    },
  },
});

export default theme;
