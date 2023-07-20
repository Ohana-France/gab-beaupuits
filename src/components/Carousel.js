import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Slider from "react-slick";

// eslint-disable-next-line
export const Carousel = ({
    images,
    selectedIndex,
    height
}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: selectedIndex
    };
    return (
        <Slider {...settings}>
            {images.map((image, index) =>
                <div style={{ height: height * 0.9, width: '100%' }} key={index}>
                    <GatsbyImage
                        style={{ height: height * 0.9 }}
                        imgStyle={{ height: height * 0.9, objectFit: 'contain' }}
                        image={getImage(image)}
                        alt={"image-" + index} /></div>)}
        </Slider>
    );

};