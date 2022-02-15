import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoImage from 'assets/img/no_image.png';
import { deleteProduct } from 'redux/products/actions';

const ProductCard = ({ id, uid, name, images, price }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid: usersId } = useSelector((state) => state.users);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleClose();
    navigate(`/product/edit/${id}`);
  };

  const handleRemove = (id) => {
    handleClose();
    dispatch(deleteProduct(id));
  };

  return (
    <ProductCardRoot>
      <CardMedia
        sx={classes.media}
        image={images[0].path || NoImage}
        title={name}
        onClick={() => navigate(`/product/${id}`)}
      />
      <CardContent sx={classes.content}>
        <Box onClick={() => navigate(`/product/${id}`)}>
          <Typography variant="body1" color="textSecondary">
            {name}
          </Typography>
          <Price variant="body1">$ {price.toLocaleString()}</Price>
        </Box>
        {usersId === uid && (
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClick={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={() => handleRemove(id)}>Remove</MenuItem>
            </Menu>
          </>
        )}
      </CardContent>
    </ProductCardRoot>
  );
};

const ProductCardRoot = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    margin: 8,
    width: 'calc(50% - 16px)',
  },
  [theme.breakpoints.up('sm')]: {
    margin: 16,
    width: 'calc(33.333% - 32px)',
  },
}));

const Price = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.secondary.main,
}));

const classes = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 2,
    },
  },
  media: {
    paddingTop: '100%',
    height: 0,
  },
};

export default ProductCard;
