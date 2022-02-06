import { styled } from '@mui/material/styles';
import {
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'db';
import { auth } from 'db';

const CartListItem = ({ product }) => {
  const uid = auth.currentUser.uid;

  const removeProductFromCart = async (id) => {
    const usersRef = await collection(db, 'users');
    const userRef = await doc(usersRef, uid);
    const usersCartRef = await collection(userRef, 'cart');
    const snapshot = await doc(usersCartRef, id);

    deleteDoc(snapshot);
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar sx={classes.list}>
          <CartListImage src={product?.images[0].path} alt={product?.name} />
        </ListItemAvatar>
        <Box sx={classes.text}>
          <ListItemText
            primary={product?.name}
            secondary={`Size: ${product?.size}`}
          />
          <ListItemText primary={`$ ${product?.price.toLocaleString()}`} />
        </Box>
        <IconButton onClick={() => removeProductFromCart(product.id)}>
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
