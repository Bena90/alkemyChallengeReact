import React, { useContext, useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import './login.scss'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () =>{

    const emailRef = useRef()
    const passwordRef = useRef()
    const { auth } = useContext(AuthContext)
    const [ error, setError ] = useState ('');
    const [ isLoading, setIsLoading ] = useState (false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading (true)
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log(isLoading)
        axios
            .post("http://challenge-react.alkemy.org/", {email, password})
            .then((res) =>{
                localStorage.setItem("token", JSON.stringify(res.data.token))
                navigate ('/')
            })
            .catch( (err) => {
                setError (err.response.data.error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Please provide valid email and password`,
                    footer: 'Please, try again!'
                  })
            })
            .finally( ()=>{
                console.log(isLoading)
                setIsLoading(false)
            }
            )
        }

    return (
        (auth() === true)? (
                <Navigate to ='/' />
        ):(
            <Container className="loginContainer">
                <Card className="m-4">
                    <Card.Body >
                        <h2 className =" cardTitle text-center mb-2">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            {(isLoading)? (
                                <div>
                                    <Button disabled variant="success" className='w-100 mt-4' type ='submit'> Loading... </Button>
                                </div>
                            ):(
                                <Button variant="success" className='w-100 mt-4' type ='submit'> Log In </Button>
                            )} 
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    )
}
export default Login;