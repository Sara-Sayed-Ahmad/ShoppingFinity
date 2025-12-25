import React from "react";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import {ImWoman, ImMan} from 'react-icons/im';
import {MdOutlineBoy} from 'react-icons/md';
import {GiClothes} from 'react-icons/gi';
import BasicTable from "../Components/Product/BasicTable";
import TableDCategories from '../Components/Product/TableDCategories';

const Products = () =>{
    return(
        <>
            <div className="pages">
                <Row className="pt-4">
                    <Col xs={8} md={9} lg={9}>
                        <Card className="cards Card-dash">
                            <Card.Body className="h-auto">
                                <Row>
                                    <Col xs={4} md={4} lg={4} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Woman |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">$5,545</Card.Text>
                                                <span className="title-car">763 orders</span>
                                                <span class="text-success num-category">664</span>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <ImWoman />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={4} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Man |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">$3,590</Card.Text>
                                                <span className="title-car">588 orders</span>
                                                <span class="text-success num-category">354</span>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <ImMan />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={4}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Kids |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">$5,390</Card.Text>
                                                <span className="title-car">689 orders</span>
                                                <span class="text-success num-category">570</span>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <MdOutlineBoy />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={3} lg={3}>
                        <Card className="cards Card-dash">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Card.Title className="card-tit">
                                        All Products
                                        </Card.Title>
                                        <Card.Text className="card-text mb-1">1,588</Card.Text>
                                        <span className="title-car">Total Sales </span>
                                        <span className="title-car">$14,525</span>
                                    </div>
                                    <div>
                                        <div className="icon-card-num">
                                            <GiClothes />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col xs={8} md={9} lg={9}>
                        <Card className="cards">
                            <Card.Body className="h-auto">
                                <Row>
                                    <Col xs={4} md={4} lg={4} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Woman |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">1,826</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <ImWoman />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={4} className="border-right-card">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Man |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">828</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <ImMan />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={4}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="card-tit">
                                                    Kids |<small className="title-car"> Category</small>
                                                </Card.Title>
                                                <Card.Text className="card-text mb-1">998</Card.Text>
                                            </div>
                                            <div>
                                                <div className="icon-card-num">
                                                    <MdOutlineBoy />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={3} lg={3}>
                        <Card className="cards">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Card.Title className="card-tit">
                                        All Products
                                        </Card.Title>
                                        <Card.Text className="card-text mb-1">3,652</Card.Text>
                                    </div>
                                    <div>
                                        <div className="icon-card-num">
                                            <GiClothes />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className="pt-5">
                    <BasicTable/>
                </div>
                <div className="pt-5">
                    <TableDCategories />
                </div>
            </div>
        </>
    );
}

export default Products;