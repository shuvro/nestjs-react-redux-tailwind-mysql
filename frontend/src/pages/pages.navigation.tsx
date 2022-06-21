import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeScreen from './home/home.screen';
import SigninScreen from './signin/signin.screen';
import SignupScreen from './signup/signup.screen';
import ListScreen from './movie/list.screen';
import NotFoundScreen from './404/not-found.screen';
import CreateScreen from "./movie/create.screen";
import EditScreen from "./movie/edit.screen";

const PagesNavigation = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/signin" component={SigninScreen} />
                <Route exact path="/signup" component={SignupScreen} />
                <Route exact path="/movies" component={ListScreen} />
                <Route exact path="/movies/create" component={CreateScreen} />
                <Route exact path="/movies/:id" component={EditScreen} />
                <Route exact path="/404" component={NotFoundScreen} />
                <Redirect to='/404' />
            </Switch>
        </Router>
    );
}

export default PagesNavigation;
