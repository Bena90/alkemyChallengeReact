import axios from 'axios';
import React from 'react';
import { createContext, useEffect , useState, useContext } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const MenuContext = createContext ({});
MenuContext.displayName = 'MenuContext'
export const useMenu = () => useContext (MenuContext);

export const MenuProvider = ({children}) =>{

// --- Menu Inicial --- //

    const [ recipes , setRecipes ] = useState ([])
    const [ error , setError ] = useState (null);
    const [ loading, setLoading ] = useState (false);
    const [ timeMenu, setTime ] = useState (0)
    const [ healthScore, setHealthScore ] = useState (0)
    const [ total , setTotal ] = useState (0)
    const [ search, setSearch ] = useState([]);
    const [ searchRecipes, setSearchRecipes ] = useState([]);
    const [ results , setResults ] = useState (null)
    const navigate = useNavigate();

    const getTotal = (array) => {
        let total = 0;
        let time = 0;
        let score = 0
        array.forEach((prod) => {
            total += prod.pricePerServing
            time += prod.readyInMinutes
            score += prod.healthScore
        });
        setTotal (total);
        setHealthScore (score/array.length)
        setTime (time/array.length)
    };
    const logOut = () => {
        localStorage.removeItem('token');
        setSearchRecipes ([])
        navigate ('/login')
        return false
    }

    // Delete function --->
    const deleteMeal = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You can add more food later",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                let newArray = recipes.filter ((element) => element.id !== id)
                setRecipes (newArray);
                if (newArray.length !==0){
                    getTotal(newArray);
                } else {
                    setHealthScore (0);
                    setTime (0)
                    setTotal (0)
                }
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your food has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )}
          })
    }
    // Search function --->
    const addMeal = (query, diet) => {
            setLoading (true)
            setSearchRecipes ([])
            let urlSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=920b588d0323470e9c49429d72e55ba2&query=${query}&diet=${diet}&number=2`
            axios.get(urlSearch)
            .then((res)=>{
                setResults(res.data.results.length)
                res.data.results.map((ids)=> {
                    axios.get(`https://api.spoonacular.com/recipes/${ids.id}/information?apiKey=920b588d0323470e9c49429d72e55ba2&includeNutrition=false`)
                    .then((res) =>{
                        setSearchRecipes ((prev) => [...prev, res.data])                   
                    })
                    .catch((err)=> setError(err))
                })
            })
            .catch((err)=> setError(err))
            .finally(()=> { 
                setLoading (false)
                
            });
    }
    // Add aditional food function --->
    const addToMenu = (food) =>{
        
        setRecipes((prev)=> ( [...prev, food] ))
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The menu was added!',
            showConfirmButton: false,
            timer: 1500
          })
          getTotal(recipes)
    }
    // Default menu --->
    useEffect (()=> {
        setLoading (true)
        let urls = [
            `https://api.spoonacular.com/recipes/random?apiKey=920b588d0323470e9c49429d72e55ba2&tags=vegan&number=1`,
            `https://api.spoonacular.com/recipes/random?apiKey=920b588d0323470e9c49429d72e55ba2&tags=vegan&number=1`,
            `https://api.spoonacular.com/recipes/random?apiKey=920b588d0323470e9c49429d72e55ba2&number=1`,
            `https://api.spoonacular.com/recipes/random?apiKey=920b588d0323470e9c49429d72e55ba2&number=1`
        ];
        axios
            .all(urls.map((url)=> axios.get(url)))
            .then((res)=>{
                res.map((recipe) => {
                    setRecipes ((prev) => ( [...prev, recipe.data.recipes[0]] ))
                    })
            })
            .catch((err)=> setError (err))
            .finally(()=> { 
                setLoading (false) 
            })
        
        }, []);

// --- Menu --- //

    if (loading){
        return (
        <div className='spinnerContainer'>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Cargando...
            </Button>
        </div>
        )
    }else if (error){
        return <p>Ha habido un error {error.message}</p>
    }else{
        return(
            <MenuContext.Provider 
                value = {{
                    recipes,
                    timeMenu, 
                    addMeal, 
                    deleteMeal, 
                    getTotal, 
                    setSearch,
                    searchRecipes,
                    setSearchRecipes,
                    addToMenu,
                    results,
                    healthScore, 
                    search, 
                    loading,
                    logOut,
                    total }} >
                {children}
            </MenuContext.Provider>
        );
    }
}
