import { Box, Paper, Tooltip, Typography } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../../../components/Button';
import { mainBlue900, monoGrey, monoWhite } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  root: {
    cursor: 'pointer',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '16px',
  },
  teg: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '14px',
    color: monoWhite,
    backgroundColor: mainBlue900,
    borderRadius: '50px',
    padding: '2px 6px',
    marginLeft: '16px',
    width: 'fit-content',
  },
  verificationText: {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: '24px',
    color: mainBlue900,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: mainBlue900,
  },
  providerText: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '14px',
    color: monoGrey,
    marginBottom: '10px',
  },
  iconPlanet: {
    color: mainBlue900,
    fontSide: theme.typography.pxToRem(14),
    marginRight: '8px',
  },
}));

const PurchaseInfoProvider = () => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.root}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box>
          <Tooltip title={'Верифицированный продавец'} placement="top-start" arrow>
            <Box className={classes.verificationText} sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src={'/tick.png'} width={16} height={16} alt={'Tick'} />
              Айфоны.ру
            </Box>
          </Tooltip>
          <Typography className={classes.providerText}>Розничный торговец</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ marginRight: '5px' }}>
                <Image src={'/russianFlag.png'} width={16} height={16} alt={'Tick'} />
              </Box>
              Россия
            </Box>
            <Box className={classes.teg}>12 лет</Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <Box>
            <Image src={'/apple.png'} width={40} height={40} alt={'Apple'} />
          </Box>
          <Link href={'/www.iphonelegal.com'}>
            <a>
              <Box className={classes.link}>
                <i className={cx('ui_earth', classes.iconPlanet)}></i>
                www.iphonelegal.com
              </Box>
            </a>
          </Link>
        </Box>
      </Box>
      <Button sx={{ marginTop: '14px' }} variant={'outlined'} fullWidth>
        {'Написать поставщику'}
      </Button>
    </Paper>
  );
};

export default PurchaseInfoProvider;
