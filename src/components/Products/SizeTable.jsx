import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SizeTable = ({ sizes, addProduct }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>Held. {size.quantity}</TableCell>
                <TableCell sx={classes.iconCell}>
                  <IconButton onClick={() => addProduct(size.size)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const classes = {
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
};

export default SizeTable;
