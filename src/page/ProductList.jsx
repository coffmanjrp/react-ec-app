import { Box } from '@mui/material';
import { ProductCard } from 'components/Products';
import NoImage from 'assets/img/no_image.png';

const products = [
  {
    id: 1,
    name: 'Product One',
    images: [NoImage, NoImage, NoImage],
    price: 500.0,
  },
  {
    id: 2,
    name: 'Product Two',
    images: [NoImage, NoImage, NoImage],
    price: 300.0,
  },
  {
    id: 3,
    name: 'Product Three',
    images: [NoImage, NoImage, NoImage],
    price: 30.0,
  },
];

const ProductList = () => {
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
