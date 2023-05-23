import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { monoGrey, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  fileBox: {
    borderRadius: 8,
    border: `1px solid ${monoLightGrey2}`,
    padding: '8px 12px',
    width: 'fit-content',
  },
  fileName: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: '117%',
  },
  fileInfo: {
    'display': 'flex',
    'alignItems': 'center',
    '& p': {
      color: monoGrey,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(10),
    },
  },
  size: {
    'paddingLeft': theme.spacing(0.5),
    'marginLeft': theme.spacing(0.5),
    'position': 'relative',
    '&:before': {
      position: 'absolute',
      content: '"•"',
      left: -2,
      top: 0,
    },
  },
}));

const FileBox = ({ file }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.fileBox}>
      <Grid container columnSpacing={1.25}>
        <Grid item>
          <i className="ui_file-04" style={{ color: monoGrey }} />
        </Grid>
        <Grid item xs>
          <Typography className={classes.fileName}>{file.name}</Typography>
          <Box className={classes.fileInfo}>
            <Typography>{file.format.toUpperCase()}</Typography>
            <Typography className={classes.size}>{file.size}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileBox;
