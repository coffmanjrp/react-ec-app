import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { ProductCard } from 'components/Products';
import { fetchCategories } from 'redux/categories/actions';
import { fetchProducts } from 'redux/products/actions';
import { fetchUser, fetchProductsInCart } from 'redux/users/actions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
    dispatch(fetchProductsInCart());
    dispatch(fetchCategories());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="section" className="c-section-wrapin">
      <Box className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </Box>
    </Box>
  );
};

export default ProductList;
