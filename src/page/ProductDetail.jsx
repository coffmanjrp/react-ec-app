import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collection, doc, getDoc } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ImageSwiper, SizeTable } from 'components/Products';
import { db, timestamp } from 'db';
import { addProductToCart } from 'redux/users/actions';
import { returnCodeToBr } from 'utils';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(
    () => fetchProduct(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchProduct = async () => {
    const productsRef = await collection(db, 'products');
    const product = await doc(productsRef, id);
    const snapshot = await getDoc(product);
    const snapshotData = snapshot.data();

    const data = {
      pid: snapshot.id,
      ...snapshotData,
    };

    setProduct(data);
  };

  const addProduct = useCallback(
    (size) => {
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product?.description,
          gender: product?.gender,
          images: product?.images,
          name: product?.name,
          price: product?.price,
          pid: product?.pid,
          quantity: 1,
          size,
        })
      );
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
  );

  return (
    <Box component="section" className="c-section-wrapin">
      {product ? (
        <Box className="p-grid__row">
          <SliderBox>
            <ImageSwiper images={product?.images} />
          </SliderBox>
          <Detail>
            <Typography variant="h3" className="u-text__headline">
              {product?.name}
            </Typography>
            <Price variant="h4">$ {product?.price.toLocaleString()}</Price>
            <Box className="module-spacer--small" />
            <SizeTable sizes={product?.sizes} addProduct={addProduct} />
            <Box className="module-spacer--small" />
            <Typography variant="body1">
              {returnCodeToBr(product?.description)}
            </Typography>
          </Detail>
        </Box>
      ) : (
        <CircularProgress />
      )}
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
