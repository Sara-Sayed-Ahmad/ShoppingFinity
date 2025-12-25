import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import urlProduct from "../../../Utilities/Products/urlProduct";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import View from "./View";
import urlCategory from '../../../Utilities/Category/urlCategory';

const ProductNew = () => {
    const [newsProduct, setNewsProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false);

    const [productIdview, setProductIdview] = useState(null);
    const [hoverProduct, setHoverProduct] = useState(null);

    const [selectCategory, setSelectCategory] = useState([]);
    const [selectColor, setSelectColor] = useState([]);

    const [filters, setFilters] = useState(newsProduct);

    useEffect(() => {
        const getProducts = async () =>{
            try{
                const response = await axios.get(urlProduct.API_URL_GET_ALL_PRODUCTS);
                const allproduct = response.data;
    
                const currentMonthe = new Date().getMonth();
                const filterProdNews = allproduct.filter(pro => {
                    const prodData = new Date(pro.createdAt);
                    return prodData.getMonth() === currentMonthe;
                });
                setNewsProduct(filterProdNews);
                // setNewsProduct(response.data);
            }
            catch (error){
                console.log(error);
            }
        }

        getProducts();

        axios.get(urlCategory.API_URL_GET_CATEGORIES)
        .then((response) =>{
            setCategory(response.data);
        });
        
    }, []);

    const mapBackground = {
        Black: '#000000',
        'Navy Blue': '#000080',
        'Black And White': '#000000',
        White: '#FFFFFF',
        Brown: '#A52A2A',
        Multicolor: '#FFFFFF',
        Khaki: '#C3B091',
        'Army Green': '#4B5320',
        Blue: '#0000FF',
        Pink: '#FFC0CB',
        Apricot: '#FBCEB1',
        Burgundy: '#800020',
        Beige: '#F5F5DC',
        Gray: '#808080',
    }

    const colorName = Object.keys(mapBackground);

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

    const updateFilter = () =>{
        let filterProduct = newsProduct;
        console.log(filterProduct);

        if(selectCategory.length > 0){
            filterProduct = filterProduct.filter((product) =>
                selectCategory.includes(product.categoryId)
            );
        }else{
            setFilters(newsProduct);
        }

        if(selectColor.length > 0){
            filterProduct = filterProduct.filter((product) =>{
                const ColorS = product.images.some((image) => {
                    const colorMatch = selectColor.includes(image.color);
                    console.log(`Product ID ${product.productId}, Color ${image.color}, Match: ${colorMatch}`);
                    return colorMatch;
                })
                return ColorS;
            });
        }else{
            setFilters(newsProduct);
        }

        setFilters(filterProduct);
    }

    useEffect(() =>{
        updateFilter();
    }, [selectCategory, selectColor]);

    return(
    <>
        <div className="px-4 mx-4">
            <Row className="pt-5 pb-5">
                <Col xs={2} md={2} lg={2} className="padding-news">
                    <div>
                        <label>Filter</label>
                        <hr></hr>
                    </div>
                    <div>
                        <h6>Category</h6>
                        {category.map((cate) =>(
                            <div className="pb-2">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    value={cate.categoryId} 
                                    checked={selectCategory.includes(cate.categoryId)}
                                    onChange={(e) => {
                                        if(e.target.checked){
                                            setSelectCategory([...selectCategory, cate.categoryId]);
                                        }
                                        else{
                                            setSelectCategory(
                                                selectCategory.filter(c => c !== cate.categoryId)
                                            );
                                        }
                                    }}
                                />
                                <label className="px-2 font-13">{cate.categoryName}</label>
                            </div>
                        ))}
                    </div>
                    <div className="pt-3">
                        <h6 className="pb-2">Color</h6>
                        <Row>
                            {colorName.map((color) =>(
                                <Col xs={3} md={3} lg={3} className="d-flex px-1">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        value={mapBackground[color]} 
                                        checked={selectColor.includes(color)}
                                        onChange={(e) =>{
                                            if(e.target.checked){
                                                setSelectColor([...selectColor, color]);
                                            }
                                            else{
                                                setSelectColor(
                                                    selectColor.filter(co => co !== color)
                                                );
                                            }
                                        }}
                                    />
                                    <div className="p-2 colorFilter" style={{backgroundColor: mapBackground[color]}}></div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col xs={10} md={10} lg={10}>
                    <Row>
                    {filters.length > 0 ?(
                        filters.map((prod) => (
                        <Col xs={3} md={3} lg={3} 
                        className="colum-image-news mb-5 div-button-carousel"
                        onMouseEnter={() => handleHover(prod.productId)}
                        onMouseLeave={handleLeave}
                        >
                            <Carousel fade className="div-img-hover">
                            {prod.images.map((img) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 image-product-sh" 
                                        src={`http://localhost:7102/Upload/${img.imageName}`} 
                                    />
                                    <Carousel.Caption className="tool-product">
                                        <div className="justify-content-between d-flex">
                                            <div>
                                                <span className="price-product">${prod.price}</span>
                                            </div>
                                            <div className="">
                                                <IoMdHeartEmpty className="heart-favorite"/>
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
                                    {prod.productName.length > 28 ? (
                                        `${prod.productName.slice(0, 28)}`
                                    ) : (prod.productName)
                                    }
                                    <span title={prod.productName}>
                                        ...
                                    </span>
                                </label>
                            </div>
                        </Col>
                    ))
                    ) : (newsProduct.map((prod) => (
                        <Col xs={3} md={3} lg={3} 
                        className="colum-image-news mb-5 div-button-carousel"
                        onMouseEnter={() => handleHover(prod.productId)}
                        onMouseLeave={handleLeave}
                        >
                            <Carousel fade className="div-img-hover">
                            {prod.images.map((img) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 image-product-sh" 
                                        src={`http://localhost:7102/Upload/${img.imageName}`} 
                                    />
                                    <Carousel.Caption className="tool-product">
                                    <div className="justify-content-between d-flex">
                                        <div>
                                            <span className="price-product">${prod.price}</span>
                                        </div>
                                        <div className="">
                                            <IoMdHeartEmpty className="heart-favorite"/>
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
                                    {prod.productName.length > 28 ? (
                                        `${prod.productName.slice(0, 28)}`
                                    ) : (prod.productName)
                                    }
                                    <span title={prod.productName}>
                                        ...
                                    </span>
                                </label>
                            </div>
                        </Col>
                    ))) }
                    </Row>
                </Col>
            </Row>
            
            {/* Modal view product */}
            <View show={show} onClose={() => setShow(false)} productId={productIdview} />
        </div>
    </>
    );
}

export default ProductNew;