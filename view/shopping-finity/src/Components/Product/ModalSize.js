import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import urlAdmin from "../../Utilities/Admin/urlAdmin";

const ModalSize = ({show, onClose, productId}) => {
    const [size, setSize] = useState('');
    // const [sizes, setSizes] = useState([]);
    const [divData, setDivData] = useState([]);

    const handleAddSize = () =>{
        if(size.trim !== ''){
            setDivData([...divData, size]);
            setSize('');
        }
    }

    const handleSave = async () => {

        const newSizeData = {
            sizeName: divData.map(sizeName => sizeName.sizeName),
            productId: productId
        };

        console.log(divData);

        const sizePro = await axios.post(urlAdmin.API_URL_POST_SIZE_PRODUCT, newSizeData , {
            headers: {
              'Content-Type': 'application/json'
              // authentication token
            },
        });

        if(sizePro === 200){
            setSize([]);
            setDivData('');
        }
        window.location.reload();
        onClose();
    }    

    return(
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-Modal">Add Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="form-group d-flex align-items-center">
                            <label>Name Size</label>
                            <input className="form-control inputSize"
                                value={size.sizeName} onChange={(e) => setSize({...size, sizeName: e.target.value})}/>
                        </Form.Group>
                        <div className="mt-2 mb-2 text-center">
                            <IoIosArrowDown onClick={handleAddSize}/>
                        </div>
                    </Form>
                    <div>
                    {divData.map((sz) => (
                        <label className="size-added">
                            {sz.sizeName}
                        </label>
                    ))
                    }
                    </div>
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

export default ModalSize;