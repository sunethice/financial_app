import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import AuthService from './Services/AuthService';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

class Index extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" caseSensitive={false} element={<Home/>}></Route>
                    <Route path="/login" caseSensitive={false} element={<Login/>}></Route>
                    <Route path="/register" caseSensitive={false} element={<Register/>}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
