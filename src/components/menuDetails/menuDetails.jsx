import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useMenu } from '../../context/menuContext';
import './menuDetails.scss';

const MenuDetails = () => {
    const { recipes, timeMenu, healthScore, total, getTotal } = useMenu ();
    
    useEffect (()=>{
        (recipes.length !== 0) && getTotal(recipes)
    }, [recipes])

        return(
            <Container className="averageContainer">
                <Row >
                    <Col className="averageCol col-4 text-center mt-3 mb-3">
                        <h5> Average Time: </h5>
                        {(recipes.length !== 0) ? (
                            <p> {timeMenu.toFixed(2)} </p>
                        ):(
                            <p> 0 </p>
                        )} 
                    </Col>
                    <Col className="averageCol col-4 text-center mt-3 mb-3">
                        <h5> Health Score Average: </h5>
                        {(recipes.length !== 0) ? (
                            <p> {healthScore.toFixed(2)} </p>
                        ):(
                            <p> 0 </p>
                        )} 
                    </Col>
                    <Col className="averageCol col-4 text-center mt-3 mb-3">
                        <h5> Price Menu: </h5>
                        <p> $ {total.toFixed(2)} </p>
                    </Col>
                </Row>
            </Container>
        ) 
}

export default MenuDetails;
