import { styled } from '@mui/material/styles';
import {
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartListItem = ({ image, name, size, price }) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar sx={classes.list}>
          <CartListImage src={image} alt="Product" />
        </ListItemAvatar>
        <Box sx={classes.text}>
          <ListItemText primary={name} secondary={`Size: ${size}`} />
          <ListItemText primary={`$ ${price}`} />
        </Box>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  );
};

const CartListImage = styled('img')({
  margin: 16,
  width: 96,
  height: 96,
  objectFit: 'cover',
});

const classes = {
  list: {
    height: 128,
  },
  text: {
    width: '100%',
  },
};

export default CartListItem;
