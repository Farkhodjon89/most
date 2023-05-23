import { Tooltip as DefaultTooltip, TooltipProps } from '@mui/material';
import { FC } from 'react';
import { mainBlue900 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  arrow: {
    color: mainBlue900,
  },
  tooltip: {
    backgroundColor: mainBlue900,
    color: 'white',
    borderRadius: theme.spacing(1),
    boxShadow: `0px 16px 24px rgba(0, 0, 0, 0.16)`,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '14px',
    padding: '8px 16px',
  },
}));

const Tooltip: FC<TooltipProps> = (props) => {
  const { classes, ...rest } = props;
  const { classes: stylesClasses } = useStyles();

  return <DefaultTooltip classes={{ ...stylesClasses, ...classes }} {...rest} />;
};

export default Tooltip;
