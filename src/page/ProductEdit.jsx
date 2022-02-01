import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ImageArea, SetSizeArea } from 'components/Products';
import { PrimaryButton, SelectBox, TextInput } from 'components/UIkit';

const genders = [
  { id: 'all', name: 'All' },
  { id: 'male', name: 'Mens' },
  { id: 'female', name: 'Women' },
];

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const params = useParams();

  return (
    <Box component="section">
      <Typography variant="h4" className="u-text__headline u-text-center">
        Register and edit product
      </Typography>
      <Box className="c-section-container">
        <ImageArea />
        <TextInput
          type="text"
          label="Product Name"
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          type="text"
          label="Product Description"
          fullWidth={true}
          multiline={true}
          rows={5}
          required={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SelectBox
          label="Category"
          required={true}
          options={categories}
          value={category}
          select={setCategory}
        />
        <SelectBox
          label="Gender"
          required={true}
          options={genders}
          value={gender}
          select={setGender}
        />
        <TextInput
          type="number"
          label="Price"
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={price}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <Box className="module-spacer--small" />
        <Box className="center">
          <PrimaryButton label="Save" onClick={() => console.log('Save')} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEdit;
