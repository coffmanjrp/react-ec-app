import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    paddingTop: '100%',
    height: 0,
  },
  price: {
    fontSize: '1rem',
    color: theme.palette.secondary.main,
  },
}));

const ProductCard = ({ id, name, images, price }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0] || NoImage}
        title={name}
        onClick={() => navigate(`/product/${id}`)}
      />
      <CardContent className={classes.content}>
        <Box onClick={() => navigate(`/product/${id}`)}>
          <Typography variant="body1" color="textSecondary">
            {name}
          </Typography>
          <Typography variant="body1" className={classes.price}>
            $ {price}
          </Typography>
        </Box>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClick={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/product/edit/${id}`);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>Remove</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
