import { Box } from '@mui/material';

const ImagePreview = ({ id, path, deleteImage }) => {
  return (
    <Box
      sx={classes.thumbnail}
      className="p-media__thumb"
      onClick={() => deleteImage(id)}
    >
      <img src={path} alt="Preview" />
    </Box>
  );
};

const classes = {
  thumbnail: {
    cursor: 'pointer',
  },
};

export default ImagePreview;
