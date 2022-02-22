import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, IconButton, LinearProgress } from '@mui/material';
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
  const [progress, setProgress] = useState(0);

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
        const filename = `${id}-${uuidv4().toString()}`;
        const storageRef = ref(storage, `products/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const value =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(value);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              const newImage = { id: filename, path: downloadURL };
              setImages((prevState) => [...prevState, newImage]);
              setProgress(0);
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
        <>
          {progress > 0 ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          ) : (
            <>
              {images.length > 0 &&
                images.map((image) => (
                  <ImagePreview
                    key={image.id}
                    {...{ id: image.id, path: image.path, deleteImage }}
                  />
                ))}
            </>
          )}
        </>
      </Box>
      <Box className="u-text-right">
        <span>Upload image</span>
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
