import { Dialog, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { PageTitle } from 'components/Typography';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { mainBlue900, monoDarkBlack, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

import { Button, SecondaryButton } from '../../../../../components/Button';

const useStyles = makeStyles()((theme) => ({
  text: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    color: monoGrey,
    lineHeight: '117%',
  },
  downloadIcon: {
    fontSize: theme.typography.pxToRem(15),
    color: mainBlue900,
    marginRight: '8px',
  },
}));

const ProductsHeader = (onCancel) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <Grid container alignItems={'center'} justifyContent="space-between">
      <Grid item>
        <PageTitle text="Управление товарами" />
      </Grid>
      <Grid item xs={5}>
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end" sx={{ height: '100%' }}>
          <Button extraSmall variant={'text'} onClick={(e) => setOpen(!open)}>
            <i className={cx('ui_download', classes.downloadIcon)}></i>
            Экспортировать таблицу
            <input type="file" hidden />
          </Button>
          <NextLink href={'/seller/products/create'}>
            <a>
              <Button extraSmall>Добавить товар</Button>
            </a>
          </NextLink>
        </Stack>
      </Grid>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 12 }}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <i className="ui_close" style={{ fontSize: 12 }}></i>
          </IconButton>
          <Stack spacing={2} display={'flex'} alignItems={'center'} mt={2}>
            <Typography sx={{ width: '100%', color: monoDarkBlack, fontWeight: 700, fontSize: 20, textAlign: 'left' }}>
              Экспортировать таблицу
            </Typography>
            <Typography
              sx={{
                width: '100%',
                marginTop: 8,
                color: monoDarkBlack,
                fontWeight: 500,
                fontSize: 14,
                textAlign: 'left',
              }}
            >
              Выберите формат для скачивания таблицы
            </Typography>
            <Stack display={'flex'} flexDirection={'row'} width={'100%'}>
              <Stack width={'100%'} pr={1}>
                <SecondaryButton fullWidth small>
                  Скачать PDF
                </SecondaryButton>
              </Stack>
              <Stack width={'100%'} pl={1}>
                <SecondaryButton fullWidth small>
                  Скачать XLS
                </SecondaryButton>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default ProductsHeader;
