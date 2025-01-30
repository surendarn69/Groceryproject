import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5050",
    headers:{
        "Content-Type":"application/json",
    },
});
export default api;
// api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5050', // Base URL for the API
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
