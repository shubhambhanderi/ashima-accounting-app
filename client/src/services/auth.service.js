import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

const register = (firstname, lastname, username, password) => {
  return axios.post(API_URL + "signup", {
    firstname,
    lastname,
    username,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

export default {
  register,
  login,
  logout,
  //getCurrentUser,
};