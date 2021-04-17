import React from 'react';
import {useHistory} from "react-router-dom";
import './MovieList.css';
const MovieList = (props) => {

    let history = useHistory();
    const showDetails = async (id) => {
        history.push(`/movie/${id}`);
    };

    return (
        <>
        <div className='row'>
            {props.movies.map((movie, index) => (

                <div key={index} className='image-container-list justify-content-center col'>
                    <img src={movie.Poster == 'N/A' ? 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg' : movie.Poster} alt='movie'></img>
                    <div className={'mydetails'}>
                       <span className='d-flex '>  <p className='ttl-txt'>Title : </p><p> &nbsp;{movie.Title}</p></span>
                       <span className='d-flex'>  <p className='ttl-txt'>Type : </p><p>  &nbsp;{movie.Type} </p></span>

                       <span className='d-flex'>  <p className='ttl-txt'>Year : </p><p>  &nbsp;{movie.Year}</p></span>

                       <span className='d-flex'>  <button onClick={() => {showDetails(movie.imdbID)}} className="detalis-btn">Details</button></span>


                    </div>
                </div>
            ))}
             </div>
        </>
    );
};

export default MovieList;