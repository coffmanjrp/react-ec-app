import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { PrimaryButton } from 'components/UIkit/CustomButtons';

const OrderedProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.id} sx={classes.list}>
          <ListItemAvatar>
            <ListImage src={product.images[0].path} alt={product.name} />
          </ListItemAvatar>
          <ListItemTextContainer>
            <ListItemText
              primary={product.name}
              secondary={`Size: ${product.size}`}
            />
            <ListItemText primary={`$ ${product.price}`} />
          </ListItemTextContainer>
          <PrimaryButton
            label="Details"
            onClick={() => navigate(`/product/${product.id}`)}
          />
        </ListItem>
      ))}
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
