import React, { Component } from 'react';
import AuthService from './Services/AuthService';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../css/register.css";

class Register extends Component{
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

    async onSignupClick(event){
        event.preventDefault();
        event.stopPropagation();
        const { authService, name,email,password,password_confirmation } = this.state;
        const mRegisterDetails = {
            name,email,password,password_confirmation
        }
        try{
            const mResponse = await authService.signUp(mRegisterDetails);
            if (mResponse.status == 200) {
                Swal.fire({
                    title: 'Sign up successful',
                    text: mResponse.data,
                    type: 'success',
                    timer: 2000
                });
                setTimeout(() => {
                    this.setState({redirectTo:<Navigate to="/login" />});
                }, 4000);
            } else {
                
            }
        }catch(err){
            Swal.fire({
                title: 'Sign up unsuccessful',
                text: err.message,
                type: 'warning',
                timer: 2000,
            
            });
        }
    }

    render() {
        const { authService, name,email,password,password_confirmation, redirectTo } = this.state;
        return ( 
            <div className="container "> 
               <div className="pt-5 h2 w-100 text-center">
                    <div className="col-12">Sign Up</div>
                </div>
                <div className="form-container">
                    <form className="form-wrap">
                        <div className="form-row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control signinEntry"
                                    placeholder="Name"
                                    onChange={event =>
                                        this.setState({
                                            name: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
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
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control signinEntry"
                                    placeholder="Confirm Password"
                                    value={password_confirmation}
                                    onChange={event =>
                                        this.setState({
                                            password_confirmation: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-row mb-3 text-center">
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn btn-auth btn-warning btn-signin"
                                    onClick={(event) => {
                                        this.onSignupClick(event);
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="col text-center signUpWrap">
                                Have an account?&nbsp;
                                <a
                                    href="#"
                                    className="signUp"
                                    onClick={() => {
                                        
                                    }}
                                >
                                    Sign In
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                {redirectTo}
            </div>);
    };
}

export default Register;