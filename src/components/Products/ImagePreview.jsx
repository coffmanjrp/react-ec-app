import { Box } from '@mui/material';

const ImagePreview = ({ path }) => {
  return (
    <Box className="p-media__thumb">
      <img src={path} alt="Preview" />
    </Box>
  );
};

export default ImagePreview;
