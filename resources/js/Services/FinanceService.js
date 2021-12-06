import axios from "axios";
import Cookies from "js-cookie";

class FinanceService{
    constructor(){
        this.axiosInstance = axios.create();
        this.axiosInstance.interceptors.request.use((config) => {
            try {
               const token = Cookies.get("access_token");
               config.headers.Authorization = token ? `Bearer ${token}` : "";
               return config;
            } catch (error) {
               handleException(error, "Could not get app token");
            }
            return config;
         });
    }
     
    getProfile(pComanyName) {
        return this.axiosInstance.get("/api/getProfile", {
            params: {
               company_name: pComanyName,
            },
        });
    }

    getQuotes(pComanyNames) {
        return this.axiosInstance.get("/api/getQuote", {
            params: {
                company_names: pComanyNames,
            },
        });
    }
}

export default FinanceService;