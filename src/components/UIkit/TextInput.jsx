import TextField from '@mui/material/TextField';

const TextInput = (props) => {
  return (
    <TextField
      margin="dense"
      variant="standard"
      autoComplete="off"
      {...props}
    />
  );
};

export default TextInput;
