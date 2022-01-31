import { Box } from '@mui/material';
import { ProductCard } from 'components/Products';

const ProductList = () => {
  return (
    <Box component="section" className="c-section-wrapin">
      <Box className="p-grid__row">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Box>
    </Box>
  );
};

export default ProductList;
