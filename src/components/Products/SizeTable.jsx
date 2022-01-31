import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
});

const SizeTable = ({ sizes }) => {
  const classes = useStyles();

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
                <TableCell className={classes.iconCell}>
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

export default SizeTable;
