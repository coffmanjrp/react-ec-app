import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TextInput } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import { setLoading } from 'redux/loading/actions';
import { signUp } from 'redux/users/actions';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(setLoading(true));
    dispatch(signUp(username, email, password, confirmedPassword));

    setTimeout(() => {
      navigate('/');
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <Box className="c-section-container">
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
      <TextInput
        type="password"
        label="Enter your password"
        fullWidth={true}
        multiline={false}
        rows={1}
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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
    </Box>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

export default SignUp;
