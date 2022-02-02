import { styled } from '@mui/material/styles';
import { Box, Divider, List, Typography } from '@mui/material';
import { CartListItem } from 'components/Products';
import { TextDetail } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import NoImage from 'assets/img/no_image.png';

const OrderConfirm = () => {
  return (
    <Box component="section" className="c-section-wrapin">
      <Typography variant="h4" className="u-text__headline">
        Order Confirmation
      </Typography>
      <Box className="p-grid__row">
        <DetailBox>
          <List>
            <CartListItem name="Test" image={NoImage} size="xl" price={1000} />
          </List>
        </DetailBox>
        <OrderBox>
          <TextDetail label="Merchandise total" value={`$ ${10000}`} />
          <TextDetail label="Tax" value={`$ ${10000}`} />
          <TextDetail label="Postage" value={`$ ${10000}`} />
          <Divider />
          <TextDetail label="Total (including tax)" value={`$ ${10000}`} />
          <PrimaryButton label="Order Now" />
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
