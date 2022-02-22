import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TextInput } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import { resetPassword } from 'redux/users/actions';

const Reset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const inputEmail = useCallback((e) => setEmail(e.target.value), [setEmail]);

  const handleReset = () => {
    dispatch(resetPassword(email));
  };

  return (
    <Box component="form" className="c-section-container">
      <Typography variant="h4" className="u-text__headline u-text-center">
        Reset your password
      </Typography>
      <Box className="module-spacer--medium" />
      <TextInput
        type="email"
        label="Email"
        fullWidth={true}
        multiline={false}
        rows={1}
        required={true}
        value={email}
        onChange={inputEmail}
      />
      <Box className="module-spacer--medium" />
      <Box className="center">
        <PrimaryButton label="Send reset email" onClick={handleReset} />
        <Box className="module-spacer--medium" />
        <Typography variant="subtitle2">
          <StyledLink to="/signup">Create your account</StyledLink>
        </Typography>
        <Typography variant="subtitle2">
          <StyledLink to="/signin">Go to Sign-In page</StyledLink>
        </Typography>
      </Box>
    </Box>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

export default Reset;
