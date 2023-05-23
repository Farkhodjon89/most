import { Box, Grid, Stack, Typography } from '@mui/material';
import { SecondaryButton } from 'components/Button';
import { useSession } from 'context/UserContext';
import { axiosClient } from 'pages/_app';
import React, { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { monoGrey, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  img: {
    'width': 80,
    'height': 80,
    'borderRadius': '50%',
    'overflow': 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  descr: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '117%',
  },
  logoContainer: {
    border: `1px solid ${monoLightGrey2}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

const AddLogo: FC<any> = ({ img, defaultImg = '/img/seller/logoCompanyNull.svg', onUpload, disabled = false }) => {
  const { classes } = useStyles();
  const { me } = useSession();
  const [loading, setLoading] = useState(false);

  const { getRootProps } = useDropzone({
    onDrop: (files, fileRejections) => {
      if (!loading) {
        if (fileRejections.length > 0) {
          if (fileRejections[0]?.errors[0]?.code === 'file-too-large') {
            toast.error(`Размер файла не должен превышать ${Math.round((1 * 1000 * 1000) / 1000 / 1000)}MB`);
          } else if (fileRejections[0]?.errors[0]?.code === 'file-invalid-type') {
            toast.error(`Неверный формат файла, допустимые форматы: .png, .jpeg', '.jpg`);
          } else {
            toast.error(`Ошибка при загрузке файла, попробуйте позже`);
          }
        } else {
          const formData = new FormData();
          formData.append('file', files[0]);
          formData.append('section', 'avatar');
          setLoading(true);
          axiosClient
            .post('upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(({ data }) => {
              onUpload(data.data);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              if (err.status === 422) {
                toast.error(err.data.file.text);
              } else {
                toast.error('Что то пошло не так. пожалуйста, обратитесь к технической поддержке');
              }
            });
        }
      }
    },
    noClick: loading,
    noDrag: loading,
    disabled: loading,
    noDragEventsBubbling: loading,
    noKeyboard: loading,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxSize: 1 * 1000 * 1000,
    maxFiles: 1,
  });
  return (
    <Box className={classes.logoContainer}>
      <Grid container spacing={1.5} alignItems="center">
        <Grid item>
          <Box className={classes.img}>
            <img src={img ? img : defaultImg} alt="логотип компании" />
          </Box>
        </Grid>
        <Grid item xs>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 700 }}>{me?.companies[0].name}</Typography>
            <SecondaryButton aria-label="Загрузить логотип" {...getRootProps()} disabled={disabled} extraSmall>
              {img ? 'Загрузить другое фото' : 'Загрузить фото'}
            </SecondaryButton>
            <Typography className={classes.descr}>JPG, GIF или PNG. Размер - до 1 мб</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddLogo;
