import { Box, IconButton } from '@mui/material';
import { ImagePreview } from '.';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NoImage from 'assets/img/no_image.png';

const ImageArea = () => {
  return (
    <Box>
      <Box className="p-grid__list-images">
        <ImagePreview path={NoImage} />
      </Box>
      <Box className="u-text-right">
        <span>Register images</span>
        <IconButton sx={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input type="file" id="image" className="u-display-none" />
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
