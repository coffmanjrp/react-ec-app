import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { OrderedProducts } from 'components/Products';
import { TextDetail } from 'components/UIkit';
import { db } from 'db';
import { dateToString, dateTimeToString } from 'utils';

const OrderHistoryItem = ({ id, products, amount, uid }) => {
  const [orderedDate, setOrderedDate] = useState(null);
  const [shippingDate, setShippingDate] = useState(null);
  const price = `$ ${amount.toLocaleString()}`;

  useEffect(() => {
    getDates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDates = async () => {
    const usersRef = await collection(db, 'users');
    const userRef = await doc(usersRef, uid);
    const ordersRef = await collection(userRef, 'orders');
    const orderRef = await doc(ordersRef, id);
    const snapshot = await getDoc(orderRef);
    const data = snapshot.data();
    const updated_at = data.updated_at;
    const shipping_date = data.shipping_date;

    setOrderedDate(dateTimeToString(updated_at.toDate()));
    setShippingDate(dateToString(shipping_date.toDate()));
  };

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
