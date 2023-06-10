import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { viewLoading } from '../store/slice/isLoading.slice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = (data) => {
    dispatch(viewLoading(true))
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
         .then( res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          navigate('/')
         })
         .catch(error => {
          console.error(error)
          if (error.response.status === 401) {
            alert('Los datos que ingresaste son incorrectos intentalo de nuevo.')
          }
        })
         .finally(dispatch( viewLoading(false)))
  }

  return (
    <div style={{ paddingTop:150, paddingLeft: 100, paddingRight:100 }}>
      <h1 style={{  marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingBottom: 30 }}>Inicia seccion</h1>
      <Form onSubmit={handleSubmit(submit)} style={{width: 320, marginLeft: 'auto', marginRight: 'auto'}}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Email" 
          {...register('email')}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="Password"
           {...register('password')}
          />
        </Col>
      </Form.Group>
      <fieldset>
      </fieldset>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>
    </Form>
    </div>
  )
}

export default Login
