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

type PageTitleProps = MuiTypographyProps & {
  text: string;
  component?: ElementType;
};

export const PageTitle: FC<PageTitleProps> = ({ text, component = 'h1' }) => {
  const { classes } = useStyles();
  return (
    <Typography className={classes.pageTitle} component={component}>
      {text}
    </Typography>
  );
};

type TextProps = MuiTypographyProps & {
  children: ReactNode;
};

export const SmallGrayDescr: FC<TextProps> = ({ children }) => {
  const { classes } = useStyles();
  return <Typography className={classes.smallGrayDescr}>{children}</Typography>;
};

export const FormTitle: FC<TypographyProps & { optional?: boolean }> = (props) => {
  const { optional, ...rest } = props;
  return (
    <Typography sx={{ fontWeight: 700, fontSize: 14, color: monoDarkBlack, mb: 1 }}>
      {rest.children}
      {optional && (
        <Typography component="span" sx={{ color: monoGrey, fontWeight: 500, fontSize: 12 }}>
          {' '}
          (Опционально)
        </Typography>
      )}
    </Typography>
  );
};
