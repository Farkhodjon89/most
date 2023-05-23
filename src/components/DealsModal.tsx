import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { makeStyles } from 'tss-react/mui';

import { monoBgGrey, monoDarkBlack, monoGrey } from '../styles/colorPalette';
import { Button } from './Button';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiDialogActions-root': {
      '& .MuiButtonBase-root:first-child': {
        display: 'block',
      },
      '& .MuiButton-root': {
        'border': 'none',
        '&:hover': {
          backgroundColor: monoBgGrey,
        },
      },
    },
    '& .MuiDialog-paper': {
      borderRadius: '24px',
    },
    '& .MuiDialogTitle-root': {
      padding: '0',
      paddingBottom: '24px',
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: '24px',
    fontWeight: 700,
    color: monoDarkBlack,
    cursor: 'pointer',
  },
  closeIcon: {
    fontSize: theme.typography.pxToRem(12),
    color: monoGrey,
    cursor: 'pointer',
  },
}));

const DealsModal = ({ open, handleAddProducts, handleClose, title, children, added }: any) => {
  const { classes } = useStyles();
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} className={classes.root}>
      <DialogContent sx={{ width: '100%' }} dividers>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography className={classes.title} variant={'h4'}>
            {title}
          </Typography>
          <i onClick={handleClose} className={cx('ui_close', classes.closeIcon)}></i>
        </DialogTitle>
        {/*<Divider />*/}
        {children}
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Stack direction={'row'} spacing={1}>
              <Button onClick={handleClose} small variant={'text'}>
                Отменить
              </Button>
              <Button onClick={handleAddProducts} small>
                Добавить ({added.length})
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DealsModal;
