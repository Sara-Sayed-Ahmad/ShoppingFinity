import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import sliderFirst from '../../../image/imageHome/slider-first.jpg';
import sliderSecond from '../../../image/imageHome/image-2.avif';
import sliderThird from '../../../image/imageHome/image-3.jpg';
import { Button } from "react-bootstrap";

const CarouselHome = () => {
    return(
        <>
            <Carousel>
                <Carousel.Item className="size-carou">
                    {/* <sliderFirst text="First slide"/> */}
                    <img src={sliderFirst} text="First Slide" className="imgCarou"/>
                    <Carousel.Caption className="carsou-cap">
                        <h2 className="text-shopp">Shop Now for a Stylish Season!</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum. 
                          A pharetra augue mollis interdum, Nulla vitae elit libero, </p>
                        <Button className="button-shop">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="size-carou">
                    {/* <sliderFirst text="First slide"/> */}
                    <img src={sliderSecond} text="Second Slide" className="imgCarou"/>
                    <Carousel.Caption className="carsou-cap-image2">
                        <h2 className="text-shopp">Exclusive Offers Just for You!</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum. 
                          A pharetra augue mollis interdum, Nulla vitae elit libero, </p>
                        <Button className="button-shop">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="size-carou">
                    {/* <sliderFirst text="First slide"/> */}
                    <img src={sliderThird} text="Second Slide" className="imgCarou"/>
                    <Carousel.Caption className="carsou-cap">
                        <h2 className="text-shopp">Discover the Latest Trends!</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum. 
                          A pharetra augue mollis interdum, Nulla vitae elit libero, </p>
                        <Button className="button-shop">Shop Now</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default CarouselHome;