import { Field, Formik, Form, ErrorMessage } from 'formik';
import React from 'react'
import { useMenu } from '../../context/menuContext';
import Item from '../item/item';
import { Button, Row, Col } from 'react-bootstrap';
import './search.scss'

const SearchForm = () => {
    const {
        setSearch, 
        setSearchRecipes, 
        addMeal,
        searchRecipes, 
        loading, 
        deleteMeal,
        results,
        addToMenu,
        recipes
    } = useMenu ();

    const checkMenu =(array, recipe)=>{
        let foodInMenu = array.some((food) => food.id === recipe.id)
        if (foodInMenu){
            return true
        }else return false
    }

    if (searchRecipes.length === 0 ){
    return(
        <Formik
            initialValues={{
                query: '',
                vegan: false,
            }}
            validate= {(val)=>{
                    let error = {};
                    if(!val.query){
                        error.query= 'Please enter a word of at least 2 letters'
                    } else if (val.query.length < 3){
                        error.query= "It's too short"
                    }else if (/^\s+|\s+$/.test(val.query)){
                        error.query= "no se permite"
                    }
                    return error
                }}
            onSubmit={(val , {resetForm})=>
                {
                    setSearch ({})
                    if (val.vegan){
                        addMeal (val.query, 'vegan')
                    } else{
                        addMeal (val.query, '')
                    }
                    resetForm();
                }} 
        >
            {( { errors }) => (
                <Form className="form d-flex justify-contente-center flex-column" >
                    <label htmlFor="query" className="form-label">Search:</label>
                    <Field 
                        className="form-control"
                        type="text" 
                        id="query" 
                        name="query"
                        placeholder= "pasta, pizza, rolls, etc."
                    />
                    <ErrorMessage name="query" component={()=>(
                        <div className="error"> {errors.query} </div>
                    )}/>

                    <label className="form-check-label mt-2">
                        Vegan
                        <Field type="checkbox" className="form-check-input ms-2" name="vegan"  />
                    </label>
                    {errors.diet && <div className="error"> {errors.diet} </div>}
                    <button className="btn btn-success" type="submit"> Enviar </button>
                    {(results === 0) && <p className="error"> There are no matches. Try another word. </p>}
                </Form>
            )}
        </Formik>
    )} else if (loading){
        return(
            <h1>Cargando</h1>
    )} else{
        return (
            <div >
                <h2 className="text-center">We found these foods for you!</h2>
                <p>You can search again</p>
                <Button variant="success" onClick={()=> setSearchRecipes ([])}>
                    Reset
                </Button>
                <Row>
                    {searchRecipes.map((recipe) =>( 
                    <Col className ="recipe" key={recipe.id}> 
                        <Item recipe={recipe} remove={deleteMeal} />
                        {(checkMenu(recipes, recipe)) ? (
                                <Button disabled variant ="success" onClick={()=>addToMenu (recipe)}>
                                    On the menu
                                </Button>
                            ):(
                                <Button variant ="success" onClick={()=>addToMenu (recipe)}>
                                    Add to Menu
                                </Button>
                            )
                        }
                    </Col>
                    ))}
                </Row>

            </div>
        )}    
}

export default SearchForm;


