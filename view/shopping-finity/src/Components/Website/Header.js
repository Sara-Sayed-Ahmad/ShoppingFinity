import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Form, Navbar, NavLink, ListGroup, NavDropdown } from "react-bootstrap";
import logoWebsite from '../../logoWebsite.PNG';
import { IoPerson } from "react-icons/io5";
import { IoMdHeartEmpty, IoIosHeart  } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import urlCategory from "../../Utilities/Category/urlCategory";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthProvider";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {userId, token} = useAuthContext();

    const categoryChange = (category) =>{
        navigate(`category/${category}/${userId}`);
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get(urlCategory.API_URL_GET_CATEGORIES)
        .then((res) => setCategory(res.data))
        .catch((err) => console.log(err));

    }, []);

    return(
        <>
        <div className="header-section">
            <div className="header-top pt-3">
                <div className="container pb-3">
                    <Row>
                        <Col sx={3} md={3} lg={3}>
                            <div>
                                <img src={logoWebsite} />
                            </div>
                        </Col>
                        <Col sx={7} md={7} lg={7}>
                            <Form>
                                <Form.Group className="pt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="search" placeholder="Search.." className="search-web"/>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sx={2} md={2} lg={2}>
                            <div className="d-flex float-end">
                                <div className="icon-header">
                                    <Link to={`/favorite/${userId}`}><IoMdHeartEmpty className="font-20 icons-pages"/></Link>
                                </div>
                                <div className="icon-header">
                                    <Link to={`/cart/${userId}}?token=${token}`}>
                                        <GiShoppingCart className="font-23 icons-pages"/>
                                    </Link>
                                </div>
                                <div className="icon-header">
                                    <IoPerson className="font-18 icons-pages"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="bg-navbar">
                    <div className="container">
                        <Navbar>
                            <Navbar.Collapse id="basic-navbar-nav" className="pt-1 pb-1">
                                <ListGroup className="nav-web">
                                    <Link to={`/home/${userId}?token=${token}`} className={`txt-nav pt-2 pb-2 ${isActive(`/home/${userId}`) ? 'activeNav' : ''}`} >
                                        Home
                                    </Link>
                                </ListGroup>
                                <ListGroup className="nav-web">
                                    <Link to={`/new/${userId}`} className={`txt-nav pt-2 pb-2 ${isActive(`/new/${userId}`) ? 'activeNav' : ''}`} >New</Link>
                                </ListGroup>
                                <ListGroup className="nav-web">
                                    {/* <Link to="" className={`txt-nav pt-2 pb-2 ${isActive('/new') ? 'activeNav' : ''}`} >Product</Link> */}
                                    <NavDropdown title="Category" id="navbarScrollingDropdown" className={`txt-nav pt-2 pb-2`}>
                                    {
                                        category.map((categ) =>(
                                        <div className="p-1">
                                            {/* <Col xs={4} md={4} lg={4} className="text-center" > */}
                                                {/* <label className="px-2 categories-drop">{categ.categoryName}</label> */}
                                                <NavDropdown.Item 
                                                    onClick={() => categoryChange(categ.categoryId)} 
                                                    className="categories-drop"
                                                >
                                                    {categ.categoryName}
                                                </NavDropdown.Item>
                                            {/* </Col> */}
                                        </div>
                                        ))
                                    }
                                    </NavDropdown>
                                </ListGroup>
                                <ListGroup className="nav-web">
                                    <Link to="" className={`txt-nav pt-2 pb-2 ${isActive('/') ? 'activeNav' : ''}`} >My Orders</Link>
                                </ListGroup>
                                <ListGroup className="nav-web">
                                    <Link to="" className={`txt-nav pt-2 pb-2 ${isActive('/') ? 'activeNav' : ''}`} >Contact Us</Link>
                                </ListGroup>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;