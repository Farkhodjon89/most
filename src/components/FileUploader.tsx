import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { axiosClient } from 'pages/_app';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { helpPeach, mainBlue900, monoBgGrey, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

import { pluralize, pluralizeWithoutNum } from '../utils/common';
import { ButtonText } from './Button';
import { ImageItemLoader } from './Loaders';

const useStyles = makeStyles()((theme, { imgItemDimensions, actionsDimensions }) => ({
  root: {
    cursor: 'pointer',
    border: '1px dashed #E0E0E6',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: mainBlue900,
    paddingTop: theme.spacing(1),
    i: {
      marginRight: theme.spacing(1),
      // marginTop: 2
    },
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9A9AA0',
    padding: theme.spacing(1),
  },
  imgItem: {
    width: imgItemDimensions[0],
    height: imgItemDimensions[1],
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  actionsContainer: {
    position: 'absolute',
    top: actionsDimensions[0],
    right: actionsDimensions[1],
  },
  imgItemActions: {
    'padding': theme.spacing(0.5),
    '&:last-child': {
      marginLeft: theme.spacing(0.5),
    },
    'i': {
      color: 'white',
      fontSize: 10,
    },
  },
  loadingItem: {
    width: `${imgItemDimensions[0]}px !important`,
    height: imgItemDimensions[1],
    backgroundColor: monoBgGrey,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const ErrorList = ({ messages }) => {
  return (
    <Stack>
      {messages.map((m, key) => (
        <Typography fontSize={12} key={key}>
          {m}
        </Typography>
      ))}
    </Stack>
  );
};

const FileUploader = ({
  title = 'Добавить',
  titleBlock = 'Добавить фото',
  icon = 'ui_image-plus',
  descr = 'До 10 изображений .jpg или .png, Максимальный размер файла 5мб',
  imgItemDimensions = [112, 96],
  actionsDimensions = [8, 8],
  addMoreButtonLabel = 'Добавить еще',
  onStarred,
  files,
  onChange,
  readOnlyMode = false,
  maxSize = 5 * 1000 * 1000,
  maxFiles = 10,
  withSlider = true,
  accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg'],
  },
}) => {
  const [loading, setLoading] = useState(false);
  // const [acceptedFiles, setAcceptedFiles] = useState([]);
  const { classes } = useStyles({ imgItemDimensions, actionsDimensions });

  const { getRootProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const newFiles = () => {
        if (files.length + acceptedFiles.length > maxFiles) {
          return acceptedFiles.slice(0, 10 - files.length);
        } else {
          return acceptedFiles;
        }
      };

      setLoading(true);
      const filesArr = [...files];
      for (const file of newFiles()) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'document');
        const { data, error } = await axiosClient.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (data.data) {
          filesArr.push(data.data);
        }
      }
      onChange(filesArr);
      // setAcceptedFiles(filesArr);
      setLoading(false);
    },
    onDropRejected: (rejectedFiles, event) => {
      const messages: string[] = [];
      if (rejectedFiles[0].errors.find((error) => error.code === 'too-many-files')) {
        messages.push('Максимальное количество загружаемых файлов: 10');
      } else {
        for (const rejectedFile of rejectedFiles) {
          switch (rejectedFile.errors[0].code) {
            case 'file-invalid-type': {
              messages.push(`-${rejectedFile.file.name} имеет неверный формат файла.`);
              break;
            }
            case 'file-too-large': {
              messages.push(
                `-${rejectedFile.file.name} превышает размер допустимого файла (${Math.round(
                  maxSize / 1000 / 1000,
                )}MB).`,
              );
              break;
            }
            default: {
              messages.push(`Ошибка при загрузке файла, попробуйте позже`);
            }
          }
        }
      }

      toast.error(<ErrorList messages={messages} />, {
        autoClose: 10000,
        style: {
          width: 500,
          left: '-35%',
        },
      });
    },
    noClick: loading,
    noDrag: loading,
    disabled: loading,
    noDragEventsBubbling: loading,
    noKeyboard: loading,
    accept,
    maxSize,
    maxFiles,
  });

  const handleRemove = (index) => {
    let acceptedFilesArr = [...files];
    acceptedFilesArr = acceptedFilesArr.filter((item, key) => key !== index);

    onChange(acceptedFilesArr);
  };

  return (
    <>
      <Typography sx={{ fontWeight: 700, fontSize: 14 }} mb={2}>
        {title}
      </Typography>
      {files?.length > 0 && (
        <Box onClick={(e) => e.stopPropagation()}>
          {withSlider && (
            <ImageList
              readOnlyMode={readOnlyMode}
              classes={classes}
              files={files}
              onRemove={handleRemove}
              onStarred={onStarred}
              loading={loading}
              imgItemDimensions={imgItemDimensions}
            />
          )}

          {!withSlider && (
            <ImageListWithoutSlider
              readOnlyMode={readOnlyMode}
              classes={classes}
              files={files}
              onRemove={handleRemove}
              onStarred={onStarred}
              loading={loading}
              imgItemDimensions={imgItemDimensions}
            />
          )}
        </Box>
      )}
      {files?.length === 0 && (
        <Box {...getRootProps()} className={classes.root}>
          {loading && <ImageItemLoader imgItemDimensions={imgItemDimensions} />}
          {!loading && (
            <Stack display={'flex'} alignItems={'center'} width={'100%'}>
              <Typography className={classes.title}>
                <i className={icon} style={{ fontSize: 16 }} /> {titleBlock}
              </Typography>
              <Typography className={classes.subTitle}>{descr}</Typography>
            </Stack>
          )}
        </Box>
      )}
      {files?.length > 0 && !readOnlyMode && (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          {files.length < maxFiles && <ButtonText {...getRootProps()}>{addMoreButtonLabel}</ButtonText>}
          <Typography fontSize={12} color={monoGrey}>
            {files.length < maxFiles
              ? ` ${pluralizeWithoutNum(maxFiles - files.length, ['Осталось', 'Остался', 'Осталось'])} ${pluralize(
                  maxFiles - files.length,
                  ['файл', 'файла', 'файлов'],
                )}`
              : 'Вы добавили максимальное количество файлов'}
          </Typography>
        </Box>
      )}
    </>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  if (!onClick) {
    return null;
  }
  return (
    <Box
      sx={{ position: 'absolute', zIndex: 1, top: 0, right: 4, height: '100%', display: 'flex', alignItems: 'center' }}
    >
      <IconButton
        disableRipple
        sx={{ background: 'white', padding: 1.5 }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
      >
        <i className={'ui_right-arrow'} style={{ fontSize: 12 }} />
      </IconButton>
    </Box>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  if (!onClick) {
    return null;
  }
  return (
    <Box
      sx={{ position: 'absolute', zIndex: 1, top: 0, left: 4, height: '100%', display: 'flex', alignItems: 'center' }}
    >
      <IconButton
        disableRipple
        sx={{ background: 'white', padding: 1.5 }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
      >
        <i className={'ui_left-arrow'} style={{ fontSize: 12 }} />
      </IconButton>
    </Box>
  );
};

const ImageListWithoutSlider = ({
  files,
  onRemove,
  onStarred,
  loading = false,
  classes,
  readOnlyMode,
  imgItemDimensions,
}) => {
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {files.map((item, key) => (
          <Grid item key={key}>
            <Box position={'relative'}>
              {!readOnlyMode && (
                <Box className={classes.actionsContainer}>
                  {onStarred && (
                    <IconButton
                      sx={{ background: key === 0 ? helpPeach : monoGrey, opacity: key === 0 ? 1 : 0.5 }}
                      className={classes.imgItemActions}
                      disableRipple
                      onClick={() => onStarred(key)}
                    >
                      <i className="ui_star" />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(key);
                    }}
                    className={classes.imgItemActions}
                    disableRipple
                    sx={{ background: monoGrey, opacity: 0.5 }}
                  >
                    <i className="ui_close" />
                  </IconButton>
                </Box>
              )}
              {item.extension === 'pdf' ? (
                <img src={'/img/default_image.svg'} className={classes.imgItem} alt="" />
              ) : (
                <img src={item.originalUrl} className={classes.imgItem} alt="" />
              )}
            </Box>
          </Grid>
        ))}
        {loading && (
          <Grid item>
            <ImageItemLoader imgItemDimensions={imgItemDimensions} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const ImageList = ({ files, onRemove, onStarred, loading = false, classes, readOnlyMode, imgItemDimensions }) => {
  const settings = {
    // className: 'slider variable-width',
    dots: false,
    infinite: false,
    arrows: true,
    centered: true,
    slidesToScroll: 3,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box className={classes.root}>
      <Slider {...settings}>
        {files.map((item, key) => (
          <Box key={key}>
            <Box position={'relative'} mr={2}>
              {!readOnlyMode && (
                <Box className={classes.actionsContainer}>
                  {onStarred && (
                    <IconButton
                      sx={{ background: key === 0 ? helpPeach : monoGrey, opacity: key === 0 ? 1 : 0.5 }}
                      className={classes.imgItemActions}
                      disableRipple
                      onClick={() => onStarred(key)}
                    >
                      <i className="ui_star" />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(key);
                    }}
                    className={classes.imgItemActions}
                    disableRipple
                    sx={{ background: monoGrey, opacity: 0.5 }}
                  >
                    <i className="ui_close" />
                  </IconButton>
                </Box>
              )}
              {item.extension === 'pdf' ? (
                <img src={'/img/default_image.svg'} className={classes.imgItem} alt="" />
              ) : (
                <img src={item.originalUrl} className={classes.imgItem} alt="" />
              )}
            </Box>
          </Box>
        ))}
        {loading && <ImageItemLoader imgItemDimensions={imgItemDimensions} />}
      </Slider>
    </Box>
  );
};

export default FileUploader;
