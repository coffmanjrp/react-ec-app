import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { ImageSwiper, SizeTable } from 'components/Products';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  return (
    <Box component="section" className="c-section-wrapings">
      <Box className="p-grid__row">
        <SliderBox>
          <ImageSwiper />
        </SliderBox>
        <Detail>
          <Typography variant="h3" className="u-text__headline">
            Product Name
          </Typography>
          <Price variant="h4">$ 500.00</Price>
          <Box className="module-spacer--small" />
          <SizeTable sizes={['XL', 'L', 'M']} />
          <Box className="module-spacer--small" />
        </Detail>
      </Box>
    </Box>
  );
};

const SliderBox = styled('div')(({ theme }) => ({
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
}));

const Detail = styled('div')(({ theme }) => ({
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
}));

const Price = styled(Typography)({
  fontSize: '2.25rem',
});

export default ProductDetail;
