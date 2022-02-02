import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { PrimaryButton } from 'components/UIkit/CustomButtons';

const OrderedProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <List>
      <ListItem sx={classes.list}>
        <ListItemAvatar>
          <ListImage src={products.image} alt="Ordered Product" />
        </ListItemAvatar>
        <ListItemTextContainer>
          <ListItemText
            primary={products.name}
            secondary={`Size: ${products.size}`}
          />
          <ListItemText primary={`$ ${products.price}`} />
        </ListItemTextContainer>
        <PrimaryButton
          label="Details"
          onClick={() => navigate(`/product/${products.id}`)}
        />
      </ListItem>
    </List>
  );
};

const ListImage = styled('img')({
  margin: '8px 16px 8px 0',
  width: 96,
  height: 96,
  objectFit: 'cover',
});

const ListItemTextContainer = styled('div')({
  width: '100%',
});

const classes = {
  list: {
    height: 'auto',
    background: '#fff',
  },
};

export default OrderedProducts;
