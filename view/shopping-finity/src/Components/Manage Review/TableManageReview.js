import React, {useState, useEffect} from "react";
import { Table, Form, Button, Col, Row, Pagination } from "react-bootstrap";
import axios from "axios";
import {BiSolidShow} from 'react-icons/bi';
import urlReview from "../../Utilities/Review/urlReview";
import urlCustomers from "../../Utilities/Customer/urlCustomers";
import urlProduct from "../../Utilities/Products/urlProduct";
import StartRating from "./StartRating";

const TableManageReview = () =>{
    const [ReviewProduct, setReviewProduct] = useState([]);

     //pagination
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;
     const totalPages = Math.ceil(ReviewProduct.length / itemsPerPage);
 
     //Order index
     const indexFirstItem = currentPage * itemsPerPage;
     const indexLastItem = indexFirstItem - itemsPerPage;
     const currenReview = ReviewProduct.slice(indexFirstItem, indexLastItem);
 
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
        //Get review for each product
        axios.get(urlReview.API_URL_GET_ALL_REVIEWS)
        .then((response) => {
            const reviews = response.data;

            //Get user by id
            const userPromise = reviews.map((rev) =>
                axios.get(urlCustomers.API_URL_GET_BY_ID, {params: {id: rev.userId}})
            );

            //Get product by id
            const prodPromise = reviews.map((rev) =>
                axios.get(urlProduct.API_URL_GET_BY_ID_PRODUCT, {params: {id: rev.productId}})
            );

            Promise.all([...userPromise, ...prodPromise])
            .then((responses) =>{
                const userResponse = responses.slice(0, reviews.length);
                const prodResponse = responses.slice(reviews.length);

                const userReview = reviews.map((rev, index) => ({
                    ...rev,
                    user: userResponse[index].data,
                }));

                const prodReview = reviews.map((revPro, index) => ({
                    ...revPro,
                    product: prodResponse[index].data,
                }));

                const combineReview = userReview.map((rev, index) => ({
                    ...rev,
                    product: prodReview[index].product,
                }));

                setReviewProduct(combineReview);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log(error));

    }, []);

    return(
        <>
            <div className="table-list cards">
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between padding-1rem">
                    <Form className="d-flex width-search">
                        <Form.Control type="search" className="form-control" placeholder="Search product"/>
                    </Form>
                </div>
                <Table className="head">
                    <thead className="">
                        <tr className=''>
                            <th scope='col' className="header-table paddLeft">Product</th>
                            <th scope='col' className="header-table">Reviewer</th>
                            <th scope='col' className="header-table">Review</th>
                            <th scope='col' className="header-table">Date</th>
                            <th scope='col' className="header-table">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border-top text-table">
                        {
                            ReviewProduct.map((rev) => (
                                <tr className="align-middle">
                                    <td className="paddLeft">
                                        <div className="d-flex">
                                            <div className="imageProduct">
                                                {rev.product.images.length > 0 ? 
                                                    ( <img 
                                                        src={`http://localhost:7102/Upload/${rev.product.images[0].imageName}`} 
                                                        className="image-bas"
                                                        alt="upoladimage"
                                                    ></img>) : (
                                                    <div></div>
                                                    )
                                                }
                                            </div>
                                            <div className="data-Name pt-3">
                                                {rev.product.productName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-14">
                                            {rev.user.firstName} 
                                                <span style={{ paddingRight: '5px'}}></span>
                                            {rev.user.lastName}
                                        </div>
                                    </td>
                                    <td style={{width: '36%'}}>
                                        <div className="font-rating">
                                            <StartRating rating={rev.rating} />
                                        </div>
                                        <div className="data-Name font-16">{rev.title}</div>
                                        <div>
                                            {rev.description.length > 87 ? 
                                                (`${rev.description.slice(0, 87)}`) : (rev.product.description) 
                                            }
                                            <span data-toggle="tooltip" data-placement="bottom" title={rev.product.description}>...</span>
                                        </div>
                                    </td>
                                    <td>{rev.dateReview.slice(0, 10)}</td>
                                    <td className="px-3">
                                        <BiSolidShow className="icon-action-tp"/>
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

export default TableManageReview;