import React, { useEffect, useState } from "react";
import { Alert, Carousel, Col, Row } from "react-bootstrap";
import { IoShirt } from "react-icons/io5";
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";
import urlProduct from "../../../Utilities/Products/urlProduct";
import urlAddData from '../../../Utilities/Customer/urlAddData';
import { useLocation, useParams } from "react-router-dom";
import urlFavorite from "../../../Utilities/Products/urlFavorite";
import View from "../New/View";
import { Provider, useDispatch } from "react-redux";
import Store from "../Cart/Store";
import { addToCart } from "../Cart/CartSlice";

const OurProduct = () => {
    const [product, setProduct] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [show, setShow] = useState(false);

    const [productIdview, setProductIdview] = useState(null);
    const [hoverProduct, setHoverProduct] = useState(null);

    const [selectCategory, setSelectCategory] = useState('All');
    const [buttonActive, setButtonActive] = useState('All');

    const [showAlert, setShowAlert] = useState(false);
    
    const { userId } = useParams();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');

    const dispatch = useDispatch();
    
    useEffect(() => {
        axios.get(urlProduct.API_URL_GET_ALL_PRODUCTS)
        .then((res) => {
            console.log(userId);
            setProduct(res.data)
        })
        .catch((err) => console.log(err));

        axios.get(urlFavorite.API_URL_GET_ALL_FAVORITES_BY_USER, {params: {id: userId}})
        .then((resp) =>{
            setFavorites(resp.data);
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

    const filterProduct = product.filter(pro => {
        if (buttonActive === 'All' || buttonActive === 0) {
            return true; // Show all products when 'All' is selected
        }
        else{
            return pro.categoryId === buttonActive;
        }
    });

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

    const onAddFavorite = (Id, ProductId) =>{
        // addFavorite(Id, product);
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
    
    return (
        <>
            <div className="px-3 text-center position-relative pb-5 carsousel-products">
                <div className="pb-4">
                    <h2 className="title-pro">Our Product</h2>
                    <div className="icon-div-pro">
                        <IoShirt className="icon-products" />
                    </div>
                </div>
                <div>
                    <button className={`mx-3 ${buttonActive === 'All' ? 'button-prod-active' : 'button-prod'}`}
                        onClick={() => {
                            setSelectCategory('All');
                            setButtonActive('All');
                        }}
                    >All</button>
                    <button className={`mx-3 ${buttonActive === 1 ? 'button-prod-active' : 'button-prod'}`}
                        onClick={() => {
                            setSelectCategory(1);
                            setButtonActive(1)
                        }}
                    >Woman</button>
                    <button className={`mx-3 ${buttonActive === 1002 ? 'button-prod-active' : 'button-prod'}`}
                        onClick={() => {
                            setSelectCategory(1002);
                            setButtonActive(1002);
                        }}
                    >Man</button>
                    <button className={`mx-3 ${buttonActive === 1003 ? 'button-prod-active' : 'button-prod'}`}
                        onClick={() => {
                            setSelectCategory(1003);
                            setButtonActive(1003);
                        }}
                    >Kids & Baby</button>
                </div>
                    <Carousel>
                        {chunkArray(filterProduct, 4).map((row, rowIndex) => (
                        <Carousel.Item key={rowIndex} className="product-carousel-item">
                                {/* {favorites.map((fav) => ( */}
                            <Row className="p-4 px-5">
                            {row.map((prod, colIndex) => (
                                <Col 
                                    key={colIndex} 
                                    sx={3} md={3} lg={3} 
                                    className="colum-image"
                                    onMouseEnter={() => handleHover(prod.productId)}
                                    onMouseLeave={handleLeave}
                                >
                                    <Carousel fade className="img-carousel">
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
                                                            <div>
                                                                {favorites.productId === prod.productId ? (
                                                                    <IoIosHeart />
                                                                ) : (
                                                                    <IoMdHeartEmpty 
                                                                    className="heart-favorite"
                                                                    key={prod.productId} 
                                                                    onClick={() => {
                                                                        onAddFavorite(userId, prod.productId)
                                                                    }}
                                                                />
                                                                )}
                                                                <MdOutlineAddShoppingCart 
                                                                    className="cart-add"
                                                                    onClick={() => {
                                                                        dispatch(addToCart(prod));
                                                                        // setShowAlert(true);
                                                                        alert("Added in cart")
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        {hoverProduct === prod.productId && (
                                                            <button 
                                                                className="button-view" style={{left: '116px'}}
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
                            {/* ))} */}

                        </Carousel.Item>
                        ))}
                    </Carousel>   
            </div>
            
            {/* Modal view product */}
            <View show={show} onClose={() => setShow(false)} productId={productIdview} />
        </>
    );
}

export default OurProduct;