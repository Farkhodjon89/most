import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from 'tss-react/mui';

import { SecondaryButton } from '../../../components/Button';
import { monoDarkBlack, monoGrey, monoLightGrey2, monoWhite } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: '24px',
    boxShadow: 'none',
    backgroundColor: monoWhite,
    border: `1px solid ${monoLightGrey2}`,
    borderRadius: '16px',
    marginBottom: '16px',
    cursor: 'pointer',
    position: 'relative',
  },
  top: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '97%',
      top: '45%',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '1px',
      backgroundColor: monoLightGrey2,
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: '#6D6D7B',
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
    marginBottom: '14px',
  },
  providerName: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
    lineHeight: '24px',
    color: monoDarkBlack,
    marginRight: '6px',
    marginBottom: '10px',
  },
  iconPlanet: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(14),
    marginRight: '8px',
  },
  sellerText: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: monoGrey,
    padding: '6px 12px',
    border: `1px solid ${monoLightGrey2}`,
    borderRadius: '50px',
    marginRight: '17px',
  },
}));

const ProviderData = () => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className={classes.top}>
        <Box display={'flex'} alignItems={'center'}>
          <Image alt={'Apple Image'} src={'/appleBig.png'} width={80} height={80} />
          <Box sx={{ marginLeft: '17px' }}>
            <Box display={'flex'} alignItems={'center'}>
              <Typography className={classes.providerName}>ООО “Рога и копыта”</Typography>
              <Image src={'/tick.png'} width={16} height={16} alt={'Tick'} />
            </Box>
            <Stack direction={'row'}>
              <Box className={classes.sellerText}>Розничный торговец</Box>
              <Box display={'flex'} alignItems={'center'}>
                <Box sx={{ marginRight: '5px' }}>
                  <Image src={'/russianFlag.png'} width={16} height={16} alt={'Tick'} />
                </Box>
                Россия, 12 лет
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
          <Link href={'/www.iphonelegal.com'}>
            <a>
              <Box className={classes.link}>
                <i className={cx('ui_earth', classes.iconPlanet)}></i>
                www.iphonelegal.com
              </Box>
            </a>
          </Link>
          <SecondaryButton small>Написать поставщику</SecondaryButton>
        </Box>
      </Box>
      <Grid mt={4} container spacing={3}>
        {/*{data.map(({ id, title, text }) => (*/}
        {/*  <Grid key={id} item xs={2.4}>*/}
        {/*    <Typography className={classes.title}>{title}</Typography>*/}
        {/*    <Typography className={classes.text}>{text}</Typography>*/}
        {/*  </Grid>*/}
        {/*))}*/}
      </Grid>
    </Paper>
  );
};

export default ProviderData;
