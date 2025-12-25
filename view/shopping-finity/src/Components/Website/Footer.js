import React from "react";
import { Col, Row } from "react-bootstrap";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { Twitter } from "react-bootstrap-icons";
import { FaFacebookF, FaCcPaypal, FaCcVisa, FaCcDiscover, FaCcMastercard, FaCcAmex } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from '../../logo3.PNG';

const Footer = () => {
    return (
        <>
            <div className='backgroundFooter mt-3'>
                <div className="container">
                    <footer className="py-5">
                        <Row>
                            <Col xs={3} md={3} lg={3}>
                                <div className="footer-logo mt-4">
                                    <img src={logo} className="w-100 h-100"/>
                                </div>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                                <div>
                                    <h4>Contacts</h4>
                                </div>
                                <ul className="nav">
                                    <li className="mb-2 font-15 line-text">4060 Reppert Coal Road Jackson, MS 39201 USA</li>
                                    <li className="mb-2 font-15 line-text">(+123) 685 78 <br/>  (+064) 987 245</li>
                                    <li className="mb-2 font-15 line-text">Contact@yourcompany.com</li>
                                </ul>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                                <div>
                                    <h4>Information</h4>
                                </div>
                                <ul className="d-block nav">
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="/home" className="text-page-footer">Home</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="/new" className="text-page-footer">New</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">Category</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">My Order</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">Contact Us</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                                <div>
                                    <h4>Services</h4>
                                </div>
                                <ul className="d-block nav">
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="/home" className="text-page-footer">Returns</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">Site Map</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">Favorite</Link>
                                    </li>
                                    <li className="mb-2 font-15 line-text">
                                        <Link to="" className="text-page-footer">My Account</Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </footer>
                </div>
                <hr></hr>
                <div className="container pt-2 pb-4">
                    <Row>
                        <Col xs={4} md={4} lg={4}>
                            <div className="link-social">
                                <ul>
                                    <li>
                                        <a href="#"><FaFacebookF /></a>
                                    </li>
                                    <li>
                                        <a href="#"><RiInstagramFill /></a>
                                    </li>
                                    <li>
                                        <a href="#"><FaLinkedinIn /></a>
                                    </li>
                                    <li>
                                        <a href="#"><FaGoogle /></a>
                                    </li>
                                    <li>
                                        <a href="#"><Twitter /></a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={4} md={4} lg={4} className="text-center">
                            <div className="pt-2">
                                <p>© 2023 All Rights Sara Sayed Ahmad</p>
                            </div>
                        </Col>
                        <Col xs={4} md={4} lg={4}>
                            <div>
                                <ul className="nav float-end">
                                    <li className="icon-payment-footer">
                                        <FaCcPaypal className="font-35"/>
                                    </li>
                                    <li className="icon-payment-footer">
                                        <FaCcVisa className="font-35"/>
                                    </li>
                                    <li className="icon-payment-footer">
                                        <FaCcDiscover className="font-35"/>
                                    </li>
                                    <li className="icon-payment-footer">
                                        <FaCcMastercard className="font-35"/>
                                    </li>
                                    <li className="icon-payment-footer">
                                        <FaCcAmex className="font-35"/>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Footer;