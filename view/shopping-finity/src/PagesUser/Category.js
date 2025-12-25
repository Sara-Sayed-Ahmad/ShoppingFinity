import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import urlProduct from "../Utilities/Products/urlProduct";
import urlDetailsCateg from "../Utilities/Category/urlDetailsCateg";
import { Carousel, Col, Row } from "react-bootstrap";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";
import View from "../Components/Website/New/View";

const Category = () =>{
    const {category} = useParams();
    const [ProductCategory, setProductCategory] = useState([]);
    const [show, setShow] = useState(false);

    const [productIdview, setProductIdview] = useState(null);
    const [hoverProduct, setHoverProduct] = useState(null);

    const getProducts = async () =>{
        try{
            const detailsCategory = await axios.get(urlDetailsCateg.API_URL_GET_DETAILS_BY_ID_CATEGORY, {params: {id: category}});
            const detailData = detailsCategory.data;

            const productsAll = await Promise.all(detailData.map(async detail =>{
                const detailProduct = await axios.get(urlProduct.API_URL_GET_BY_ID_DETAIL, {params: {id: detail.detailsId}})
                const productsResponse = detailProduct.data;

                const imageforProduct = await Promise.all(productsResponse.map(async pro => {
                    console.log(pro.productId);
                    const image = await axios.get(urlProduct.API_URL_GET_IMAGE_BY_ID, {params: {idProduct: pro.productId}});
                    const imageResponse = image.data;

                    console.log(imageResponse);
                    return {...pro, images: imageResponse};
                }));

                return {...detail, products: imageforProduct};
            }));

            setProductCategory(productsAll);
            console.log(ProductCategory);
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [category]);

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
            <div>
            {ProductCategory.map((detail) =>(
                <div className="pt-5">
                    <Row className="text-center">
                        <h4 className="pb-4 title-pro">{detail.detailName}</h4>
                    </Row>
                    <Row className="px-5">
                    {detail.products.map((product) =>(
                        <Col 
                            xs={3} md={3} lg={3} 
                            className="colum-image mb-5 div-button-carousel"
                            onMouseEnter={() => handleHover(product.productId)}
                            onMouseLeave={handleLeave}
                        >
                            <Carousel fade className="div-img-hover">
                            {product.images && product.images.map((img) =>(
                                <Carousel.Item>
                                    <img src={`http://localhost:7102/Upload/${img.imageName}`} className="w-100"/>
                                    <Carousel.Caption className="tool-product">
                                        <div className="justify-content-between d-flex">
                                            <div>
                                                <span className="price-product">${product.price}</span>
                                            </div>
                                            <div className="">
                                                <IoMdHeartEmpty className="heart-favorite"/>
                                                <MdOutlineAddShoppingCart className="cart-add"/>
                                            </div>
                                        </div>
                                        {hoverProduct === product.productId && (
                                            <div className="text-center">
                                                <button style={{left: '117px'}} className="button-view" onClick={() => viewProduct(product.productId)}>View</button>
                                            </div>
                                        )}
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                            </Carousel>
                            <div className="mx-2">
                                <label className="title-new-product" >
                                    {product.productName.length > 48 ? (
                                        `${product.productName.slice(0, 28)}`
                                    ) : (product.productName)
                                    }
                                    <span title={product.productName}>
                                        ...
                                    </span>
                                </label>
                            </div>
                        </Col>
                    ))}
                    </Row>
                </div>
            ))}
            </div>

            {/* Modal view product */}
            <View show={show} onClose={() => setShow(false)} productId={productIdview} />
        </>
    );
}

export default Category;