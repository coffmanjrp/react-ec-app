import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { ImageSwiper, SizeTable } from 'components/Products';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      width: 320,
      height: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: 400,
      height: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      width: 320,
      height: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: 400,
      height: 'auto',
    },
  },
  price: {
    fontSize: '2.25rem',
  },
}));

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const classes = useStyles();

  return (
    <Box component="section" className="c-section-wrapings">
      <Box className="p-grid__row">
        <Box className={classes.sliderBox}>
          <ImageSwiper />
        </Box>
        <Box className={classes.detail}>
          <Typography variant="h3" className="u-text__headline">
            Product Name
          </Typography>
          <Typography variant="h4" className={classes.price}>
            $ 500.00
          </Typography>
          <Box className="module-spacer--small" />
          <SizeTable sizes={['XL', 'L', 'M']} />
          <Box className="module-spacer--small" />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
