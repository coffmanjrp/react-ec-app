import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { db } from 'db';
import { fetchProductsInCart, signOut } from 'redux/users/actions';
import { UserAvatar } from '../UIkit';

const HeaderMenus = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cart: productsInCart,
    username,
    uid,
  } = useSelector((state) => state.users);

  useEffect(() => {
    unsubscribe();

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    dispatch(signOut());
  };

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
    <FlexBox>
      <IconButton onClick={() => navigate('/cart')}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={handleSignOut}>
        <UserAvatar username={username} />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </FlexBox>
  );
};

const FlexBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default HeaderMenus;
