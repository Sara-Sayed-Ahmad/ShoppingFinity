import React, { useRef, useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import $ from 'jquery';
import urlProduct from "../../Utilities/Products/urlProduct";
import urlCategory from "../../Utilities/Category/urlCategory.js";
import urlDetailsCateg from "../../Utilities/Category/urlDetailsCateg.js";
import urlAdmin from '../../Utilities/Admin/urlAdmin.js';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Button, Form, Pagination } from "react-bootstrap";
import {RiAddFill} from 'react-icons/ri';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Modal from 'react-bootstrap/Modal';
import {BiSolidCalendar, BiSolidShow} from 'react-icons/bi';
import {FiUpload} from 'react-icons/fi';
import {MdModeEdit} from 'react-icons/md';
import {GiBodyHeight} from 'react-icons/gi';
import ModelUpload from './ModelUpload.js';
import ModalSize from "./ModalSize.js";

const BasicTable = () =>{

  //products
  const [getData, setGetData] = useState([]);

  //categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, SetSelectedCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectDetails, setSelectDetails] = useState(null);

  const [displaySelected, setDisplaySelected] = useState([]);

  //max length for description 
  const maxLength = 35;

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(getData.length / itemsPerPage);

  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currenProduct = getData.slice(indexFirstItem, indexLastItem);

  //Modal: show or not
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //date picker (Date Added)
  const [selectedDate, SetSelectedDate] = useState(null);
  const handleChangeDate = (date) => {
    SetSelectedDate(date);
    // const selectedCategoryId = e.target.value;
    setNewProduct({ ...newProduct, createdAt: date });
  };

  //check if product available or not
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked);
    setNewProduct({...newProduct, isAvaliable: !isChecked});
  }

  //modal upload images
  const [modalImageShow, setModalImageShow] = useState(false);
  const [modalSizeShow, setModalSizeShow] = useState(false);

  //id for product (to upload images)
  const [productIdUpload, setProductIdUpload] = useState(null);

  const [productIdSize, setProductIdSize] = useState(null);

  //add new product
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    categoryId: null,
    price: 0.0,
    quantity: 0,
    season: '',
    createdAt: new Date(),
    detailsId: [],
    isAvaliable: false,
    countOrder: 0,
  });

  useEffect(() => {
    //get all products
    axios.get(urlProduct.API_URL_GET_ALL_PRODUCTS)
    .then((response) => {
      const products = response.data;

      //get category for each product
      const categoryPromises = products.map((product) => 
        axios.get(urlCategory.API_URL_GET_CATEGORY_BY_ID, {params: {id : product.categoryId}})
      );

      //combine category and product 
      Promise.all(categoryPromises)
      .then((categoryResp) => {
          const productCategory = products.map((product, index) =>({
            ...product,
            category: categoryResp[index].data, 
          }));

          setGetData(productCategory);
          console.log(productCategory);
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    //get categories
    axios.get(urlCategory.API_URL_GET_CATEGORIES)
    .then((response) => {
      setCategories(response.data);
    })
    .catch((err) => console.log(err));

    //get details category
    if(selectedCategory !== null){
      axios.get(urlDetailsCateg.API_URL_GET_DETAILS_BY_ID_CATEGORY, {params: {id: selectedCategory}})
      .then((response) => {
        setCategoryDetails(response.data);
      })
      .catch((error) => console.log(error));
    }
  }, [selectedCategory]);

  const handleDetailsChange = (e) => {
    const selectedDetailsIds = Array.from(e.target.selectedOptions, option => option.value);
    setSelectDetails(selectedDetailsIds);

    setNewProduct((product) => ({
      ...product,
      detailsId: selectedDetailsIds 
    }));

    setDisplaySelected(selectedDetailsIds);
  };

  //Add product
  const handleAddProduct = async (e) =>{
    e.preventDefault();
    console.log(newProduct);

    try{
      const token = localStorage.getItem("user: "); // Get JWT token
      if (!token) {
          alert("Unauthorized: Please log in as Admin");
          return;
      }
      
      const resp = await axios.post(urlAdmin.API_URL_ADD_PRODUCT, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token for authentication
          "Content-Type": "application/json",
        },
      });

      if(resp.status === 200){
        console.log("Product is added");

        setNewProduct({
          productName: '',
          description: '',
          categoryId: null,
          price: 0.0,
          quantity: 0,
          season: '',
          createdAt: '',
          detailsId: null,
          isAvaliable: false,
        });
        window.location.reload();
        setShow(false);
        
      } else {
        console.error('Failed to add product');
      }

    } catch (error) {
      console.error('Error adding product', error);
    }
  }

  //Pagination (previous):
  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  //Pagination (next):
  const nextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  //Change Page
  const handlePageChange = (pageNum) =>{
    setCurrentPage(pageNum);
  }

  //Upload images in product
  const uploadImage = (id) =>{
    setProductIdUpload(id);
    setModalImageShow(true);
  }

  //add size for product
  const addSize = (id) =>{
    setProductIdSize(id);
    setModalSizeShow(true);
  }
  //edit product
  const editProduct = (id) =>{
    console.log(id);
  }

  //view product
  const viewProduct = (id) =>{
    console.log(id);
  }

  return(
    <>
      <div className="table-list cards">
        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between padding-1rem">
          <Form className="d-flex width-search">
            <Form.Control type="search" className="form-control" placeholder="Search product"/>
          </Form>
          <div>
            <Button onClick={handleShow} className="w-100">
              <RiAddFill/> Add Product
            </Button>
          </div>
        </div>
        {/* <hr></hr> */}
        <Table className="head">
          <thead>
            <tr>
              <th scope='col' className="header-table paddLeft">Product</th>
              <th scope='col' className="header-table">Category Name</th>
              <th scope='col' className="header-table">Price</th>
              <th scope='col' className="header-table">Quantity</th>
              <th scope='col' className="header-table">Available</th>
              <th scope='col' className="header-table">Action</th>
            </tr>
          </thead>
          <tbody className="border-top text-table">
            {
              currenProduct.map((product) => (
                <tr className="align-middle" key={product.productId}>
                  <td className="paddLeft">
                    <div className="d-flex">
                      <div className="imageProduct">
                        {product.images.length > 0 ? 
                        ( <img 
                          src={`http://localhost:7102/Upload/${product.images[0].imageName}`} 
                          className="image-bas"
                          alt="upoladimage"
                        ></img>) : (
                          <div></div>
                        )
                        }
                      </div>
                      <div className="data-Name">
                        <div>{product.productName}</div>
                        <div className="title-car pt-1">
                          {product.description.length > maxLength 
                          ? (`${product.description.slice(0, maxLength)}`) : (product.description) }
                          <span data-toggle="tooltip" data-placement="bottom" title={product.description}>...</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td clas>{product.category.categoryName}</td>
                  <td>{product.price}</td>
                  <td className="text-center">{product.quantity}</td>
                  <td>{product.isAvaliable ? (
                      <div className="">
                        <span className="text-success product-ava">Available</span>
                      </div>
                    ) : (
                      <div className="">
                        <span className="text-warning product-not-ava">Not Available</span>
                      </div>
                    )
                  }
                  </td>
                  <td>
                    <div className="d-flex"> 
                      <div>
                        <FiUpload 
                          className="icon-action-tp" onClick={() => uploadImage(product.productId)} />
                      </div>
                      <div>
                        <GiBodyHeight className="icon-action-tp" onClick={() => addSize(product.productId)}/>
                      </div>
                      <div>
                        <MdModeEdit className="icon-action-tp" onClick={() => editProduct(product.productId)}/>
                      </div>
                      <div>
                        <BiSolidShow className="icon-action-tp" onClick={() => viewProduct(product.productId)}/>
                      </div>
                      {/* <div dateFormat="dd/MM/yyyy">{product.createdAt}</div> */}
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
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}/>
                {
                Array.from({length: totalPages}).map((_, index) => (
                  <Pagination.Item key={index + 1} 
                    active={index + 1 === currentPage} 
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
              </Pagination>
            </Col>
        </Row>
      </div>

      {/* Modal Add Product */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modal-product">
        <Modal.Header closeButton>
          <Modal.Title className="title-Modal">Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={6} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Name</Form.Label>
                  <Form.Control 
                    type="text" placeholder="" 
                    autoFocus className="font-input"
                    value={newProduct.productName}
                    onChange={(e) =>
                      setNewProduct({...newProduct, productName: e.target.value})
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Season</Form.Label>
                  <Form.Select  name="season"
                    value={newProduct.season}
                    onChange={(e) => 
                      setNewProduct({...newProduct, season: e.target.value})
                  }>
                    <option></option>
                    <option>Winter</option>
                    <option>Summer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Category</Form.Label>
                  <Form.Select 
                    value={selectedCategory} 
                    onChange={(e) => {
                      SetSelectedCategory(e.target.value)
                      setNewProduct({...newProduct, categoryId: e.target.value})
                    }}>
                    <option className="font-input">Select..</option>
                  {
                    categories.map((category) =>(
                      <option 
                        className="font-input" 
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))
                  }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Details</Form.Label>
                  
                  <Form.Select 
                    name="details"
                    value={newProduct.detailsId} 
                    onChange={handleDetailsChange}
                    className="form-control"
                    >
                    <option className="font-input">Select...</option>
                    {
                      categoryDetails.map((details) =>(
                        <option
                          className="font-input"
                          key={details.detailsId}
                          value={details.detailsId}
                        >
                          {details.detailName}
                        </option>
                      ))
                    }
                     {
                        displaySelected.map((display) => (
                          <div className="">{display}</div>
                        ))
                      }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Price</Form.Label>
                  <Form.Control 
                    type="price" placeholder="" 
                    className="font-input" value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({...newProduct, price: e.target.value})
                    }/>
                </Form.Group>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Form.Group className="mb-3">
                  {/* <Form.Label className="product-tit">Discount</Form.Label>
                  <Form.Control 
                    type="DiscountPercentage" 
                    placeholder="" className="font-input"
                    value={newProduct.discountPercentage}
                    onChange={(e) =>
                      setNewProduct({...newProduct, discountPercentage: e.target.value})
                    }
                  /> */}
                </Form.Group>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="product-tit">Quantity</Form.Label>
                  <Form.Control 
                    type="quantity" 
                    placeholder="" className="font-input"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({...newProduct, quantity: e.target.value})
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="product-tit">Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3} className="font-input"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({...newProduct, description: e.target.value})
                }
                />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-3 form-group">
                <Form.Label className="product-tit d-flex">Date Added</Form.Label>
                <DatePicker 
                  placeholder="" className="form-control" 
                  value={newProduct.createdAt}
                  selected={selectedDate} onChange={handleChangeDate} dateFormat="dd/MM/yyyy"
                />
                {/* <BiSolidCalendar />  */}
              </Form.Group>
              <div className="form-check form-switch padding-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  checked={isChecked} onChange={handleChecked}></input>
                <label className="form-check-label" htmlFor="toggleSwitch">
                  Is the product Available?
                </label>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for upolad images */}
      <ModelUpload show={modalImageShow} onClose={() => setModalImageShow(false)} productId={productIdUpload}/>

      {/* Modal for add size */}
      <ModalSize show={modalSizeShow} onClose={() => setModalSizeShow(false)} productId={productIdSize}/>
    </>
  );
}
export default BasicTable;