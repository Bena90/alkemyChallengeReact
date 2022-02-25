import React from 'react'
import { Button } from 'react-bootstrap';
import './item.scss';


const Item = ({ recipe }) =>{ 

    return (
        <div className="itemBox">
            <br />
            <div className="itemImg">
                <img src={recipe.image} alt="Food" />
            </div>
            <div className="itemDetail">
                <br />
                <p> {recipe.title} </p>
                <p>Time: {recipe.readyInMinutes} </p>
                <p>Health Score: {recipe.healthScore} </p>
                <p> Vegan: {(recipe.vegan) ? ('Yes'):('No')}</p>
                <p ><strong>Price: $ {recipe.pricePerServing.toFixed(2)}</strong></p>
            </div>
        </div>
    )
}

export default Item;