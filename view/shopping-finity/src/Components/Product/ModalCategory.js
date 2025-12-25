import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import axios from "axios";
import urlAdmin from "../../Utilities/Admin/urlAdmin";

const ModalCategory = ({show, onClose}) =>{
    const [categories, setCategories] = useState({
        categoryName: '',
        description: '',
        createdAt: new Date(),
    });

    // date added
    const [dateAdded, setDateAdded] = useState(null);
    const handleDate = (date) =>{
        setDateAdded(date);
        setCategories({...categories, createdAt: date});
    }

    const handleSave = async (e) => {
        e.preventDefault();
        
        try{
            const token = localStorage.getItem("user: "); // Get JWT token

            if (!token) {
                alert("Unauthorized: Please log in as Admin");
                return;
            }

            const response = await axios.post(urlAdmin.API_URL_POST_CATEGORY, categories,{
                headers: {
                    Authorization: `Bearer ${token}`, // Send JWT token for authentication
                    "Content-Type": "application/json",
                },
            });

            if(response === 200){
                // categories.categoryName('');
                // categories.description('');
            }
            // window.location.reload();
            onClose();
        } 
        catch(error){
            console.log(error);
        }
    }

    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="title-Modal">Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3 form-group">
                        <Row>
                            <Col xs={3} md={3} lg={3} className="text-modal">
                                <Form.Label className="product-tit d-flex">Category Name</Form.Label>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <Form.Control 
                                    autoFocus
                                    value={categories.categoryName}
                                    onChange={(e) => 
                                        setCategories({...categories, categoryName: e.target.value})
                                    }
                                ></Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                        <Row>
                            <Col xs={3} md={3} lg={3}>
                                <Form.Label className="product-tit d-flex">Description</Form.Label>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <Form.Control 
                                    as="textarea" rows={3}
                                    value={categories.description}
                                    onChange={(e) => setCategories({...categories, description: e.target.value})}
                                >
                                </Form.Control>
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
                                        value={categories.createdAt}
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
                <Button variant="primary" onClick={handleSave}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCategory;
