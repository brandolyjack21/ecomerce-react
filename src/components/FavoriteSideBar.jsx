import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { getFavoritesThunk } from '../store/slice/favoriteProducts.slice';

function FavoriteSideBar() {
  useEffect(() => {
      dispatch(getFavoritesThunk())
    }, [])
    const favoriteProduct = useSelector(state => state.favoriteProduct)
    const dispatch = useDispatch()

    
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCanva = () => {
      
      const token = localStorage.getItem('token')
      if (token) {
        handleShow()
      }else{
        navigate('/login')
      }
    }

    const decrementQuantity = (item) => {
       dispatch(updateQuantityThunk(item.id, item.quantity - 1))
    }
    
    const incrementQuantity = (item) => {
      dispatch(updateQuantityThunk(item.id, item.quantity + 1))
    }
      console.log(favoriteProduct,'este es el favoriteProduct dentro de useEffect');
  return (
    <div>
       <div  variant="primary" onClick={handleCanva}>
       shopping cart
      </div>

      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ boxSizing:'border-box', padding: 0, margin:0, display:'flex', flexDirection:'column', gap:30 }}>
            {
              favoriteProduct.map( item => (
                <li style={{ display:'flex', gap: 10, borderWidth: 1, borderColor: 'black', borderStyle: 'solid', padding:5  }}>
                  <div>
                    <img style={{ width:100, height: 100 }} src={item.product.images[0].url} alt="" />
                  </div>
                  <div style={{ display:'flex', gap: 10, fontSize: 15, justifyContent: 'space-evenly'}}>
                    <div>
                      <div>
                        <p>{item.product.title}</p>
                        <div style={{ display:'flex', gap: 5 }}>
                          <button onClick={() => decrementQuantity(item)}>-</button>
                          <div>{item.quantity}</div>
                          <button onClick={() => incrementQuantity(item)}>+</button>
                        </div>
                      </div>
                      <div>eliminar</div>
                    </div>
                    <div>
                      {item.product.price}
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default FavoriteSideBar
