import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TextInput } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';

const Reset = () => {
  const [email, setEmail] = useState('');

  return (
    <Box className="c-section-container">
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box className="module-spacer--medium" />
      <Box className="center">
        <PrimaryButton label="Register" onClick={() => console.log({ email })}>
          Register
        </PrimaryButton>
        <Box className="module-spacer--medium" />
        <Typography variant="subtitle2">
          <StyledLink to="/signup">Create account</StyledLink>
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

export default Reset;
