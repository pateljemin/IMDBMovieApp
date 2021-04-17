import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/Home" component={Home} />
                <Route exact path="/">
                    <Redirect to="/Home" />
                </Route>
                <Route exact path="/movie/:id" component={MovieDetails} />
            </Switch>
        </Router>
    );
};

export default App;