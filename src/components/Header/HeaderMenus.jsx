import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { db } from 'db';
import { fetchProductsInCart } from 'redux/users/actions';

const HeaderMenus = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart: productsInCart, uid } = useSelector((state) => state.users);

  useEffect(() => {
    unsubscribe();

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unsubscribe = async () => {
    const usersRef = await collection(db, 'users');
    const userRef = await doc(usersRef, uid);
    const usersCartRef = await collection(userRef, 'cart');
    const unsub = await onSnapshot(usersCartRef, (snapshots) => {
      snapshots.docChanges().forEach((change) => {
        const product = change.doc.data();
        const changeType = change.type;

        switch (changeType) {
          case 'added':
            productsInCart.push(product);
            break;
          case 'modified':
            const index = productsInCart.findIndex(
              (product) => product.id === change.doc.id
            );
            productsInCart[index] = product;
            break;
          case 'remove':
            productsInCart.filter((product) => product.id !== change.doc.id);
            break;
          default:
            break;
        }
      });
      dispatch(fetchProductsInCart(productsInCart));
    });
    return unsub;
  };

  return (
    <>
      <IconButton onClick={() => navigate('/cart')}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
