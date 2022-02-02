import { useNavigate } from 'react-router-dom';
import { Box, List, Typography } from '@mui/material';
import { CartListItem } from 'components/Products';
import { GreyButton, PrimaryButton } from 'components/UIkit/CustomButtons';
import NoImage from 'assets/img/no_image.png';

const CartList = () => {
  const navigate = useNavigate();

  return (
    <Box component="section" className="c-section-wrapin">
      <Typography variant="h4" className="u-text__headline">
        Shopping Cart
      </Typography>
      <List sx={classes.root}>
        <CartListItem name="Test" image={NoImage} size="xl" price={1000} />
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
