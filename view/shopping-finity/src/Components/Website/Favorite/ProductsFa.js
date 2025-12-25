import axios from "axios";
import React, { useEffect, useState } from "react";
import urlFavorite from "../../../Utilities/Products/urlFavorite";
import { useParams } from "react-router-dom";
import { Carousel, Col, Row } from "react-bootstrap";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import urlProduct from "../../../Utilities/Products/urlProduct";
import { IoIosHeart } from "react-icons/io";
import View from "../New/View";

const ProductsFa = () =>{
    const [favorites, setFavorites] = useState([]);
    const {userId} = useParams();

    const [show, setShow] = useState(false);

    const [productIdview, setProductIdview] = useState(null);
    const [hoverProduct, setHoverProduct] = useState(null);

    useEffect(() =>{
        try{
            axios.get(urlFavorite.API_URL_GET_ALL_FAVORITES_BY_USER, {params: {id: userId}})
            .then((response) =>{
                const products = response.data;

                const productResponse = products.map((prod) => 
                    axios.get(urlProduct.API_URL_GET_BY_ID_PRODUCT, {params: {id: prod.productId}})
                )

                Promise.all(productResponse)
                .then((product) => {
                    const favoriteProduct = products.map((pro, index) =>({
                        ...pro,
                        product: product[index].data,
                    }));

                    setFavorites(favoriteProduct);
                    console.log(favoriteProduct);
                })
                .catch((error) => console.log(error));
            })
            .catch((err) => console.log(err));
        }
        catch(error){
            console.log(error);
        }
        console.log(favorites);
       
    }, [userId]);

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

    return(
        <>
        <Row className="pt-5 pb-5">
            <div className="pb-4">
                <h2 className="title-pro">My WishList <IoIosHeart /></h2>
            </div>
            {favorites.length > 0 ? (
                 favorites.map((prod) => (
                    <Col xs={3} md={3} lg={3} 
                    className="colum-image-news mb-5 div-button-carousel"
                    onMouseEnter={() => handleHover(prod.productId)}
                    onMouseLeave={handleLeave}
                    >
                        <Carousel fade className="div-img-hover">
                        {prod.product.images.map((img) => (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 image-product-sh" 
                                    src={`http://localhost:7102/Upload/${img.imageName}`} 
                                />
                                <Carousel.Caption className="tool-product">
                                <div className="justify-content-between d-flex">
                                    <div>
                                        <span className="price-product">${prod.product.price}</span>
                                    </div>
                                    <div className="">
                                        {/* <IoMdHeartEmpty className="heart-favorite"/> */}
                                        <MdOutlineAddShoppingCart className="cart-add"/>
                                    </div>
                                </div>
                                {hoverProduct === prod.productId && (
                                    <button className="button-view" onClick={() => viewProduct(prod.productId)}>View</button>
                                )
                                }
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                        </Carousel>
                        <div className="mx-2">
                            <label className="title-new-product" >
                                <span className="news">New</span>
                                {prod.product.productName.length > 28 ? (
                                    `${prod.product.productName.slice(0, 28)}`
                                ) : (prod.product.productName)
                                }
                                <span title={prod.product.productName}>
                                    ...
                                </span>
                            </label>
                        </div>
                    </Col>
                ))
                ) : (<></>)  
            }
        </Row>

        {/* Modal view product */}
        <View show={show} onClose={() => setShow(false)} productId={productIdview} />
        </>
    )
}

export default ProductsFa;