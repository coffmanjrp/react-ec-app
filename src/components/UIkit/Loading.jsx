import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Background>
      <CircularProgress sx={classes} />;
    </Background>
  );
};

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 10000,
});

const classes = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default Loading;
