import { Box, Divider } from '@mui/material';
import { OrderedProducts } from 'components/Products';
import { TextDetail } from 'components/UIkit';
import { dateToString, dateTimeToString } from 'utils';

const OrderHistoryItem = ({
  id,
  products,
  amount,
  updated_at,
  shipping_date,
}) => {
  const price = `$ ${amount.toLocaleString()}`;
  // const orderedDate = dateTimeToString(updated_at.toDate());
  // const shippingDate = dateToString(shipping_date.toDate());
  const orderedDate = updated_at;
  const shippingDate = shipping_date;

  return (
    <Box>
      <Box className="module-spacer--small" />
      <TextDetail label="Order ID" value={id} />
      <TextDetail label="Order Date" value={orderedDate} />
      <TextDetail label="Scheduled shipping date" value={shippingDate} />
      <TextDetail label="Order Amount" value={price} />
      <OrderedProducts products={products} />
      <Box className="module-spacer--extra-extra-small" />
      <Divider />
    </Box>
  );
};

export default OrderHistoryItem;
