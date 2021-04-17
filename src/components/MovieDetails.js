import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {API_KEY} from "../constants";
import Loader from "./Loader";

const MovieDetails = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    const getMovieDetails = async () => {
        const url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`;
        setLoading(true);
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson) {
            setMovie(responseJson);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            history.push('/');
        } else {
            getMovieDetails();
        }
    }, [id]);

    const goBack = () => {
        history.push('/');
    };

    return (
        <div>
        {loading && <Loader/>}
            {!loading && <button style={{marginTop:'20px', marginLeft:'20px'}} className="btn btn-primary" onClick={goBack}>Back</button>}
            {!loading && <div className='image-container justify-content-start m-3'>
                <section id="Janurary 23, 2017">
                    <div class="container">
                        <div class="container-wrap">
                            <div class="row">
                                <div class="col-12">
                                    <h3>{movie.Released}</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <img src = {movie.Poster} />
                                </div>
                                <div class="col-md-6 col-xs-12 text-center">
                                    <h3>{movie.Title}</h3>
                                    <br/>
                                    <h5>Type</h5>
                                    <h4>{movie.Type}</h4>
                                    <br/>
                                    <h5>Year</h5>
                                    <h4>{movie.Year}</h4>
                                    <br/>
                                    <h5>Genre</h5>
                                    <h4>{movie.Genre}</h4>
                                    <br/>
                                    <div className={'title'}>
                                        {movie && movie.Ratings && movie.Ratings.map((rating) =>{
                                            return <div><h5> {rating.Source}</h5><h4> {rating.Value}</h4></div>
                                        })}
                                    </div>
                                    <br/>
                                    <p>{movie.Plot}</p>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>}
        </div>
    );
};

export default MovieDetails;