import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import logoLogin from '../logoWebsite.PNG';
import { Link, useNavigate } from "react-router-dom";
import {useAuthContext} from '../Context/AuthProvider'
import axios from "axios";
import urlLoginRegister from "../Utilities/Login_Register/urlLoginRegister";

const Register = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);

    const navigate = useNavigate();
    const {setUser} = useAuthContext();

    const handleRegister = () =>{
        try{
            const dataRegister = {firstName, lastName, address, phoneNumber, email, password, verifyPassword, isAdmin}

            axios.post(urlLoginRegister.REGISTER_USER, dataRegister)
            .then((resp) =>{
                const register = resp.data;
                console.log(register);
                
                if(isAdmin === true){
                    setUser('Admin');
                    navigate('/admin');
                }
                else{
                    setUser('user');
                    navigate('/home');
                }
            })
            .catch((err) => console.log(err))
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <div className="back-body pb-3">
                <div className="container">
                    <div className="pt-3">
                        <div className="text-center pb-3">
                            <img src={logoLogin} />
                        </div>
                    </div>
                    <Row className="justify-content-center pb-5">
                        <Col xs={6} md={6} lg={6} className="b-login">
                            <Form className="py-4 px-2">
                                <div className="text-center title-log-reg">
                                    <h4 className="pb-2">Create an Account</h4>
                                </div>
                                <Form.Group>
                                    <Row className="py-2">
                                        <Col xs={6} md={6} lg={6}>
                                            <Form.Control 
                                                className="inputLogin_regi" 
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) =>{
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={6} lg={6}>
                                            <Form.Control 
                                                className="inputLogin_regi" 
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) =>{
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="py-2">
                                        <Col xs={12} md={12} lg={12}>
                                            <Form.Control 
                                                className="inputLogin_regi" 
                                                placeholder="Address"
                                                value={address}
                                                onChange={(e) =>{
                                                    setAddress(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="py-2">
                                        <Col xs={12} md={12} lg={12}>
                                            <Form.Control 
                                                className="inputLogin_regi" 
                                                placeholder="Phone Number"
                                                value={phoneNumber}
                                                onChange={(e) =>{
                                                    setPhoneNumber(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="py-2">
                                        <Col xs={12} md={12} lg={12}>
                                            <Form.Control 
                                                className="inputLogin_regi" 
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) =>{
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="py-2">
                                        <Col xs={6} md={6} lg={6}>
                                            <Form.Control 
                                                type="password"
                                                className="inputLogin_regi" 
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) =>{
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={6} lg={6}>
                                            <Form.Control 
                                                type="password"
                                                className="inputLogin_regi" 
                                                placeholder="Verify Password"
                                                value={verifyPassword}
                                                onChange={(e) =>{
                                                    setVerifyPassword(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className=" mt-3 mb-2">
                                    <Button 
                                        className="button-login_register w-100"
                                        onClick={handleRegister}
                                    >
                                        Register 
                                    </Button>
                                </Form.Group>
                                <div className="font-13 pt-2 pb-2 text-center">
                                    <span >Already have an account?</span>
                                    <span className="mx-2 f-sign-in-up ">
                                        <Link to="/login" className="logOrregis">Login</Link>
                                    </span>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Register;