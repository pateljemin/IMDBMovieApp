import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import MovieList from './MovieList';
import Loader from './Loader';
import Title from './Title';
import Form from "./Form";
import {API_KEY} from "../constants";
import Pagination from "react-js-pagination";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [loading, setLoading] = useState(false);

    const setUserSearchValue = (value) => {
        localStorage.setItem('s',value);
        setSearchValue(value);
    };

    const setUserType = (value) => {
        localStorage.setItem('type',value);
        setType(value);
    };

    const setUserYear = (value) => {
        localStorage.setItem('year',value);
        setYear(value);
    };

    const getMovieRequest = async (searchValue, type, year) => {
        setLoading(true);
        const queryParams = [];

        if (searchValue) {
            queryParams.push(`s=${searchValue}`);
        }
        if (type) {
            queryParams.push(`type=${type}`);
        }
        if (year) {
            queryParams.push(`y=${year}`);
        }
        const queryParamsString = queryParams.join('&');
        const url = `http://www.omdbapi.com/?${queryParamsString}&plot=full&page=${activePage}&apikey=${API_KEY}`;

        const response = await fetch(url);
        const responseJson = await response.json();
        setLoading(false);
        if (responseJson.Search) {
            setTotalMovies(responseJson.totalResults);
            setMovies(responseJson.Search);
        }
    };

    const searchResult = () =>{
        setActivePage(1);
        getMovieRequest(searchValue,type,year);
    };
    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    };
    useEffect(() => {
        const previousSearch = localStorage.getItem('s');
        const previousType = localStorage.getItem('type');
        const previousYear = localStorage.getItem('year');
        if(previousSearch) {
            setSearchValue(previousSearch);
        }
        if(previousType) {
            setType(previousType);
        }
        if(previousYear) {
            setYear(previousYear);
        }
        getMovieRequest(previousSearch,previousType,previousYear);
    }, [activePage]);

    return (
        <div className='container-fluid'>
            <div className='row mt-4 mb-4'>
                <Title heading='Movies'/>
 <div className='movie-search'>
                <Form searchValue={searchValue} setSearchValue={setUserSearchValue} type={type} setType={setUserType} year={year} setYear={setUserYear} searchCall={searchResult}/>
</div>
            </div>
            {loading && <Loader/>}
            {!loading && <div className='row'>
                <MovieList movies={movies}/>
            </div>}
            {!loading && movies.length > 0 && <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={Number(totalMovies)}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />}
        </div>
    );
};

export default Home;