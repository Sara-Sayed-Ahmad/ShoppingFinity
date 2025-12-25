import axios from "axios";
import React, {useState, useEffect} from "react";
import { Table, Form, Button, Col, Row, Pagination } from "react-bootstrap";
import {BiSolidShow } from 'react-icons/bi';
import urlOrder from "../../Utilities/Order/urlOrder";
import urlCustomers from "../../Utilities/Customer/urlCustomers";
import urlPayment from "../../Utilities/PaymentType/urlPayment";
import { MdCircle } from "react-icons/md";

const TableOrder = () =>{
    //Get Orders
    const [GetOrder, setGetOrder] = useState([]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(GetOrder.length / itemsPerPage);

    //Order index
    const indexFirstItem = currentPage * itemsPerPage;
    const indexLastItem = indexFirstItem - itemsPerPage;
    const currenOrder = GetOrder.slice(indexFirstItem, indexLastItem);

    //previous page
    const prevData = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    //next page
    const nextData = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    }

    useEffect(() => {
        //Get all orders
        axios.get(urlOrder.API_URL_GET_ALL_ORDERA)
        .then((response) => {
            const orders = response.data;

            //Get user by id
            const userPromise = orders.map((ord) => 
                axios.get(urlCustomers.API_URL_GET_BY_ID, {params: {id: ord.userId}})
            );
            //Get payment type by id
            const paymentPromise = orders.map((ordpa) => 
                axios.get(urlPayment.API_URL_GET_BY_PAYMENT, {params: {id: ordpa.paymentId}})
            );

            Promise.all([...userPromise, ...paymentPromise])
            .then((responses) =>{
                const userResponse = responses.slice(0, orders.length);
                const paymentResponse = responses.slice(orders.length);

                const userOrder = orders.map((ord, index) => ({
                    ...ord,
                    user: userResponse[index].data, 
                }));
                const paymentOrder = orders.map((ordpa, index) => ({
                    ...ordpa,
                    paymentType: paymentResponse[index].data,
                }));
                
                const combineOrder = userOrder.map((ord, index) => ({
                    ...ord, 
                    paymentType: paymentOrder[index].paymentType,
                }));

                setGetOrder(combineOrder);
            })
            .catch((error) => console.log(error));
        })
        .catch((err) => console.log(err));
        const test = null;
    }, []);

    // const getColorStatus = (status) =>{
    //     console.log(status);
    //     switch (status){
    //         case 'Pending':
    //             return {color: 'rgb(255, 180, 0) !important'};
    //         case 'Failed':
    //             return { color: 'rgb(255, 76, 81) !important'};
    //         case 'Cancelled':
    //             return { color: 'rgb(138, 141, 147) !important'};
    //         case 'Paid':
    //             return { color: 'rgb(86, 202, 0) !important'};
    //         case 'Out for Delivery':
    //             return { backgroundColor: 'background-color: #eee6ff !important', color: '#9055fd !important'};
    //         default: 
    //             return { color: 'black' };
    //     }
    // };

    return(
        <>
            <div className="table-list cards">
                <Table className="head">
                    <thead className="">
                        <tr className=''>
                            <th scope='col' className="header-table paddLeft">Order</th>
                            <th scope='col' className="header-table">Date</th>
                            <th scope='col' className="header-table">Customer</th>
                            <th scope='col' className="header-table">Payment</th>
                            <th scope='col' className="header-table">Status</th>
                            <th scope='col' className="header-table">Payment Type</th>
                            <th scope='col' className="header-table">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border-top text-table">
                        {
                            GetOrder.map((order) =>(
                                <tr className="align-middle" >
                                    <td className="paddLeft">
                                        <div className="id-table">
                                            #{order.orderId}
                                        </div>
                                    </td>
                                    <td>{order.orderDate.slice(0, 10)}</td>
                                    {/* <td>
                                        {order.user.firstName}
                                        <span style={{ paddingRight: '10px' }}></span>
                                        {order.user.lastName}
                                    </td> */}
                                    <td>
                                        <div className="d-flex">
                                            <div>
                                                <div className="d-flex">
                                                    <div className="data-Name">
                                                        {order.user.firstName} <span style={{ paddingRight: '5px'}}></span>
                                                        {order.user.lastName}
                                                    </div>
                                                </div>
                                                <div className="title-car pt-1">
                                                    {order.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td style={getColorStatus(order.paymentStatus)}> */}
                                    <td>
                                        <div className={`status-${order.paymentStatus}`}>
                                            <MdCircle className="icon-payment-stat"/>
                                            <span className="font-15">{order.paymentStatus}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`orderStat ${order.orderStatus.replace(/\s/g, '_')}`} >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="font-13 fw-normal">{order.paymentType.paymentName}</td>
                                    <td className="px-3">
                                        <div>
                                            <BiSolidShow className="icon-action-tp"/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody> 
                </Table>
                <Row>
                    <Col xs={12} md={12} lg={12} className="pagination-table">
                        <Pagination className="float-end">
                            <Pagination.Prev onClick={prevData} disabled={currentPage === 1}/>
                            {
                            Array.from({length: totalPages}).map((_, index) => (
                                <Pagination.Item
                                    key={index + 1} active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                {index + 1}
                                </Pagination.Item>
                            ))   
                            }
                            <Pagination.Next onClick={nextData} disabled={currentPage === totalPages}/>
                        </Pagination>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default TableOrder;