import { tooltipClasses } from '@mui/material/Tooltip';
import {
  mainBlue300,
  mainBlue500,
  mainBlue900,
  mainRed800,
  mainRed900,
  monoGrey,
  monoLightGrey1,
} from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  categorItem: {
    display: 'flex',
  },
  categoryText: {
    fontSize: 14,
    marginRight: theme.spacing(2),
    color: '#0F0F1A',
  },
  categoryTitle: {
    fontSize: 14,
    marginRight: theme.spacing(1),
    color: '#9A9AA0',
  },
  categorWrapp: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  Title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: '24px',
    color: '#0F0F1A',
    // marginBottom: theme.spacing(3),
  },
  InfoTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: '24px',
    color: '#0F0F1A',
  },
  InfoTextt: {
    fontSize: 14,
    color: '#0F0F1A',
  },
  InfoWrapp: {
    marginTop: theme.spacing(1),
  },
  TextEditorTitle: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#9A9AA0',
  },
  formGroup: {
    '& .MuiRadio-root': {
      'padding': theme.spacing(1),
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    '& .MuiFormControlLabel-root': {
      transition: 'all 0.3s',
      border: `1px solid ${mainBlue500}`,
      borderRadius: 8,
      paddingRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: 0,
      marginRight: theme.spacing(1),
      userSelect: 'none',
    },
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'raleway-med',
    },
  },
  selectPle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: '20px',
    color: '#9A9AA0',
  },
  labelText: {
    'display': 'block',
    '> span': {
      padding: '4px',
    },
  },
  labelTextMain: {
    '& .MuiFormControlLabel-label.MuiFormControlLabel-label': {
      fontSize: 16,
    },
    '& .MuiFormControlLabel-root': {
      height: '48px',
    },
    '& label': {
      height: '100%',
      width: '100%',
      backgroundColor: '#F9F9F9',
      fontSize: 16,
      margin: '0',
    },
  },
  TitleMain: {
    color: '#0F0F1A',
    fontWeight: '700',
    fontSize: 16,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  SmallTitleText: {
    color: '#9A9AA0',
    fontWeight: '600',
    fontSize: 14,
  },
  AddItem: {
    backgroundColor: '#F5F5F6',
    padding: '12px 16px 8px 16px',
    borderRadius: 12,
  },
  customDelete: {
    '&.Mui-disabled': {
      i: {
        color: monoGrey,
      },
    },
    '& i': {
      color: mainRed900,
      fontSize: 17,
    },
  },
  Num: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    color: '#FFFFFF',
    backgroundColor: monoLightGrey1,
    borderRadius: '10px',
  },
  RadioLabel: {
    '& .css-ca120p-MuiTypography-root': {
      fontSize: 12,
    },
  },
  RadioLabelMain: {
    '& .MuiTypography-root': {
      fontSize: 14,
      color: '#0F0F1A',
    },
  },
  customChevronDown: {
    transform: 'rotate(90deg)',
    img: {
      width: '15px',
      height: '15px',
    },
  },
  WrappTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greenText: {
    'display': 'flex',
    'fontStyle': 'normal',
    'fontWeight': '600',
    'fontSize': 14,
    'lineHeight': '20px',
    'color': '#0EBA80',
    ' &  i': {
      color: '#0EBA80',
      marginRight: theme.spacing(1),
      fontSize: 22,
    },
  },
  ButtonDelete: {
    'fontWeight': '600',
    'fontSize': 14,
    'lineHeight': '22px',
    'color': mainRed800,
    '&:hover': {
      color: mainRed900,
    },
  },
  paper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainerWrapper: {
    position: 'relative',
    maxWidth: '422px',
    background: '#FFFFFF',
    borderRadius: theme.spacing(3),
    padding: '24px 32px',
  },
  closeModal: {
    fontSize: '10px',
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
  CategoryWrapp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '8px',
  },
  CategoryElementWrapp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'row',
  },
  CategoryElement: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: '22px',
    color: mainBlue900,
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '5px 10px',
  },
  CategoryElementIcon: {
    fontSize: 7,
    lineHeight: '22px',
    color: '#BFBFFF',
    marginRight: '8px',
    marginLeft: '8px',
  },
  categoryTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
    },
  },
  iconBtn: {
    fontSize: 7,
  },
  textBtn: {
    'marginTop': theme.spacing(2.5),
    'color': mainBlue900,
    'fontWeight': 600,
    '&:hover': {
      backgroundColor: mainBlue300,
    },
  },
}));
