import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PrimaryButton = ({ onClick, label }) => {
  return (
    <PrimaryStyled variant="contained" onClick={onClick}>
      {label}
    </PrimaryStyled>
  );
};

export const GreyButton = ({ onClick, label }) => {
  return (
    <GreyStyled variant="contained" onClick={onClick}>
      {label}
    </GreyStyled>
  );
};

const PrimaryStyled = styled(Button)(({ theme }) => ({
  marginBottom: 16,
  height: 48,
  width: 256,
  backgroundColor: theme.palette.primary.main,
  fontSize: '1rem',
  color: '#fff',
}));

const GreyStyled = styled(Button)(({ theme }) => ({
  marginBottom: 16,
  height: 48,
  width: 256,
  backgroundColor: theme.palette.grey['300'],
  fontSize: '1rem',
  color: '#000',
}));
