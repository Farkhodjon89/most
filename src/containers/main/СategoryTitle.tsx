import { Typography, TypographyProps } from '@mui/material';
// eslint-disable-next-line import/named
import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { ElementType, FC, ReactNode } from 'react';
import { monoDarkBlack, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  pageTitle: {
    fontSize: theme.typography.pxToRem(24),
    lineHeight: '133%',
  },
  smallGrayDescr: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(12),
  },
}));

type СategoryTitleProps = MuiTypographyProps & {
  text: string;
  component?: ElementType;
};

export const СategoryTitle: FC<СategoryTitleProps> = ({ text, component = 'h2' }) => {
  const { classes } = useStyles();
  return (
    <Typography className={classes.pageTitle} component={component}>
      {text}
    </Typography>
  );
};
