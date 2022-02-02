import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SizeTable = ({ sizes }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size}>
                <TableCell component="th" scope="row">
                  {size}
                </TableCell>
                <TableCell>Held.</TableCell>
                <TableCell sx={classes.iconCell}>
                  <IconButton>
                    <AddShoppingCartIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <FavoriteBorderIcon />
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
