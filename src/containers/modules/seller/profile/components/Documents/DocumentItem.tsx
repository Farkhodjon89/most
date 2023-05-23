import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import cx from 'classnames';
import { SmallGrayDescr } from 'components/Typography';
import { axiosClient } from 'pages/_app';
import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { mainBlue400, mainBlue900, monoBgGrey, monoDarkGrey, monoGrey, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<{ uploaded: boolean }>()((theme, { uploaded }) => ({
  documentItem: {
    borderBottom: `1px solid ${monoLightGrey2}`,
    paddingBottom: theme.spacing(1),
  },
  documentItemTitle: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '143%',
  },
  documentItemName: {
    color: monoDarkGrey,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '143%',
    paddingTop: 1,
  },
  documentItemNullName: {
    color: monoGrey,
  },
  deleteIconBox: {
    cursor: 'pointer',
  },
  deleteIcon: {
    '&::before': {
      transition: 'all 0.3s',
      color: monoGrey,
      fontSize: 10,
    },
    '&:hover': {
      '&::before': {
        color: monoDarkGrey,
      },
    },
  },
  document: {
    backgroundColor: monoBgGrey,
    borderRadius: 8,
    padding: '4px 12px 4px 8px',
    width: 'fit-content',
  },
  uploadButton: {
    'background': uploaded ? mainBlue400 : mainBlue900,
    'color': uploaded ? mainBlue900 : 'white',
    'borderRadius': theme.spacing(1),
    'padding': theme.spacing(1),
    ':hover': {
      background: uploaded ? mainBlue400 : mainBlue900,
    },
    // background: mainBlue400,
  },
}));

type Props = {
  title: string;
  documents: [];
  info?: string;
  formik: any;
  type: string;
  readOnly: boolean;
};
const accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'application/pdf': ['.pdf'],
};

const DocumentItem: FC<Props> = ({ title, documents, info, type, formik, readOnly = false }) => {
  const { classes } = useStyles({ uploaded: documents.length > 0 });
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    let documentsArr = [...formik.values.documents];
    documentsArr = documentsArr.filter((item) => item.name !== type);
    formik.setFieldValue('documents', documentsArr);
  };

  const { getRootProps } = useDropzone({
    onDrop: (files, fileRejections) => {
      if (!loading) {
        if (fileRejections.length > 0) {
          if (fileRejections[0]?.errors[0]?.code === 'file-too-large') {
            toast.error(`Размер файла не должен превышать ${Math.round((10 * 1000 * 1000) / 1000 / 1000)}MB`);
          } else if (fileRejections[0]?.errors[0]?.code === 'file-invalid-type') {
            toast.error(`Неверный формат файла, допустимые форматы: .png, .jpeg', '.jpg, .pdf`);
          } else {
            toast.error(`Ошибка при загрузке файла, попробуйте позже`);
          }
        } else {
          const formData = new FormData();
          formData.append('file', files[0]);
          formData.append('section', 'document');
          setLoading(true);
          axiosClient
            .post('/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(({ data }) => {
              let documentsArr = [...formik.values.documents];
              if (documentsArr.some((item) => item.name === type)) {
                documentsArr = documentsArr.filter((item) => item.name !== type);
                documentsArr.push({ name: type, file: data.data });
              } else {
                documentsArr.push({ name: type, file: data.data });
              }

              formik.setFieldValue('documents', documentsArr);
              setLoading(false);
              // onUpload(data.data);
              // axiosClient
              //   .post(apiUrl, {
              //     file_uuid: data.data?.uuid,
              //   })
              //   .then(() => {
              //     setLoading(false);
              //     refetch();
              //   });
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
    maxSize: 10 * 1000 * 1000,
    noClick: loading,
    noDrag: loading,
    disabled: loading,
    noDragEventsBubbling: loading,
    noKeyboard: loading,
    accept,
    maxFiles: 1,
  });

  return (
    <Box className={classes.documentItem}>
      <Grid container alignItems={'flex-start'} justifyContent="space-between" columnSpacing={2}>
        <Grid item xs>
          <Stack spacing={1}>
            <Typography className={classes.documentItemTitle}>{title}</Typography>
            <Grid container spacing={0.5}>
              {documents.length > 0 ? (
                documents.map((item, key) => (
                  <Grid item key={`${item}_${key}`}>
                    <Box className={classes.document}>
                      <Grid container columnSpacing={1}>
                        <Grid item>
                          <Typography className={classes.documentItemName}>{item.fileName}</Typography>
                        </Grid>
                        <Grid item>
                          {!readOnly && (
                            <Box onClick={handleRemove} className={classes.deleteIconBox}>
                              <i className={cx('ui_close', classes.deleteIcon)} />
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item>
                  <Box className={classes.document}>
                    <Grid container columnSpacing={1}>
                      <Grid item>
                        <Typography className={classes.documentItemNullName}>Не загружено</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={1} alignItems="flex-end">
            {loading ? (
              <IconButton disableRipple>
                <CircularProgress sx={{ color: mainBlue900 }} size={16} />
              </IconButton>
            ) : (
              <IconButton disabled={readOnly} size={'small'} {...getRootProps()} className={classes.uploadButton}>
                {documents.length > 0 ? <i className="ui_Property-1edit-05" /> : <i className="ui_upload-cloud" />}
              </IconButton>
            )}

            {/*<SecondaryButton>{documents.length > 0 ? 'Загрузить другой файл' : 'Загрузить файл'}</SecondaryButton>*/}
            {info && <SmallGrayDescr>Отсканированный документ с двух сторон</SmallGrayDescr>}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentItem;
