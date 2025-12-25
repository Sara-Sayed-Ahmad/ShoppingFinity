import React, { useEffect, useState } from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import urlCustomers from "../../Utilities/Customer/urlCustomers";
import urlOrder from "../../Utilities/Order/urlOrder";

const TableCustomer = () => {

    //Customers
    const [customers, setCustomers] = useState([]);

    //count order
    const [orderUser, setOrderUser] = useState([]);

    //randomly color
    const [backgroundDiv, setBackgroundDiv] = useState(getRandomColor());

    //Pagination
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;
     const totalPages = Math.ceil(customers.length / itemsPerPage);
 
     //Order index
     const indexFirstItem = currentPage * itemsPerPage;
     const indexLastItem = indexFirstItem - itemsPerPage;
     const currentCustomer = customers.slice(indexFirstItem, indexLastItem);
 
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

    useEffect(() =>{
        axios.get(urlCustomers.API_URL_GET_ALL_USERS)
        .then((response) => {
            setCustomers(response.data);
            setBackgroundDiv(getRandomColor());
        })
        .catch((err) => console.log(err));

        customers.map((cust) => 
            axios.get(urlOrder.API_URL_GET_BY_ID_USER, {params: {id: cust.id}})
            .then((resp) => {
                const count = 0;
                ++count
                console.log(resp.data);
            })
            .catch((err) => console.log(err))
        );
    }, []);

    function getRandomColor() {
        const shadesOfBlue = ['#3498db', '#2980b9', '#1f618d', '#154360', '#0e2f44'];
        // const letters = '0123456789ABCDEF';
        // let color = '#';

        // for( let i=0; i < 6; i++){
        //     color += letters[Math.floor(Math.random() * 16)];
        // }

        // return color;
        const randomIndex = Math.floor(Math.random() * shadesOfBlue.length);
        return shadesOfBlue[randomIndex];
    }

    return(
        <>
            <div className="table-list cards">
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between padding-1rem">
                    <Form className="d-flex width-search">
                        <input type="search" className="form-control" placeholder="Search product"/>
                    </Form>
                </div>
                <Table className="head">
                    <thead className="">
                        <tr className=''>
                            <th scope='col' className="header-table paddLeft">Customer</th>
                            <th scope='col' className="header-table">Country</th>
                            <th scope='col' className="header-table">Order Number</th>
                            <th scope='col' className="header-table">Total Spent</th>
                        </tr>
                    </thead>
                    <tbody className="border-top text-table">
                        {
                            customers.map((customer) => (
                                <tr className="align-middle" key={customer.id}>
                                    <td className="paddLeft">
                                        <div className="d-flex">
                                            <div className="div-customer text-center" style={{backgroundColor: getRandomColor()}}>
                                                <label className="txt-name">{customer.firstName.slice(0, 1)}{customer.lastName.slice(0, 1)}</label>
                                            </div>
                                            <div>
                                                <div className="d-flex">
                                                    <div className="data-Name">
                                                        {customer.firstName} <span style={{ paddingRight: '5px'}}></span>
                                                        {customer.lastName}
                                                    </div>
                                                </div>
                                                <div className="title-car pt-1">
                                                    {customer.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {customer.country ? (
                                            <div>{customer.country}</div>
                                        ) : (
                                            <div>Not country</div>
                                        )}
                                    </td>
                                    <td className="px-5">
                                        {/* {customer.firstName} */}0
                                    </td>
                                    <td className="px-5">
                                        {/* {customer.firstName} */}0
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
                            <Pagination.Item key={index + 1} 
                                active={index + 1 === currentPage} 
                                onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={nextData} disabled={currentPage === totalPages} />
                        </Pagination>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default TableCustomer;