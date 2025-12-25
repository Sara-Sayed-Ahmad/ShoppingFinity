import React, { useEffect, useState } from "react";
import { Table, Form, Button, Col, Row, Pagination } from "react-bootstrap";
import {RiAddFill} from 'react-icons/ri';
import urlDetailsCateg from "../../Utilities/Category/urlDetailsCateg";
import urlCategory from "../../Utilities/Category/urlCategory";
import axios from "axios";
import ModalDetails from "./ModalDetails";
import { MdModeEdit } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import ModalCategory from "./ModalCategory";

const TableDCategories = () => {
    //categories
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectedCategory] = useState(null);

    //details categories
    const [categoDetails, setCategoDetails] = useState([]);

    //show modal add details category
    const [showDetails, setShowDetails] = useState(false);

    //show modal add category
    const [showCategory, setShowCategory] = useState(false);

    //select category
    const handleCategories = (e) =>{
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    }

    //Show Modal details
    const handleDetails = () =>{
        setShowDetails(true);
    }

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(categoDetails.length / itemsPerPage);
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentDetails = categoDetails.slice(indexFirstItem, indexLastItem);

    const prevData = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const nextData = () =>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageChange = (numPage) =>{
        setCurrentPage(numPage);
    }

    const handleCategory = () => {
        setShowCategory(true);
    }

    useEffect(() =>{
        //Get categories
        axios.get(urlCategory.API_URL_GET_CATEGORIES)
        .then((respnse) => {
            setCategories(respnse.data);
            console.log(respnse.data);
        })
        .catch((error) => console.log(error))
    }, []);

    useEffect(() =>{
        //get details category by id (category)
        if(selectCategory !== null){
            axios.get(urlDetailsCateg.API_URL_GET_DETAILS_BY_ID_CATEGORY, {params: {id: selectCategory}})
            .then((respnse) => {
                setCategoDetails(respnse.data);
                console.log(selectCategory);
            })
            .catch((error) => {
                axios.get(urlDetailsCateg.API_URL_GET_DETAILS)
                .then((res) => {
                    setCategoDetails(res.data);
                })
            })
        }
        //get all data
        else{
            axios.get(urlDetailsCateg.API_URL_GET_DETAILS)
            .then((res) => {
                setCategoDetails(res.data);
            })
            .catch((err) => console.log(err));
        }
    }, [selectCategory]);

    return (
        <>
            <div className="table-list cards">
                <div className="padding-1rem">
                    <Row>
                        <Col xs={6} md={6} lg={6}>
                            <Form.Group className="">
                                <Form.Control type="search" className="w-search-cate form-control" placeholder="Search product"/>
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                            <Row className="">
                                <Col xs={6} md={6} lg={6}>
                                    <Form.Group>
                                        <Form.Label className="input-select">Category</Form.Label>
                                        <Form.Select value={selectCategory} onChange={handleCategories}>
                                            <option className="font-input">All categories</option>
                                            {categories.map((category) =>(
                                                <option 
                                                    className="font-input"
                                                    key={category.categoryId}
                                                    value={category.categoryId}
                                                >{category.categoryName}</option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={3} md={3} lg={3}>
                                    <Button className="w-100" onClick={handleCategory}>
                                        <RiAddFill/> Category
                                    </Button>
                                </Col>
                                <Col xs={3} md={3} lg={3}>
                                    <Button className="w-100" onClick={handleDetails}>
                                        <RiAddFill/> Details
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Table className="head">
                    <thead className="">
                        <tr className=''>
                            <th scope='col' className="header-table paddLeft">Details category</th>
                            <th scope='col' className="header-table">Total Product</th>
                            <th scope='col' className="header-table">Total Earning</th>
                            <th scope='col' className="header-table">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="border-top text-table">
                        {
                        currentDetails.map((details) => (
                            <tr className="align-middle" key={details.detailsId}>
                                <td className="paddLeft">{details.detailName}</td>
                                <td className="px-5">0</td>
                                <td className="px-5">0</td>
                                <td>
                                <div className="d-flex"> 
                                    <div>
                                        <MdModeEdit className="icon-action-tp"/>
                                    </div>
                                    <div>
                                        <BiSolidShow className="icon-action-tp"/>
                                    </div>
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
            
            {/* Modal Add Category */}
            <ModalCategory show={showCategory} onClose={() => setShowCategory(false)}/>

            {/* Modal Add Category Details */}
            <ModalDetails show={showDetails} onClose={() => {setShowDetails(false);}} />
        </>
    );
}

export default TableDCategories;