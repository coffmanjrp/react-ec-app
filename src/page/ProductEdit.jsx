import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { ImageArea, SetSizeArea } from 'components/Products';
import { SelectBox, TextInput } from 'components/UIkit';
import { PrimaryButton } from 'components/UIkit/CustomButtons';
import { db } from 'db';
import { saveProduct } from 'redux/products/actions';
import { genders } from 'utils/data';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categories, users } = useSelector((state) => state);
  const { uid } = users;

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    if (id) {
      const docRef = await doc(db, 'products', id);
      const product = await getDoc(docRef);
      const data = product.data();

      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
      setGender(data.gender);
      setPrice(data.price);
      setSizes(data.sizes);
      setImages(data.images);
    }
  };

  const handleSave = () => {
    dispatch(
      saveProduct(
        id,
        uid,
        name,
        description,
        category,
        gender,
        price,
        images,
        sizes
      )
    );
  };

  return (
    <Box component="section">
      <Typography variant="h4" className="u-text__headline u-text-center">
        Register and edit product
      </Typography>
      <Box className="c-section-container">
        <ImageArea {...{ id, images, setImages }} />
        <TextInput
          type="text"
          label="Name"
          fullWidth={true}
          multiline={false}
          rows={1}
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          type="text"
          label="Description"
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
          options={categories.list}
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
          onChange={(e) => setPrice(e.target.value)}
        />
        <Box className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <Box className="module-spacer--small" />
        <Box className="center">
          <PrimaryButton label="Save" onClick={handleSave} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEdit;
