import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { IoMdDoneAll } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BiSolidMessageSquareError } from "react-icons/bi";
import TableOrder from "../Components/Order/TableOrder.js";

const Orders = () =>{
    return(
        <>
            <div className="pages">
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Card className="cards">
                            <Card.Body className="h-auto">
                                <Row>
                                    <Col xs={3} md={3} lg={3} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    All |<small className="title-car"> Orders</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">12,689</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <FaShoppingCart /> 
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} md={3} lg={3} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Completed |<small className="title-car"> Orders</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1"> 10,344</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <IoMdDoneAll />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} md={3} lg={3} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Pending Payment |<small className="title-car"> Orders</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">245</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <GiSandsOfTime />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} md={3} lg={3}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Failed |<small className="title-car"> Orders</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">2,100</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <BiSolidMessageSquareError />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Table Order */}
                <div className="pt-5">
                    <TableOrder/>
                </div>
            </div>
        </>
    );
}

export default Orders;