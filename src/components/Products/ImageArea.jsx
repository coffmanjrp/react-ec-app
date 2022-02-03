import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ImagePreview } from '.';
import { storage } from 'db';

const ImageArea = ({ id, images, setImages }) => {
  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('Are you sure you want to delete?');

      if (!ret) {
        return false;
      } else {
        const filterdImages = images.filter((image) => image.id !== id);
        setImages(filterdImages);
        const storageRef = ref(storage, `products/${id}`);
        deleteObject(storageRef);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images]
  );

  const uploadImage = useCallback(
    async (e) => {
      return new Promise((resolve, reject) => {
        const file = e.target.files;
        const filename = `${id}-${uuidv4()}`;
        const storageRef = ref(storage, `products/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              const newImage = { id: filename, path: downloadURL };
              setImages((prevState) => [...prevState, newImage]);
            });
          }
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setImages]
  );

  return (
    <Box>
      <Box className="p-grid__list-images">
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview
              key={image.id}
              {...{ id: image.id, path: image.path, deleteImage }}
            />
          ))}
      </Box>
      <Box className="u-text-right">
        <span>Register images</span>
        <IconButton sx={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              type="file"
              id="image"
              className="u-display-none"
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </IconButton>
      </Box>
    </Box>
  );
};

const classes = {
  icon: {
    width: 48,
    height: 48,
  },
};

export default ImageArea;
