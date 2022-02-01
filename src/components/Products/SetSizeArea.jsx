import { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TextInput } from 'components/UIkit';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
  checkIcon: {
    float: 'right',
  },
  flexContainer: {
    display: 'flex',
  },
});

const SetSizeArea = ({ sizes, setSizes }) => {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const classes = useStyles();

  useEffect(() => setIndex(sizes.length), [sizes.length]);

  const inputSize = useCallback((e) => setSize(e.target.value), [setSize]);
  const inputQuantity = useCallback(
    (e) => setQuantity(e.target.value),
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === 0) {
      return false;
    } else {
      if (index === sizes.length) {
        setSizes((prevState) => [...prevState, { size, quantity }]);
        setIndex((prevIndex) => prevIndex + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = sizes;
        newSizes[index] = { size, quantity };
        setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const filterdSizes = sizes.filter((item, index) => index !== deleteIndex);
    setSizes(filterdSizes);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, idx) => (
                <TableRow>
                  <TableCell>XL</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(idx, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box className={classes.flexContainer}>
          <TextInput
            type="text"
            label="Size"
            fullWidth={false}
            multiline={false}
            rows={1}
            required={true}
            value={size}
            onChange={inputSize}
          />
          <TextInput
            type="number"
            label="Quantity"
            fullWidth={false}
            multiline={false}
            rows={1}
            required={true}
            value={quantity}
            onChange={inputQuantity}
          />
        </Box>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </Box>
  );
};

export default SetSizeArea;
