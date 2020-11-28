import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import Carousel from 'react-bootstrap/Carousel'
import image1 from '../images/welcome-banner.jpg'
import image2 from '../images/ew-banner.jpg'
import image3 from '../images/how-to-banner.png'
import image1m from '../images/welcome-banner-m.jpg'
import image2m from '../images/ew-banner-m.jpg'
import image3m from '../images/how-to-banner-m.jpg'

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="mt-2">
      <Carousel.Item>
        <Box display={{ xs: 'none', sm: 'block'  }}>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          />
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
        <img
          className="d-block w-100"
          src={image1m}
          alt="First slide"
          />
        </Box>
      </Carousel.Item>
      <Carousel.Item>
        <Box display={{ xs: 'none', sm: 'block', md: 'block'  }}>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
        <img
          className="d-block w-100"
          src={image2m}
          alt="Second slide"
        />
        </Box>
      </Carousel.Item>
      <Carousel.Item>
        <Box display={{ xs: 'none', sm: 'block' }}>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
        <img
          className="d-block w-100"
          src={image3m}
          alt="Third slide"
        />
        </Box>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
