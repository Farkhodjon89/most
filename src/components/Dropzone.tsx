import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900 } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  wrapp: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px dashed #E0E0E6',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: mainBlue900,
    padding: theme.spacing(1),
    i: {
      marginRight: theme.spacing(1),
    },
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9A9AA0',
    padding: theme.spacing(1),
  },
  textWrapp: {},
}));

const Dropzone = (props) => {
  const { classes } = useStyles();
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
  };
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <section>
      <Box className={classes.wrapp}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />

          <div className={classes.textWrapp}>
            <aside style={thumbsContainer}>{thumbs}</aside>
            <p className={classes.title}>
              <i className="ui_image-plus"></i>Добавить фото
            </p>
            <p className={classes.subtitle}>До 10 изображений .jpg или .png, Максимальный размер файла 5мб </p>
          </div>
        </div>
      </Box>
      <Grid>
        <p className={classes.title}>Добавить ещё фото</p>
        <p className={classes.subtitle}>Осталось 3 фото (12мб.)</p>
      </Grid>
    </section>
  );
};

export default Dropzone;
