import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { setProductDetail } from '../store/slice/productDetail.slice'
import { count } from '../store/slice/count.slice'
import '../pages/productDetail.css'
import { categoryFilterThunk } from '../store/slice/products.slice'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductDetail() {
    const {id} = useParams()
  const [productDetail, setProductDetail] = useState({})
  const [countProduct, setCountProduct] = useState(0)
  const dispatch = useDispatch()
  const similarProducts = useSelector(state => state.products)

  useEffect(() => {
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
    .then(res => {
        setProductDetail(res.data)
        dispatch(categoryFilterThunk(res.data.categoryId))
    })
    .catch(error => console.error(error))
  }, [])

  console.log(productDetail, 'este es el product detail');
  return (
    <div>
        <div className='container__productDetail'>
            <div className='container--imgProduct'>
                <img src={productDetail.images?.[0].url} alt="" />
            </div>
            <div className='container--detailProduct'>
                <h1>{productDetail.title}</h1>
                <p>{productDetail.description}</p>
                <div className='product--price'>
                    ${productDetail.price} dolares
                </div>
                <div className='container--countProduct'>
                    <button onClick={() => countProduct > 1 ? setCountProduct(countProduct - 1):setCountProduct(countProduct)}>-</button>
                    <div>{countProduct}</div>
                    <button onClick={() => setCountProduct(countProduct + 1)}>+</button>
                </div>
                <button className='button--card'>añadir al carrito</button>
            </div>
        </div>
        <div>
                <Row className='row--container' xs={1} md={2} lg={3} style={{ gap:1, paddingLeft:200  }}>
                    {
                        similarProducts.map(item => (
                        <Col className='mb-3' key={item.id} style={{ width: 300, height: 400, }}>
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
        </div>
    </div>
  )
}

export default ProductDetail
