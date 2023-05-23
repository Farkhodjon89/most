import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { monoDarkBlack } from '../../../styles/colorPalette';
import { products } from '../../../../products';
import ProductCard from './ProductCard';
import cx from 'classnames';
import { useState } from 'react';
// import { Button } from '../../../components/Button';

const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginBottom: '24px',
  },
  arrowIcon: {
    fontSize: theme.typography.pxToRem(15),
    color: monoDarkBlack,
  },
  slider: {
    '&.slick-slider::before': {
      content: '""',
      position: 'absolute',
      width: '100px',
      height: '100%',
      background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 66.07%, rgba(255, 255, 255, 0) 100%)',
      zIndex: 1,
      right: 0,
    },
  },
}));

const ProductsSlider = ({ title }: any) => {
  const { classes } = useStyles();
  const [index, setIndex] = useState(0);

  const SliderPrevArrow = (props) => (
    <Box className="sliderPrevArrow" onClick={props.onClick}>
      <i className={cx('ui_left-arrow', classes.arrowIcon)}></i>
    </Box>
  );

  const SliderNextArrow = (props) => (
    <Box className="sliderNextArrow" onClick={props.onClick}>
      <i className={cx('ui_right-arrow', classes.arrowIcon)}></i>
    </Box>
  );

  const settings = {
    infinite: false,
    slidesToShow: 7.5,
    slidesToScroll: 1,
    afterChange: (newIndex) => {
      setIndex(newIndex);
    },

    prevArrow: index > 0 && <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  // @ts-ignore
  return (
    <>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <Slider {...settings} className={classes.slider}>
        {products.map((product) => (
          <ProductCard slider={'slider'} key={product.id} product={product} />
        ))}
      </Slider>
    </>
  );
};

export default ProductsSlider;
