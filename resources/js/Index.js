import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import AuthService from './Services/AuthService';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Home from './Home';

class Index extends Component {
    render() {
        // const isLoggedIn = AuthService.isLoggedIn();

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" caseSensitive={false} element={<Home/>}></Route>
                    <Route path="/register" caseSensitive={false} element={<Register/>}></Route>
                    {/* <Route exact path="/login" component={Login}></Route> */}
                    {/* <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} /> */}
                </Routes>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
