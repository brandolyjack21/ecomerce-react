import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function FavoriteSideBar() {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCanva = () => {
        
        if (token) {
            handleShow()
        }else{
            navigate('/login')
        }
    }

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
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default FavoriteSideBar
