import React, { Component } from 'react';
import AuthService from './Services/AuthService';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
// import "../css/register.css";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            authService: new AuthService(),
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            redirectTo: null
        };
    }

    async onSigninClick(event){
        event.preventDefault();
        event.stopPropagation();
        const { authService, email, password } = this.state;
        const mRegisterDetails = {
            email, password
        }
        try{
            const mResponse = await authService.signIn(mRegisterDetails);
            if (mResponse.status == 200) {
                var expireTime = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set('access_token',mResponse.data.access_token,{
                    expires: expireTime
                });
                this.setState({redirectTo:<Navigate to="/" />});
            } else {
                Swal.fire({
                    title: 'Unuccessful',
                    text: "Sign in unsuccessful, Please try again.",
                    type: 'warning',
                    timer: 2000
                });
            }
        }catch(err){
            Swal.fire({
                title: 'Sign up unsuccessful',
                text: err.message,
                type: 'warning',
                timer: 2000
            });
        }
    }

    render() {
        const { authService, email, password, redirectTo } = this.state;
        return ( 
            <div className="container "> 
               <div className="pt-5 h2 w-100 text-center">
                    <div className="col-12">Sign In</div>
                </div>
                <div className="form-container">
                    <form className="form-wrap-2">
                        <div className="form-row mb-3">
                            <div className="col">
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control signinEntry"
                                    placeholder="Email"
                                    onChange={event =>
                                        this.setState({
                                            email: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control signinEntry"
                                    placeholder="Password"
                                    value={password}
                                    onChange={event =>
                                        this.setState({
                                            password: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="col text-right">
                                <a href="" className="forgotPass">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="form-row mb-3 text-center">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-auth btn-warning btn-signin"
                                    onClick={(event) => {
                                        this.onSigninClick(event);
                                    }}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="col text-center signUpWrap">
                                Don't have an account?&nbsp;
                                <a
                                    href="#"
                                    className="signUp"
                                    onClick={() => {
                                        this.setState({
                                            signup: true
                                        });
                                    }}
                                >
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                {redirectTo}
            </div>);
    };
}

export default Login;