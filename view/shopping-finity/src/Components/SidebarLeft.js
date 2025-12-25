import React, { Children } from 'react';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import image from '../logo3.PNG';
import imageSmall from '../smalllogo.PNG';
import Col from 'react-bootstrap/Col';
import { ImHome3 } from "react-icons/im";
import {GiClothes} from 'react-icons/gi';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {HiMiniUsers} from 'react-icons/hi2';
import {MdRateReview} from 'react-icons/md';
import {BiMenuAltRight, BiLogOutCircle} from 'react-icons/bi';
import '../style/navbar.css';
import { NavLink } from 'react-router-dom';

const SidebarLeft = ({children}) => {

    const [isActive, setIsActive] = useState(false);
    const toggleSide = () => {
        setIsActive(!isActive);
    }

    // const [isActivebtn, setIsActivebtn] = useState(false);
    // const clickbutton = () => {
    //     setIsActivebtn(!isActivebtn);
    // }

    const menuItem = [
        {
            path:"/",
            name: "Dashboard",
            icon: <ImHome3 />
        },
        {
            path:"/products",
            name: "Products",
            icon: <GiClothes />
        },
        {
            path: "/orders",
            name: "Orders",
            icon: <AiOutlineShoppingCart />
        },
        {
            path: "/customers",
            name: "Customers",
            icon: <HiMiniUsers />
        },
        {
            path: "/ManageReview",
            name: "Manage Review",
            icon: <BiLogOutCircle />
        }
    ]

  return (
    <Col xs={2} md={2} lg={2} className={`bg-Navbar px-0 sidebar flex-column ${isActive ? 'active' : '' }`}>
        <Navbar.Brand href="#" className='pt-1 logo'>
            <img src={image} className='image' />
            <img src={imageSmall} className='d-none imageShow' />
            <BiMenuAltRight className='icon-menu' onClick={toggleSide} />
        </Navbar.Brand>
        <ListGroup>
            <ListGroup className='list-sidbar'>
                <NavLink to="/admin" className={`pad-txt-nav btn-menu white-txt`}>
                    <ImHome3 className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Dashboard</label>
                </NavLink>
            </ListGroup>
            <ListGroup className='list-sidbar'>
                <NavLink to="products" className='pad-txt-nav btn-menu white-txt'>
                    <GiClothes className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Products</label>
                </NavLink>
            </ListGroup>
            <ListGroup className='list-sidbar'>
                <NavLink to="orders" className='pad-txt-nav btn-menu white-txt'>
                    <AiOutlineShoppingCart className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Orders</label>
                </NavLink>
            </ListGroup>
            <ListGroup className='list-sidbar'>
                <NavLink to="customers" className='pad-txt-nav btn-menu white-txt'>
                    <HiMiniUsers className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Customers</label>
                </NavLink>
            </ListGroup>
            <ListGroup className='list-sidbar'>
                <NavLink to="ManageReview" className='pad-txt-nav btn-menu white-txt'>
                    <MdRateReview className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Manage Review</label>
                </NavLink>
            </ListGroup>
            <ListGroup className='list-sidbar log-out'>
                <NavLink className='pad-txt-nav white-txt'>
                    <BiLogOutCircle className='icon-nav'/>
                    <label className='px-1 font-14 disp-non'>Log out</label>
                </NavLink>
            </ListGroup>
        </ListGroup>
        <main>{children}</main>
    </Col>
  );
}

export default SidebarLeft;