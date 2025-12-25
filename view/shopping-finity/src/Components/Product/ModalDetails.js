import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import axios from "axios";
import urlCategory from "../../Utilities/Category/urlCategory";
import urlAdmin from "../../Utilities/Admin/urlAdmin";

const ModalDetails = ({show, onClose}) =>{
    // property : detailName, createdAt, categoryId (post)
    //Categories
    const [categories, setCategories] = useState([]);
    const [detailsCategory, setDetailsCategory] = useState({
        detailName: '',
        createdAt: new Date(),
        categoryId: null,
    });

    const [dateAdded, setDateAdded] = useState(null);

    const handleDate = (date) =>{
        setDateAdded(date);
        setDetailsCategory({...detailsCategory, createdAt: date});
    }

    const handleAddDetails = async (e) =>{

        e.preventDefault();
        console.log(detailsCategory);

        try{
            const token = localStorage.getItem("user: "); // Get JWT token

            if (!token) {
                alert("Unauthorized: Please log in as Admin");
                return;
            }

            //post details
            const respnse =  await axios.post(urlAdmin.API_URL_POST_DETAILS, detailsCategory,{
                headers: {
                    Authorization: `Bearer ${token}`, // Send JWT token for authentication
                    "Content-Type": "application/json",
                },}
            );

            if(respnse === 200){
                setDetailsCategory({
                    detailName: '',
                    createdAt: new Date(),
                    categoryId: null,
                });
            }
            window.location.reload();
            onClose();
        }
        catch (error) {
            console.error('Error adding details', error);
          }
    }

    useEffect(() =>{
        // get categories
        axios.get(urlCategory.API_URL_GET_CATEGORIES)
        .then((response) => setCategories(response.data))
        .catch((error) =>{
            console.log(error);
        });

    }, []);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="title-Modal">Add Category Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3 form-group">
                        <Row>
                            <Col xs={3} md={3} lg={3} className="text-modal">
                                <Form.Label className="product-tit d-flex">Name</Form.Label>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <Form.Control 
                                    autoFocus
                                    value={detailsCategory.detailName}
                                    onChange={(e) => 
                                        setDetailsCategory({...detailsCategory, detailName: e.target.value})
                                    }
                                ></Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                        <Row>
                            <Col xs={3} md={3} lg={3}>
                                <Form.Label className="product-tit d-flex">Category</Form.Label>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <Form.Select 
                                    value={detailsCategory.categoryId}
                                    onChange={(e) => setDetailsCategory({...detailsCategory, categoryId: e.target.value})}
                                >
                                    <option className="font-input">Select...</option>
                                    {
                                        categories.map((category) => (
                                            <option 
                                                className="font-input"
                                                key={category.categoryId}
                                                value={category.categoryId}
                                            >{category.categoryName}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                        <Row>
                            <Col xs={3} md={3} lg={3} className="text-modal">
                                <Form.Label className="product-tit d-flex">Date Added</Form.Label>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <div className="w-100">
                                    <DatePicker 
                                        className="form-control width-details" 
                                        selected={dateAdded} 
                                        value={detailsCategory.createdAt}
                                        onChange={handleDate}
                                        dateFormat="yyyy/MM/dd"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="light" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddDetails}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetails;