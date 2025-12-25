import React from "react";
import imageProfile from '../image/personProfile.jpg';
import Profile from '../image/profile2.webp';
import {AiFillBell} from 'react-icons/ai';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Search} from 'react-bootstrap-icons';
import '../style/navbar.css';

const SideRight = () => {
    return(
        <Col xs={10} md={10} lg={10} className='side-right'>
            <Row>
                <Col xs={11} md={11} lg={11}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="search" placeholder="Search.." />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={1} md={1} lg={1} className="d-flex">
                    <AiFillBell className='notification mx-1 mt-1'/>
                    <div className='size-divImage'>
                        <img src={Profile} className='w-100 h-100 borderImage'></img>
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default SideRight;