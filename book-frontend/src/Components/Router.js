import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import JoinForm from '../Routes/user/JoinForm';
import LoginForm from '../Routes/user/LoginForm';
import Home from '../Routes/book/Home';
import Detail from '../Routes/book/Detail';
import SaveForm from '../Routes/book/SaveForm';
import UpdateForm from '../Routes/book/UpdateForm';
import Header from './Header';


export default () => (
    <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/saveForm" exact component={SaveForm} />
        <Route path="/loginForm" exact component={LoginForm} />
        <Route path="/joinForm" exact component={JoinForm} />
        <Route path="/book/:id" exact component={Detail} />
        <Route path="/updateForm/:id" exact component={UpdateForm} />
        <Redirect from="*" to="/" />
    </Router>
);