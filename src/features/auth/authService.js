import axios from "axios";

const API = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

//Login User
 const login = (userData) => API.post('/api/users/login', userData);

//Rgister User
 const register = (userData) => API.post('api/users/register', userData);

//Email-verification
const emailVerification = (id, token) => API.get(`api/users/${id}/verify/${token}`);


const authService = {
    login,
    register,
    emailVerification
};

export default authService