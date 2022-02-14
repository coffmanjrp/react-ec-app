import { Alert, Snackbar } from '@mui/material';

const Toast = ({ type, message, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={() => onClose(false)}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={type !== '' ? type : 'info'}
        onClose={() => onClose(false)}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
