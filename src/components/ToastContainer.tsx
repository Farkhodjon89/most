import { Slide, toast, ToastContainer as DefaultToastContainer } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import { mainGreen900, mainRed800 } from '../styles/colorPalette';
import success = toast.success;

const useStyles = makeStyles()((theme) => ({
  toast: {
    'boxShadow': `0px 16px 40px rgba(0, 0, 0, 0.08)`,
    'borderRadius': theme.spacing(1),
    'padding': theme.spacing(1, 2),
    'minHeight': 'auto',
    '&.Toastify__toast--error': {
      '.Toastify__toast-body': {
        color: mainRed800,
        fontSize: theme.typography.pxToRem(14),
      },
    },
    '&.Toastify__toast--success': {
      '.Toastify__toast-body': {
        color: mainGreen900,
      },
    },
  },
  body: {
    margin: 0,
    padding: 0,
  },
}));

const ToastContainer = () => {
  const { classes } = useStyles();
  return (
    <DefaultToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      transition={Slide}
      icon={({ theme, type }) => {
        if (type === 'success') {
          return <i className={'ui_info'} style={{ color: mainGreen900, fontSize: 22 }} />;
        }
        return <i className={'ui_info'} style={{ color: mainRed800, fontSize: 22 }} />;
      }}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={false}
      className={classes.root}
      bodyClassName={classes.body}
      toastClassName={classes.toast}
      limit={1}
      // theme={'colored'}
    />
  );
};

export default ToastContainer;
