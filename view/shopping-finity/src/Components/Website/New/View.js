import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Carousel, Collapse } from "react-bootstrap";
import axios from "axios";
import urlProduct from "../../../Utilities/Products/urlProduct";
import StartRating from "../../Manage Review/StartRating";
import urlReview from "../../../Utilities/Review/urlReview";
import { IoIosArrowDown } from "react-icons/io";

const View = ({show, onClose, productId}) =>{
    const [productById, setProductById] = useState(null);
    const [review, setReview] = useState(null);
    const [openMore, setOpenMore] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try{
                const data = await axios.get(urlProduct.API_URL_GET_BY_ID_PRODUCT, {params: {id: productId}});
                setProductById(data.data);
            }
            catch(error){
                console.log(error);
            }
        }
        getProduct();

        const reviewProduct = async () => {
            try{
                const reviews = await axios.get(urlReview.API_URL_GET_REVIEW_BY_PRODUCT, {params: {id: productId}});
                setReview(reviews.data);
                
            }
            catch(error){
                console.log(error);
            }
        }

        reviewProduct();

    }, [productId]);

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

    return(
        <>
            <Modal show={show} onHide={onClose} className="modalView">
                <Modal.Body>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    {productById && (
                        <Row>
                            <Col xs={5} md={5} lg={5}>
                                {productById.images && productById.images.length > 0 ? (
                                    <Carousel fade className="image-modal">
                                        {productById.images.map((img) => (
                                        <Carousel.Item>
                                            <img 
                                                className="w-100 h-100" 
                                                src={`http://localhost:7102/Upload/${img.imageName}`} 
                                            />
                                        </Carousel.Item>
                                        ))
                                        }
                                    </Carousel>
                                ) : (<>No Image avaible</>)}
                            </Col>
                            <Col xs={7} md={7} lg={7}>
                                <div className="prod-information">
                                    <div>
                                        <h5>{productById.productName}</h5>
                                        <span className="item-id">Item #{productById.productId}</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4>${productById.price}</h4>
                                    </div>
                                    <div>
                                        <div role="button" className="font-14"
                                            onClick={() => setOpenDetails(!openDetails)} 
                                            aria-controls="example-collapse-text" aria-expanded={openDetails}
                                        >
                                            <span className="font-12 pt-2 more-review">View details <IoIosArrowDown /></span>
                                        </div>
                                        <Collapse in={openDetails}>
                                            <div className="font-12">
                                                {productById.description}
                                            </div>
                                        </Collapse>
                                    </div>
                                    {review.length > 0 ? (
                                        review.map((rev) => (
                                        <div>
                                            <div 
                                                className="font-rating d-flex" 
                                                role="button" onClick={() => setOpenMore(!openMore)}
                                                aria-controls="example-collapse-text" aria-expanded={openMore}
                                            >
                                                <StartRating rating={rev.rating} />
                                                <span className="font-12 pt-2 mx-2 more-review">More <IoIosArrowDown /></span>
                                            </div>
                                            <Collapse in={openMore}>
                                                <div>
                                                    <label className="d-flex">{rev.title}</label>
                                                    <p className="font-13">{rev.description}</p>
                                                </div>
                                            </Collapse>
                                        </div>
                                        ))
                                    ) : (<div className="font-rating">
                                            ☆☆☆☆☆ 
                                            <span className="not-review">(Not review) </span>
                                        </div>) 
                                    }
                                    <hr></hr>
                                    <div>
                                        <h6>Color:</h6>
                                        {productById.images.length > 0 ? (
                                            <div 
                                                className="color-product" 
                                                // style={{backgroundColor: productById.images[0].color}}
                                                style={{backgroundColor: mapBackground[productById.images[0].color]}}
                                            >
                                            </div>
                                        ) : (<></>)
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <h6>Size:</h6>
                                        {/* <Row> */}
                                            {productById.sizeProducts.length > 0 && productById.sizeProducts.map((size) =>(
                                                // <Col xs={3} md={3} lg={3}>
                                                    <label className="product-size mt-2">
                                                        {size.sizeName}
                                                    </label>
                                                // </Col>
                                            ))}
                                        {/* </Row> */}
                                    </div>
                                    <div className="pt-5 d-flex justify-content-between">
                                        <h6>Quantity: <input type="number" className="quantity-for-cart" /></h6>
                                        <button className="addCart">Add To Cart</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default View;