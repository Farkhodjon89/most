import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { monoDarkBlack, monoGrey, monoLightGrey1 } from '../../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: '16px 64px 64px',
    background: monoDarkBlack,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  copyright: {
    color: monoGrey,
    fontSize: 12,
  },
  footerLogo: {
    width: 300,
  },
  listTitle: {
    color: 'white',
    fontWeight: 600,
    padding: '0px 16px',
    fontSize: 14,
  },
  listItem: {
    color: monoLightGrey1,
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Box className={classes.left}>
            <a href="">
              <img src="/img/logo_footer.svg" alt="" className={classes.footerLogo} />
            </a>

            <Typography className={classes.copyright}>© 2022 • ООО «МСТ Система»</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.listTitle}>Каталог</Typography>
              <List dense>
                <ListItem>
                  <a href="#">
                    <ListItemText className={classes.listItem} primary="Агропромышленность" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#">
                    <ListItemText className={classes.listItem} primary="Еда и напитки" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#">
                    <ListItemText className={classes.listItem} primary="Инструмент" />
                  </a>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.listTitle}>Помощь</Typography>
              <List dense>
                <ListItem>
                  <a href="#">
                    <ListItemText className={classes.listItem} primary="Контакты" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#">
                    <ListItemText className={classes.listItem} primary="Возможности МОСТ" />
                  </a>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.listTitle}>
                <a href="tel:+7 (999) 999 99 99">+7 (999) 999 99 99</a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
