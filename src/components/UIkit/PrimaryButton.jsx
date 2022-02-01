import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles({
  button: {
    marginBottom: 16,
    height: 48,
    width: 256,
    backgroundColor: '#4dd0e1',
    fontSize: '1rem',
    color: '#fff',
  },
});

const PrimaryButton = ({ label, onClick }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.button} onClick={onClick}>
      {label}
    </Button>
  );
};

export default PrimaryButton;
