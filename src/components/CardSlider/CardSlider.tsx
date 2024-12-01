/* eslint-disable react/react-in-jsx-scope */
import { Box, Theme, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import { CardSliderProps } from "./CardSlider.types";
import { styles } from "./CardSlider.styles";

const CardSlider = <T extends { _id: string }>({ data, children, settings }: CardSliderProps<T>) => {
  const isSingleItem = data.length === 1;
  const defaultSettings = {
    infinite: true, // Enable infinite loop
    speed: 500, // Transition speed
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    ...settings,
  };
  return (
    <Box sx={styles.boxContainerStyles}>
      <Slider {...defaultSettings}>
        {data.map((item) => (
          <Box key={item._id} sx={styles.sliderItemStyles}>
            {typeof children === 'function' ? children(item) : children}
          </Box>
        ))}
      </Slider>
    </Box>
  )
  
};

export default CardSlider;



