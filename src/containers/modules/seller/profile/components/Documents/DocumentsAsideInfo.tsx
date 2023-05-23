import { Box, Typography } from '@mui/material';
import cx from 'classnames';
import { FC } from 'react';
import { mainBlue500, mainBlue700, mainBlue800 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  documentsAsideInfo: {
    backgroundColor: mainBlue800,
    borderRadius: 12,
    padding: '16px 16px 24px 16px',
  },
  top: {
    borderBottom: `1px solid ${mainBlue700}`,
    paddingBottom: theme.spacing(2.8),
    paddingLeft: theme.spacing(4),
    position: 'relative',
  },
  bottom: {
    paddingTop: theme.spacing(1.5),
    paddingLeft: theme.spacing(4),
  },
  icon: {
    'position': 'absolute',
    'content': '""',
    'left': 0,
    'top': 1,
    '&::before': {
      color: '#fff',
      fontSize: 22,
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 600,
    lineHeight: '120%',
    marginBottom: theme.spacing(0.5),
    color: '#fff',
  },
  descr: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '143%',
    marginBottom: theme.spacing(1),
    color: '#fff',
  },
  infoTypes: {
    color: mainBlue500,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
  },
  bottomInfo: {
    color: '#fff',
    fontWeight: 700,
    lineHeight: '138%',
  },
}));

const DocumentsAsideInfo: FC = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.documentsAsideInfo}>
      <Box className={classes.top}>
        <i className={cx('ui_info', classes.icon)} />
        <Typography className={classes.title}>Загрузите документы вашей компании на проверку</Typography>
        <Typography className={classes.descr}>
          В случае успешной проверки, вы получите статус «Проверенный», что даст вам более высокую позицию в поисковой
          выдаче и доверие со стороны покупателей.
        </Typography>
        <Typography className={classes.infoTypes}>Файлы .doc, .docx, .pdf, не более 10 мб</Typography>
      </Box>
      <Box className={classes.bottom}>
        <Typography className={classes.bottomInfo}>Информация является полностью конфиденциальной</Typography>
      </Box>
    </Box>
  );
};

export default DocumentsAsideInfo;
