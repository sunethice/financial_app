import axios from "axios";
import Cookies from "js-cookie";

class AuthService{
    signIn(credentials) {
        return axios
                .post("/api/login", {
                    email: credentials.email,
                    password: credentials.password,
                    rememberMe: false
                });
    }

    signUp(pRegisterDetails) {
        return axios
                .post("/api/register", {
                    name: pRegisterDetails.name,
                    email: pRegisterDetails.email,
                    password: pRegisterDetails.password,
                    password_confirmation: pRegisterDetails.password_confirmation
                });
    }

    isLoggedIn(){
        if(Cookies.get("access_token")){
            return true;
        }
        else{
            return false;
        }
    }

}

export default AuthService;