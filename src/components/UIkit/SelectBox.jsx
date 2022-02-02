import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectBox = ({ label, required, value, options, select }) => {
  return (
    <FormControl variant="standard" sx={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        required={required}
        value={value}
        onChange={(e) => select(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const classes = {
  formControl: {
    marginBottom: 2,
    minWidth: 128,
    width: '100%',
  },
};

export default SelectBox;
