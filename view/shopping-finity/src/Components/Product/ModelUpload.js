import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {MdFileUpload} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import urlAdmin from "../../Utilities/Admin/urlAdmin";
import axios from "axios";


const ModelUpload = ({show, onClose, productId}) =>{

    const [image, setImage] = useState([]);
    const [color, setColor] = useState(null);
    const [dateUpoladed, setDateUpoladed] = useState(null);

    const handleImage = (e) =>{
        const files = e.target.files;
        const selectedImage = Array.from(files).map((file) => URL.createObjectURL(file));
        setImage(selectedImage);
    }

    const handleDate = (date) => {
        setDateUpoladed(date);
    }

    const handleSave = async () =>{
        try{
            // const dataprod = {
            //     image: image,
            //     productId: productId,
            //     color: color,
            //     createdAt: dateUpoladed.toISOString()
            // }
            const formData = new FormData();

            image.forEach((img, index) => {formData.append(`image[${index}]`, img)});
            formData.append('productId', productId);
            formData.append('createdAt', dateUpoladed.toISOString());
            formData.append('color', color);

            const response = await axios.post(urlAdmin.API_URL_UPLOAD_IMAGE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // authentication token
                },
            }
            );

            console.log(formData);
            setImage([]);
            setDateUpoladed(null);
            setColor(null);

        } catch(err){
            console.error('Error uploading images:', err);
        }
    }

    return(
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-Modal">Add Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <input type="file" multiple id="file" className="form-control" onChange={handleImage}/>
                            {/* <div>
                                <MdFileUpload />
                            </div> */}
                        </div>
                        <Row className="pt-4 pb-2">
                        {image.map((imag, index) => (
                            <Col xs={3} md={3} lg={3}>
                            <div className="">
                                <img key={index} src={imag} alt={`uploaded-${index}`} className="uploaded-image" />
                            </div>
                            </Col>
                         ))}
                        </Row>
                        
                        <Form.Group className="mb-3 form-group">
                            <Form.Label className=" d-flex">color</Form.Label>
                            <Form.Control 
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                            <Form.Label className=" d-flex">Date Uploaded</Form.Label>
                             <DatePicker 
                                className="form-control" 
                                value={dateUpoladed}
                                selected={dateUpoladed} 
                                onChange={handleDate} dateFormat="dd/MM/yyyy"
                            />
                            
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
        </>
    );
}

export default ModelUpload;