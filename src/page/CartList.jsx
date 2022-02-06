import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, List, Typography } from '@mui/material';
import { CartListItem } from 'components/Products';
import { GreyButton, PrimaryButton } from 'components/UIkit/CustomButtons';
import { fetchProductsInCart } from 'redux/users/actions';

const CartList = () => {
  const navigate = useNavigate();
  const { cart: productsInCart } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsInCart());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="section" className="c-section-wrapin">
      <Typography variant="h4" className="u-text__headline">
        Shopping Cart
      </Typography>
      <List sx={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.id} product={product} />
          ))}
      </List>
      <Box className="module-spacer--medium" />
      <Box className="p-grid__column">
        <PrimaryButton
          label="Proceed to checkout"
          onClick={() => navigate('/order/confirm')}
        />
        <GreyButton label="Continue shopping" onClick={() => navigate('/')} />
      </Box>
    </Box>
  );
};

const classes = {
  root: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 512,
  },
};

export default CartList;
