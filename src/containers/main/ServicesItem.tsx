import { Box, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoLightGrey_2 } from '../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  'WrapperItem': {
    'minHeight': '96px',
    'display': 'flex',
    'alignItems': 'center',
    'paddingLeft': theme.spacing(4),
    'paddingRight': theme.spacing(4.6),
    'borderRadius': 16,
    'border': `1px solid ${monoLightGrey_2}`,
    'cursor': 'pointer',
    '& p': {
      fontWeight: 500,
      lineHeight: '150%',
      transition: 'all 0.3s',
    },
    '&:hover': {
      '& p': {
        color: mainBlue900,
      },
    },
  },
  '.MuiTooltip-popper	': { backgroundColor: 'red' },
}));

const ServicesItem = ({ servicesData }: any) => {
  const { classes } = useStyles();
  return (
    <Grid container columnSpacing={2}>
      {servicesData?.data.map(({ name, link, image, text, description, id, icon }: any) => (
        <Grid item xs={4} key={id}>
          <Tooltip
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  borderRadius: '24px',
                  color: '#ffffff',
                  backgroundColor: mainBlue900,
                  padding: '16px',
                  fontSize: 14,
                },
                '& .MuiTooltip-arrow': { color: mainBlue900 },
              },
            }}
            title={description}
            arrow
          >
            <Box>
              {/*<Link href={`/catalogs/${id}`}>*/}
              <a className={classes.WrapperItem}>
                <img
                  alt="Services Item Image"
                  width={36}
                  height={36}
                  style={{ marginRight: '16px' }}
                  src={icon.previewUrl}
                />
                <Typography>{name}</Typography>
              </a>
            </Box>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesItem;
