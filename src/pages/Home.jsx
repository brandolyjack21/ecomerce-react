import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getproductsThunk } from '../store/slice/products.slice';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { categoryFilterThunk, nameFilterThunk } from '../store/slice/products.slice';
import { Link } from 'react-router-dom';
import { productDetailOne } from '../store/slice/productDetail.slice';

function Home() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products )
  const [categories, setCategories] = useState([])
  const [nameProduct, setNameProduct] = useState('')
  
  useEffect(() => {
    dispatch(getproductsThunk())
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
         .then(res => setCategories(res.data))
         .catch(error => console.error(error))
  },[])

  
  console.log(products);

  return (
    <div style={{ padding: 20}}>
      <Row>
        <Col md={4} lg={3}>
           <h2>primera columna</h2>
            <ListGroup as="ol" numbered>
              {
                categories.map(category => (
                  <ListGroup.Item as="li" key={category.id} onClick={() => dispatch(categoryFilterThunk(category.id))}>{category.name}</ListGroup.Item>
                ))
              }
            </ListGroup>
        </Col>
        <Col md={8} lg={9}>
           <Row xs={1} md={2} lg={3} style={{ gap:1 }}>
            <h1>Productos</h1>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Nombre del producto"
                aria-label="Nombre del producto"
                aria-describedby="basic-addon2"
                value={nameProduct}
                onChange={e => setNameProduct(e.target.value)}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(nameFilterThunk(nameProduct))}>
                Buscar
              </Button>
            </InputGroup>
            {
              products.map(item => (
                <Col className='mb-3' key={item.id} style={{ width: 300, height: 400, }} >
                  <Card style={{ width: '18rem', padding: 5}} onClick={() => dispatch(productDetailOne(item.id))} as={Link} to={`/productdetail/${item.id}`}>
                    <Card.Img variant="top" src={item.images[0].url} style={{maxHeight:200, objectFit: 'cover' }}/>
                    <Card.Body style={{ height:202 }}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>Precio: ${item.price} dolares
                      </Card.Text>
                      <Button variant="primary">agregar al carrito</Button>
                    </Card.Body>
                  </Card>
                </Col>
                
              ))
            }
           </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home
