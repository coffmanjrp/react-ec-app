import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
});

const SelectBox = ({ label, required, value, options, select }) => {
  const classes = useStyles();

  return (
    <FormControl variant="standard" className={classes.formControl}>
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

export default SelectBox;
