import { Popover as DefaultPopover } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
    padding: '12px 16px',
  },
}));

const Popover = ({ children, openedPopover, popoverAnchor, popoverLeave, popoverEnter, id }: any) => {
  const { classes } = useStyles();

  return (
    <DefaultPopover
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      className={classes.popover}
      classes={{
        paper: classes.popoverContent,
      }}
      PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      anchorEl={popoverAnchor.current}
      open={openedPopover === id}
    >
      {children}
    </DefaultPopover>
  );
};

export default Popover;
