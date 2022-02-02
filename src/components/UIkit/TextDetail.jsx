import { styled } from '@mui/material/styles';

const TextDetail = ({ label, value }) => {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  );
};

const Row = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: 16,
});

const Label = styled('div')({
  marginLeft: 0,
  marginRight: 'auto',
});

const Value = styled('div')({
  marginLeft: 'auto',
  fontWeight: 600,
  marginRight: 0,
});

export default TextDetail;
