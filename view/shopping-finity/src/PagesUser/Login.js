import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import logoLogin from '../logoWebsite.PNG';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import urlLoginRegister from "../Utilities/Login_Register/urlLoginRegister";
import {useAuthContext} from '../Context/AuthProvider';
import {jwtDecode} from 'jwt-decode';
import { GetUserID } from "../Context/GetUserID";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {setUser, user, TokenUser} = useAuthContext();

    const handleLogin = async () => {
        try{
            const dataLogin = {email, password}
            
            await axios.post(urlLoginRegister.LOGIN_USER, dataLogin)
            .then((resp) =>{
                const token = resp.data;
                const tokenDecoded = jwtDecode(token);
                const userToken = tokenDecoded.Id;

                setUser(tokenDecoded.role);
                user(userToken);
                TokenUser(token);
                localStorage.setItem("user: ", token);

                navigate(`new/${userToken}`);
                navigate(`category/:category/${userToken}`);
                navigate(`favorite/${userToken}`);
                navigate(`cart/${userToken}?token=${token}`)
                navigate(`products/${userToken}?token=${token}`)

                if(tokenDecoded.role === 'Admin'){
                    navigate(`/admin`);
                }
                else{
                    navigate(`/home/${userToken}?token=${token}`);
                }
            })
            .catch((error) =>{
                console.log(error);
            });
        }
        catch(error){
            console.log(error);
        }        
    }

    return(
        <>
            <div className="back-body pb-5">
                <div className="container pb-5">
                    <div className="pt-5">
                        <div className="text-center pt-4 pb-3">
                            <img src={logoLogin} />
                        </div>
                    </div>
                    <Row className="justify-content-center pb-5">
                        <Col xs={5} md={5} lg={5} className="b-login">
                            <Form className="p-3">
                                <div className="text-center title-log-reg">
                                    <h4>Login to Your Account</h4>
                                </div>
                                <Form.Group>
                                    <Row className="py-3">
                                        <Col xs={2} md={2} lg={2} className="pt-2">
                                            <Form.Label>Email</Form.Label>
                                        </Col>
                                        <Col xs={10} md={10} lg={10}>
                                            <Form.Control 
                                                className="inputLogin_regi"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="py-3">
                                        <Col xs={2} md={2} lg={2} className="pt-2">
                                            <Form.Label>Password</Form.Label>
                                        </Col>
                                        <Col xs={10} md={10} lg={10}>
                                            <Form.Control 
                                                type="password"
                                                className="inputLogin_regi"
                                                value={password}
                                                onChange={(e) =>{
                                                    setPassword(e.target.value)
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="text-end pb-2">
                                        <span className="forget-password">Forget Password?</span>
                                    </div>
                                </Form.Group>
                                <Form.Group className=" mt-2 mb-2">
                                    <Button className="button-login_register w-100" onClick={handleLogin}>
                                        Login 
                                    </Button>
                                </Form.Group>
                                <div className="font-13 pt-2 pb-2">
                                    <span >Don't have account?</span>
                                    <span className="mx-2 f-f-sign-in-up">
                                        <Link to="/register" className="logOrregis">Sing Up</Link>
                                    </span>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Login;