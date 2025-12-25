import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdLocalShipping } from "react-icons/md";
import { FaMoneyBill1 } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { TiTime } from "react-icons/ti";

const CardsPro = () => {
    return(
        <>
            <div className="container pt-5 pb-5 mt-2 mb-4">
                <Row>
                    <Col xs={3} md={3} lg={3} className="d-flex pt-3 column-card-pro">
                        <div className="pt-2 px-3">
                            <MdLocalShipping className="icons-shd"/>
                        </div>
                        <div>
                            <label className="label-product-data">Free Shipping </label>
                            <p className="font-12">Suffered Alteration in Some Form</p>
                        </div>
                    </Col>
                    <Col xs={3} md={3} lg={3} className="d-flex pt-3 column-card-pro">
                        <div className="pt-2 px-3">
                            <FaMoneyBill1 className="icons-shd"/>
                        </div>
                        <div>
                            <label className="label-product-data">Cath On Delivery </label>
                            <p className="font-12">The Internet Tend To Repeat</p>
                        </div>
                    </Col>
                    <Col xs={3} md={3} lg={3} className="d-flex pt-3 column-card-pro">
                        <div className=" pt-2 px-3">
                            <TbReload className="icons-shd"/>
                        </div>
                        <div>
                            <label className="label-product-data">45 Days Return</label>
                            <p className="font-12">Making it Look Like Readable</p>
                        </div>
                    </Col>
                    <Col xs={3} md={3} lg={3} className="d-flex pt-3 column-card-pro">
                        <div className="pt-2 px-3">
                            <TiTime className="icons-shd"/>
                        </div>
                        <div>
                            <label className="label-product-data">Opening All Week</label>
                            <p className="font-12">8AM - 09PM</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CardsPro;