import React from 'react';
import { Container } from 'react-bootstrap';
import ItemList from '../../components/itemList/itemList';
import MenuDetails from '../../components/menuDetails/menuDetails';
import { useMenu } from '../../context/menuContext';
import './HomePage.scss'

const HomePage = () => {

    const { recipes } = useMenu();

    return(
        <div className="homePage">
            <Container>
                <div className=" text-center">
                    <h2>Welcome!</h2>
                    {(recipes.length !== 0) &&
                        <div>
                            <p>
                                We prepare this menu for you! If you don't like it, you can change it.
                            </p>
                        </div>
                    }
                    <MenuDetails/>
                    <ItemList/> 
                    <p> You can add as many dishes as you want. </p>
                </div>
            </Container>
        </div>
 )   
}

export default HomePage;