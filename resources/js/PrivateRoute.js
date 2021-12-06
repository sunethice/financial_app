
import React from 'react'
import AuthService from './Services/AuthService'
import { Navigate } from 'react-router-dom';

const PrivateRoute = (Component) => {
    const cAuthService = new AuthService();
    const AuthRoute = () => {
      const isAuth = cAuthService.isLoggedIn();
      if (isAuth) {
        return <Component />;
      } else {
        return <Navigate to="/login" />;
      }
    };
  
    return AuthRoute;
  };

export default PrivateRoute;