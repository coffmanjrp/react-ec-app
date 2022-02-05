import { Box } from '@mui/material';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import NoImage from 'assets/img/no_image.png';

const ImageSwiper = ({ images }) => {
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  };

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <Box className="p-media__thumb">
          <img src={NoImage} alt="No Screen" />
        </Box>
      ) : (
        images.map((image) => (
          <Box key={image.id} className="p-media__thumb">
            <img src={image.path} alt={`Preview-${image.id}`} />
          </Box>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
