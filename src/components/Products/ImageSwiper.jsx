import { Box } from '@mui/material';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import NoImage from 'assets/img/no_image.png';

const ImageSwiper = () => {
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
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
      <Box className="p-media__thumb">
        <img src={NoImage} alt="DUMMY" />
      </Box>
    </Swiper>
  );
};

export default ImageSwiper;
