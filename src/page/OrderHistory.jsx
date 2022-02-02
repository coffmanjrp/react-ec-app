import { styled } from '@mui/material/styles';
import { Box, List } from '@mui/material';
import { OrderHistoryItem } from 'components/Products';
import NoImage from 'assets/img/no_image.png';

const mock = {
  id: 1,
  products: {
    id: 1,
    name: 'Product Name',
    price: 110000,
    size: 'xl',
    image: NoImage,
  },
  amount: 110000,
  updated_at: '10-10-2020',
  shipping_date: '10-10-2020',
};

const OrderHistory = () => {
  return (
    <Box className="c-section-wrapin">
      <OrderList>
        <OrderHistoryItem {...mock} />
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
