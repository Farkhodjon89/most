import { Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';

const useStyles = makeStyles()((theme) => ({
  root: {},
}));

const AuthorizationModal = ({ open, handleClose }: any) => {
  const { classes } = useStyles();

  return (
    <Dialog classsName={classes.root} open={open} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>
          <Typography sx={{ fontWeight: 700, textAlign: 'center' }} variant={'h6'}>
            Для просмотра подробной информации о товаре и предложениях поставщиков необходимо войти или
            зарегистрироваться.
          </Typography>
        </DialogTitle>
        <Stack mt={2} spacing={2}>
          <NextLink href="/auth/login">
            <Button>Войти</Button>
          </NextLink>
          <NextLink href="/auth/register">
            <Button variant={'text'}>Зарегестрироваться</Button>
          </NextLink>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorizationModal;
