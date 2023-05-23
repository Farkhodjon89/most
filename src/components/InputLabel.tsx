import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';
import { monoBlack, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  label: {
    'color': monoGrey,
    'fontSize': theme.typography.pxToRem(14),
    'fontWeight': 600,
    'marginBottom': theme.spacing(0.5),
    '& span': {
      fontSize: theme.typography.pxToRem(12),
      color: monoBlack,
    },
  },
}));

//todo по мне название компонента не соответствует своему предназначению, мб лучше FormTitle??? рассмотреть
const InputLabel: FC<TypographyProps> = ({ children, ...rest }) => {
  const { classes } = useStyles();
  return (
    <Typography className={classes.label} {...rest}>
      {children}
    </Typography>
  );
};

export default InputLabel;
