import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextInput, Toast } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import { signUp } from 'redux/users/actions';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.alert);

  useEffect(() => {
    setToast(Boolean(message));

    return () => setToast(false);
  }, [message]);

  const handleSignUp = () => {
    dispatch(signUp(username, email, password, confirmedPassword));
  };

  return (
    <Box component="form" className="c-section-container">
      <Typography variant="h4" className="u-text__headline u-text-center">
        Account registration
      </Typography>
      <Box className="module-spacer--medium" />
      <TextInput
        type="text"
        label="Username"
        fullWidth={true}
        multiline={false}
        rows={1}
        required={true}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type="email"
        label="Email"
        fullWidth={true}
        multiline={false}
        rows={1}
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box sx={{ position: 'relative' }}>
        <TextInput
          type={showPassword ? 'text' : 'password'}
          label="Enter your password"
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ShowPasswordButton
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </ShowPasswordButton>
      </Box>
      <TextInput
        type="password"
        label="Re-enter your password"
        fullWidth={true}
        multiline={false}
        rows={1}
        required={true}
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      <Box className="module-spacer--medium" />
      <Box className="center">
        <PrimaryButton label="Register" onClick={handleSignUp}>
          Register
        </PrimaryButton>
        <Box className="module-spacer--medium" />
        <Typography variant="subtitle2">
          <StyledLink to="/signin/reset">Forgot your password?</StyledLink>
        </Typography>
        <Typography variant="subtitle2">
          <StyledLink to="/signin">SignIn page</StyledLink>
        </Typography>
      </Box>
      <Toast {...{ type, message, open: toast, onClose: setToast }} />
    </Box>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const ShowPasswordButton = styled(IconButton)({
  position: 'absolute',
  top: '55%',
  right: '0',
  transform: 'translateY(-50%)',
});
export default SignUp;
