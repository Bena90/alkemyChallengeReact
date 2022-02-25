
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/search/search';
import './SearchPage.scss'

const SearchPage = () =>{
    const navigate = useNavigate();

    return (
        <div  className="searchPage">
            <Container className="  d-flex justify-content-center flex-column align-items-center">
                    <SearchForm/>                
                    <Button variant="success" onClick={()=>navigate('/')}>
                        Back to menu
                    </Button>
            </Container>
        </div>
    );
};

export default SearchPage;