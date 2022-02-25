import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useMenu } from '../../context/menuContext';
import Item from '../item/item';
import emptyMenu from '../../assets/empty.png'
import { useNavigate } from 'react-router-dom';
import './itemList.scss'

const ItemList = () => {

    const { recipes, deleteMeal } = useMenu ();
    const navigate = useNavigate();
    return (
        <Container >
            {(recipes.length !== 0) ? (            
                <Row className="justify-content-center">
                    {recipes.map((rec) =>(
                        <Col className="recipe col-lg-2" key={rec.id}>
                            <Item  recipe={rec} />
                            <Button variant="danger" size="sm" onClick={ () => deleteMeal(rec.id) }>
                                Delete
                            </Button>
                        </Col>
                    ))}
                </Row>
            ):(
                <div>
                    <h1>The menu is empty!</h1>
                    <div>
                        <img className="w-100" src={emptyMenu} alt="Empty Menu" />
                    </div>
                    <h3>You can add meals to the menu.</h3>
                </div>
            )}
            <div>
                <Button variant="success" onClick={()=>navigate('/search')}>Add meal</Button>
            </div>
        </Container>
    )
}

export default ItemList;


