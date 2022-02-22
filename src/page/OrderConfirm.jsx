import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Divider, List, Typography } from '@mui/material';
import { CartListItem } from 'components/Products';
import { TextDetail } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import { orderProduct } from 'redux/products/actions';

const OrderConfirm = () => {
  const { cart: productsInCart } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const subtotal = useMemo(
    () => productsInCart.reduce((sum, product) => (sum += product.price), 0),
    [productsInCart]
  );

  const shippingFee = subtotal >= 1000 ? 0 : 2;
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInCart, total]);

  return (
    <Box component="section" className="c-section-wrapin">
      <Typography variant="h4" className="u-text__headline">
        Checkout
      </Typography>
      <Box className="p-grid__row">
        <DetailBox>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem key={product.id} product={product} />
              ))}
          </List>
        </DetailBox>
        <OrderBox>
          <TextDetail label="Items" value={`$ ${subtotal.toLocaleString()}`} />
          <TextDetail
            label="Estimated tax to be collected"
            value={`$ ${tax.toLocaleString()}`}
          />
          <TextDetail
            label="Shipping &amp; handling"
            value={`$ ${shippingFee.toLocaleString()}`}
          />
          <Divider />
          <TextDetail
            label="Order total"
            value={`$ ${total.toLocaleString()}`}
          />
          <PrimaryButton label="Place your order" onClick={order} />
        </OrderBox>
      </Box>
    </Box>
  );
};

const DetailBox = styled('div')(({ theme }) => ({
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    width: 320,
  },
  [theme.breakpoints.up('sm')]: {
    width: 512,
  },
}));

const OrderBox = styled('div')({
  margin: '24px auto 16px auto',
  padding: 16,
  width: 288,
  height: 256,
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: 4,
  boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
});

export default OrderConfirm;
