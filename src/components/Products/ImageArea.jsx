import { makeStyles } from '@mui/styles';
import { Box, IconButton } from '@mui/material';
import { ImagePreview } from '.';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NoImage from 'assets/img/no_image.png';

const useStyles = makeStyles({
  icon: {
    width: 48,
    height: 48,
  },
});

const ImageArea = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className="p-grid__list-images">
        <ImagePreview path={NoImage} />
      </Box>
      <Box className="u-text-right">
        <span>Register product images</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input type="file" id="image" className="u-display-none" />
          </label>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageArea;
