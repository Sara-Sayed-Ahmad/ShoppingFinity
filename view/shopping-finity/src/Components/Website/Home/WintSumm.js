import React, { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { IoShirt } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import sliderFirst from '../../../image/profile4.avif';
import axios from "axios";
import urlProduct from "../../../Utilities/Products/urlProduct";
import { useLocation, useParams } from "react-router-dom";
import urlAddData from '../../../Utilities/Customer/urlAddData';
import View from "../New/View";

const WintSumm = () => {
    const [product, setProduct] = useState([]);
    const [selectSeason, setSelectSeason] = useState('Winter');
    const [buttonActive, setButtonActive] = useState('Winter');

    const [show, setShow] = useState(false);

    const [productIdview, setProductIdview] = useState(null);
    const [hoverProduct, setHoverProduct] = useState(null);
     
    const { userId } = useParams();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    
    useEffect(() => {
        axios.get(urlProduct.API_URL_GET_ALL_PRODUCTS)
        .then((res) => {
            setProduct(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const onAddFavorite = (Id, ProductId) =>{
        const dataProduct = {ProductId, Id}

        axios.post(urlAddData.API_URL_POST_ADD_FAVORITE, dataProduct, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => console.log(error));
    } 

    const filterProduct = product.filter(prod => prod.season === selectSeason);

    const viewProduct = (id) =>{
        setShow(true);
        setProductIdview(id);
    }

    const handleHover = (id) =>{
        setHoverProduct(id);
    }

    const handleLeave = () => {
        setHoverProduct(null);
    }
    
    return (
        <>
            <div className="px-3 text-center position-relative pb-5 carsousel-products">
                <div className="pb-4">
                    <h2 className="title-pro">Product</h2>
                    <div className="icon-div-pro">
                        <IoShirt className="icon-products" />
                    </div>
                </div>
                <div className="pt-1 pb-1">
                    <button className={`mx-3 ${buttonActive === 'Winter' ? 'button-prod-active' : 'button-prod'}`} onClick={() => {
                        setSelectSeason('Winter');
                        setButtonActive('Winter');
                    }}>Winter</button>
                    <button className={`mx-3 ${buttonActive === 'Summer' ? 'button-prod-active' : 'button-prod'}`} onClick={() => {
                        setSelectSeason('Summer');
                        setButtonActive('Summer');
                    }}>Summer</button>
                </div>
                <Carousel>
                    {chunkArray(filterProduct, 4).map((row, rowIndex) => (
                    <Carousel.Item key={rowIndex} className="product-carousel-item">
                        <Row className="p-4 px-5">
                        {row.map((prod, colIndex) => (
                            <Col 
                                key={colIndex} 
                                sx={3} md={3} lg={3}
                                className="colum-image"
                                onMouseEnter={() => handleHover(prod.productId)}
                                onMouseLeave={handleLeave}
                            >
                                <Carousel className="img-carousel">
                                    {prod.images.map((image, imgIndex) => (
                                    <Carousel.Item>
                                        <img
                                        key={imgIndex}
                                        className="d-block w-100 image-product-sh"
                                        src={`http://localhost:7102/Upload/${image.imageName}`}
                                        alt={`Product ${prod.name} - Image ${imgIndex + 1}`}
                                        />
                                            <div>
                                                <Carousel.Caption className="tool-product">
                                                    <div className="justify-content-between d-flex">
                                                        <div>
                                                            <span className="price-product">${prod.price}</span>
                                                        </div>
                                                        <div className="">
                                                            <IoMdHeartEmpty 
                                                                className="heart-favorite"
                                                                key={prod.productId} 
                                                                onClick={() => {
                                                                    onAddFavorite(userId, prod.productId)
                                                                }}
                                                            />
                                                            <MdOutlineAddShoppingCart className="cart-add"/>
                                                        </div>
                                                    </div>
                                                    {hoverProduct === prod.productId && (
                                                        <button 
                                                            className="button-view"
                                                            style={{left: '116px'}}
                                                            onClick={() => viewProduct(prod.productId)}
                                                        >View</button>
                                                    )
                                                    }
                                                </Carousel.Caption>
                                            </div>
                                    </Carousel.Item>
                                    ))}

                                </Carousel>
                            </Col>
                        ))}
                        </Row>
                    </Carousel.Item>
                    ))}
                </Carousel>                
            </div>

            {/* Modal view product */}
            <View show={show} onClose={() => setShow(false)} productId={productIdview} />
        </>
    );
}

export default WintSumm;