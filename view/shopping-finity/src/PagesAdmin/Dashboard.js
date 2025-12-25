import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import { MdOutlinePayment } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import {MdModeEdit} from 'react-icons/md';
import { FcRating, FcRatings, FcSalesPerformance } from "react-icons/fc";
import {BsPeopleFill, BsPaypal, BsFillCreditCard2FrontFill} from 'react-icons/bs';
import {GiClothes} from 'react-icons/gi';
import {MdOutlineAttachMoney, MdWoman2, MdMan2, MdOutlineBoy} from 'react-icons/md';
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChartTotalSales from "../Components/Dashboard/ChartTotalSales";
import {BiSolidTShirt, BiTransfer} from 'react-icons/bi';
import {PiWalletFill} from 'react-icons/pi';
import ChartCategory from '../Components/Dashboard/ChartCategory';
import axios from "axios";
import urlPayment from "../Utilities/PaymentType/urlPayment";

const Dashboard = () =>{
    const [payment, setPayment] = useState(false);

    const OpenPayment = () =>{
        setPayment(!payment);
    }

    //Close payment card
    const closePay = () =>{
        setPayment(!payment);
    }

    //All payment types
    const [paymentTypes, setPaymentTypes] = useState([]);

    useEffect(() => {
        axios.get(urlPayment.API_URL_GET_ALL_PAYMENT)
        .then((resp) =>{
            setPaymentTypes(resp.data);
            console.log(paymentTypes);
        })
        .catch((error) => console.log(error))
    }, []);

    return(
        <>
            <div className="setting-perm-admin">
                <div className="setting-payment" onClick={OpenPayment}>
                    <MdOutlinePayment className="icon-payment-set" />
                </div>
                <div className="setting-discount">
                    <CiDiscount1 className="icon-payment-set"/>
                </div>
            </div>
            <div className={`payment-methods ${payment ? 'displayNon' : ''}`}>
                <div style={{display: 'flex'}} className="pt-4 px-4 justify-content-between w-100">
                    <div>
                        <h5 style={{textAlign: 'center'}}>Payment Methods</h5>
                    </div>
                    <div>
                        <IoIosClose style={{fontSize: '24px' ,cursor: 'pointer'}} onClick={closePay}/>
                    </div>
                </div>
                <hr className="space-card"></hr>
                <div className="px-4 pb-3">
                    {paymentTypes.map((payment) => (
                        <div className="d-flex justify-content-between w-100">
                             <h6>{payment.paymentName}</h6>
                            <MdModeEdit />
                        </div>
                    ))}
                </div>
            </div>
            <div className="pages">
                <Row className="pt-4">
                    <Col xs={2} md={4} lg={2} >
                        <Card className="cards Card-dash">
                            <Card.Body>
                                <Card.Title className="card-tit">
                                    Ratings
                                    <span><FcRating /></span>
                                </Card.Title>
                                <Card.Text className="card-text pt-4">13K</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} lg={3}>
                        <Card className="cards Card-dash">
                            <Card.Body>
                                <Card.Title className="card-tit">
                                    Total Sales
                                </Card.Title>
                                <div className="d-flex">
                                    <FcSalesPerformance className="icon-trans"/>
                                    <h5 className="pt-3">$ 12,450</h5>                        
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={10} md={8} lg={7} >
                        <Card className="cards Card-dash">
                            <Card.Body>
                                <Card.Title className="card-tit">
                                    Transactions
                                </Card.Title>
                                <Row className="pt-2">
                                    <Col xs={4} md={4} lg={4}>
                                        <div className="d-flex">
                                            <div>
                                                <FcRatings className="icon-trans"/>
                                            </div>
                                            <div className="px-2">
                                                <div className="title-transcation">Sales</div>
                                                <h5>45k</h5>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={4}>
                                        <div className="d-flex">
                                            <div>
                                                <BsPeopleFill className="icon-trans" style={{color: "rgb(36 51 66)"}}/>
                                            </div>
                                            <div className="px-2">
                                                <div className="title-transcation" >Customers</div>
                                                <h5>150k</h5>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={4} md={4} lg={3}>
                                        <div className="d-flex">
                                            <div>
                                                <GiClothes className="icon-trans" style={{color: "rgb(36 51 66)"}}/>
                                            </div>
                                            <div className="px-2">
                                                <div className="title-transcation" >Products</div>
                                                <h5>3.450k</h5>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="dash-section2">
                    <ChartTotalSales />
                    <Col xs={2} md={2} lg={2}>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <Card className="cards Card-mony">
                                    <Card.Body>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                            <MdOutlineAttachMoney className="icon-mony"/>
                                            <div className="menu">
                                                <HiOutlineDotsVertical className="font-20"/>
                                            </div> 
                                        </div>
                                        <Card.Title className="card-tit pt-2">
                                            Profits
                                        </Card.Title>
                                        <Card.Text className="card-text mb-1">
                                            16,667
                                            <small className="text-danger persent px-1">45%</small>
                                        </Card.Text>
                                        <span className="title-car">Current Month</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} md={12} lg={12} className="mt-4">
                                <Card className="cards Card-product">
                                    <Card.Body>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                            <BiSolidTShirt className="icon-mony"/>
                                            <div className="menu">
                                                <HiOutlineDotsVertical className="font-20"/>
                                            </div> 
                                        </div>
                                        <Card.Title className="card-pro pt-3">
                                            Number of Products
                                        </Card.Title>
                                        <hr className="space-card"></hr>
                                        <div className="pt-1">
                                            <div className="d-flex">
                                                <MdWoman2 />
                                                <h6 className="text-product">Woman</h6>
                                            </div>
                                            <div className="num-pro px-3 pb-2">1,796</div>
                                            <div className="d-flex">
                                                <MdMan2 />
                                                <h5 className="text-product">Man</h5>
                                            </div>
                                            <div className="num-pro px-3 pb-2">470</div>
                                            <div className="d-flex">
                                                <MdOutlineBoy />
                                                <h5 className="text-product">Kids</h5>
                                            </div>
                                            <div className="num-pro px-3 pb-2">12,890</div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={8} lg={8}>
                        <Row>
                            <ChartCategory />
                            <Col xs={10} md={6} lg={5} className="padd-category">
                                <Card className="cards info-Category">
                                    <Card.Body>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-1">
                                            <Card.Title className="mb-0">
                                                2040
                                            </Card.Title>
                                            <div className="menu">
                                                <HiOutlineDotsVertical className="font-20"/>
                                            </div> 
                                        </div>
                                        <small className="paragraph-sa">Last month</small>
                                        <hr className="space-card"></hr>
                                        <div className="pt-1">
                                            <div className="d-flex pb-2">
                                                <div className="icon-category">
                                                    <MdWoman2 />
                                                </div>
                                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                                    <div className="px-2">
                                                        <h6 className="text-product mb-0 mt-2">Woman</h6>
                                                        <span className="num-pro font-pro">763</span>
                                                    </div>
                                                    <div className="perc-customer">
                                                        <small class="text-danger persent px-1">65%</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex pb-2 justify-content-between">
                                                <div className="icon-category">
                                                    <MdMan2 />
                                                </div> 
                                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                                    <div className="px-2">
                                                        <h6 className="text-product mb-0 mt-2">Man</h6>
                                                        <span className="num-pro font-pro">588</span>
                                                    </div>  
                                                    <div className="perc-customer">
                                                        <small class="text-danger persent px-1">33%</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex pb-2 justify-content-between">
                                                <div className="icon-category">
                                                    <MdOutlineBoy />
                                                </div>
                                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                                    <div className="px-2">
                                                        <h6 className="text-product mb-0 mt-2">Kids</h6>
                                                        <span className="num-pro font-pro">689</span>
                                                    </div>
                                                    <div className="perc-customer">
                                                        <small class="text-danger persent px-1">43%</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} md={4} lg={4}>
                        <Card className="cards">
                            <Card.Body>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-1">
                                <Card.Title className="mb-0">Transactions</Card.Title>
                                <div className="menu">
                                    <HiOutlineDotsVertical className="font-20"/>
                                </div> 
                            </div>
                            <small className="paragraph-sa">Last month</small>
                            <div className="pt-2">
                                <div className="d-flex pb-2 mb-1">
                                    <div className="px-2 icon-payment color-paypal">
                                        <BsPaypal />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                        <div className="px-2">
                                            <h6 className="text-product mb-0 mt-2">Paypal</h6>
                                        </div>
                                        <div className="perc-customer">
                                            <small class="text-danger persent px-1">30%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pb-2">
                                    <div className="px-2 icon-payment color-credit">
                                        <BsFillCreditCard2FrontFill />
                                    </div> 
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                        <div className="px-2">
                                            <h6 className="text-product mb-0 mt-2">Credit Card</h6>
                                        </div>  
                                        <div className="perc-customer">
                                            <small class="text-danger persent px-1">13%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pb-2">
                                    <div className="px-2 icon-payment color-wallet">
                                        <PiWalletFill />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                        <div className="px-2">
                                            <h6 className="text-product mb-0 mt-2">Digital Wallet</h6>
                                        </div>
                                        <div className="perc-customer">
                                            <small class="text-danger persent px-1">43%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pb-2">
                                    <div className="px-2 icon-payment color-bank">
                                        <BiTransfer />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-5">
                                        <div className="px-2">
                                            <h6 className="text-product mb-0 mt-2">Bank Transfer</h6>
                                        </div>
                                        <div className="perc-customer">
                                            <small class="text-danger persent px-1">14%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;