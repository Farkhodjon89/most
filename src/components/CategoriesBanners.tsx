import { Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from 'tss-react/mui';

import { monoBgGreyLight } from '../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: '32px 45px',
    borderRadius: '16px',
    backgroundColor: monoBgGreyLight,
    marginBottom: '38px',
    boxShadow: 'none',
    cursor: 'pointer',
  },
}));

const CategoriesBanners = ({ categories }: any) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        {categories.slice(0, 12).map(({ id, image, name, link }) => (
          // <NextLink key={id} href={link}>
          //   <a>
          <Grid item xs={2}>
            <Image src={image} width={120} height={120} alt="Category Image" />
            <Typography>{name}</Typography>
          </Grid>
          //   </a>
          // </NextLink>
        ))}
      </Grid>
    </Paper>
  );
};

export default CategoriesBanners;
