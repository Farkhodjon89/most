import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { Button } from './Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-root': {
    padding: '24px 32px',
    borderRadius: '24px',
  },
}));

// const useStyles = makeStyles()((theme) => ({
//   iconClose: {},
// }));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            fontSize: '12px',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <i className="ui_close"></i>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<i className="ui_listMenu"></i>}>
        Выбрать колонки
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Выбрать колонки
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button>Сохранить</Button>
          <Button variant="outlined">Отмена</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
