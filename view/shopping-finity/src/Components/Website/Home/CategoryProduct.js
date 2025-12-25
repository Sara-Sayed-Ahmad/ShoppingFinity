import React from "react";
import woman from '../../../image/imageCategory/woman.jpg';
import man from '../../../image/imageCategory/man.jpg';
import kidsbaby from '../../../image/imageCategory/kids.jpg';
import { Col, Row } from "react-bootstrap";

const CategoryProduct = () =>{
    return(
        <>
            <div className="container pb-5">
                <Row className="margin0">
                    <Col xs={4} md={4} lg={4}>
                        <div className="img-categ">
                            <img src={woman} />
                        </div>
                        <label className="woman-cate">Woman</label>
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                        <div className="img-categ">
                            <img src={man} />
                        </div>
                        <label className="man-cate">Man</label>
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                        <div className="img-categ">
                            <img src={kidsbaby} />
                        </div>
                        <label className="kids-cate">Kids & Baby</label>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CategoryProduct;