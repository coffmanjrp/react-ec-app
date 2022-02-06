import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, List } from '@mui/material';
import { OrderHistoryItem } from 'components/Products';
import { fetchOrderHistory } from 'redux/users/actions';

const OrderHistory = () => {
  const { orders } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderHistory());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="c-section-wrapin">
      <OrderList>
        {orders.length > 0 &&
          orders.map((order) => <OrderHistoryItem key={order.id} {...order} />)}
      </OrderList>
    </Box>
  );
};

const OrderList = styled(List)(({ theme }) => ({
  margin: '0 auto',
  padding: 32,
  background: theme.palette.grey['100'],
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: 768,
  },
}));

export default OrderHistory;
