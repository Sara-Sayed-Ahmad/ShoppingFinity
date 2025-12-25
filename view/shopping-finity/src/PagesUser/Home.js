import React from "react";
import { Row } from "react-bootstrap";
import CarouselHome from "../Components/Website/Home/Carousel";
import Category from "../Components/Website/Home/CategoryProduct";
import OurProduct from "../Components/Website/Home/OurProduct";
import BestSaller from "../Components/Website/Home/BestSaller";
import CardsPro from "../Components/Website/Home/CardsPro";
import WintSumm from "../Components/Website/Home/WintSumm";
import Header from "../Components/Website/Header";
import Footer from "../Components/Website/Footer";
import Store from "../Components/Website/Cart/Store";
import { Provider } from "react-redux";

const Home = () => {
    return(
        <>
                {/* <Provider store={Store}> */}

            <div className="pb-5">
                <CarouselHome/>
            </div>
            <Category />
            <OurProduct />
            <BestSaller />
            <CardsPro />
            <WintSumm />
        </>
    );
}

export default Home;