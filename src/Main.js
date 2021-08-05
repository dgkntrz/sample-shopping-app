import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

const Main = () => {
    localStorage.setItem("sel",0);
    return (
        <BrowserRouter>
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' component={Home}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Main;