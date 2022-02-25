import React from 'react';
import { Container } from 'react-bootstrap';
import Login from '../../components/login/login';

const LoginPage = () =>{
    return(
        <Container className='pt-4'>
            <h1 className="text-center"> Welcome! </h1>
            <h4 className="text-center">Please, log in first.</h4>
            <Login/>
        </Container>

    )
}
export default LoginPage;