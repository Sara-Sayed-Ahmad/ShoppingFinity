import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useAuthContext } from "../Context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import urlAddData from '../Utilities/Customer/urlAddData';
import axios from "axios";

const Cart = () =>{
    const cartItems = useSelector((state) => state.cart.cartItems);
    const {userId} = useAuthContext();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');

    const [discount, setDiscount] = useState([]);

    const mapBackground = {
        Black: '#000000',
        White: '#FFFFFF',
        Brown: '#A52A2A',
        Beige: '#F5F5DC',
        'Navy Blue': '#000080',
        'Black And White': '#000000',
        Multicolor: '#FFFFFF',
        Khaki: '#C3B091',
        'Army Green': '#4B5320',
        Blue: '#0000FF',
        Pink: '#FFC0CB',
        Apricot: '#FBCEB1',
        Burgundy: '#800020',
        Gray: '#808080',
        Green: '#00FF00',
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

    // useEffect(() =>{

    // }, []);
    
    return(
        <>
            <div className="pt-5 pb-5">
                <div className="container-cart">
                    <Row>
                        <Col xs={8} md={8} lg={8}>
                            <div className="cart-item">
                                <h4>All Items (2)</h4>
                                <hr></hr>
                                {cartItems.length > 0 ? (cartItems.map((product) => (
                                    <Row className="pt-2 pb-2">
                                        <Col xs={3} md={3} lg={3}>
                                            <img 
                                                src={`http://localhost:7102/Upload/${product.images[0].imageName}`}
                                                className="w-100 image-product-cart"
                                            />
                                        </Col>
                                        <Col xs={9} md={9} lg={9}>
                                            <label>{product.productName}</label>
                                            <div className="pt-1">
                                                <label className="d-flex pt-1">Size:</label>
                                                {product.sizeProducts.length > 0 && product.sizeProducts.map((size) =>(
                                                    <label className="product-size-cart mt-2">
                                                        {size.sizeName}
                                                    </label>
                                                ))}
                                            </div>
                                            <label className="pt-1">Color:</label>
                                            <div 
                                                style={{backgroundColor: mapBackground[product.images[0].color]}} 
                                                className="color-product-cart mt-1"
                                            />
                                            <div className="d-flex justify-content-between mt-4">
                                                <span>${product.price}</span>
                                                <div className="d-flex">
                                                    <div className="mx-2">
                                                        <span className="discounter-cart">-</span>
                                                        <span className="quantity-cart">1</span>
                                                        <span className="counter-cart">+</span>
                                                    </div>
                                                    <div className="mx-2">
                                                        <IoMdHeartEmpty 
                                                            className="icon-cart-hd"
                                                            key={product.productId} 
                                                            onClick={() => {
                                                                onAddFavorite(userId, product.productId)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mx-2">
                                                        <MdDelete className="icon-cart-hd"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                ))) : (
                                    <div className="text-center pt-5 pb-5 mb-3">
                                        <div className="mb-1">
                                            <CiShoppingCart className="cart-empty"/>
                                        </div>
                                        <h3 className="empty-title mb-3">Your Cart is empty</h3>
                                        <button className="btn-shop">
                                            <Link to={`/new/${userId}`} className="shopNow">Shop Now</Link>
                                        </button>
                                    </div>
                                ) 
                                }
                            </div>
                        </Col>
                        <Col xs={4} md={4} lg={4}>
                            <div className="cart-item">
                                <h4>Order Summary</h4>
                                <div>
                                    <label className="mb-2 mt-2 tit-card">Total: </label>
                                    <label className="mx-2">$305</label>
                                    <Row className="mb-2">
                                        {/* <Form.Group className="mb-3"> */}
                                            <Col xs={3} md={3} lg={3}>
                                                <Form.Label className="tit-card mt-2">Discount</Form.Label>
                                            </Col>
                                            <Col xs={9} md={9} lg={9}>
                                                <Form.Select className="font-14">
                                                    <option>Select...</option>
                                                    <option>No discount</option>
                                                </Form.Select>
                                            </Col>
                                        {/* </Form.Group> */}
                                    </Row>
                                    <Row className="mb-2">
                                        {/* <Form.Group className="mb-3"> */}
                                            <Col xs={3} md={3} lg={3}>
                                                <Form.Label className="tit-card mt-2">Payment </Form.Label>
                                            </Col>
                                            <Col xs={9} md={9} lg={9}>
                                                <Form.Select className="font-14">
                                                    <option>Select...</option>
                                                    <option>Credit Card</option>
                                                    <option>PayPal</option>
                                                </Form.Select>
                                            </Col>
                                        {/* </Form.Group> */}
                                    </Row>
                                </div>
                                <div className="w-100 w-100 mt-5 mb-3">
                                    <button className="Checkout w-100">Checkout Now</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Cart;