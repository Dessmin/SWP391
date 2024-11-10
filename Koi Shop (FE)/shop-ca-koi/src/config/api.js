import axios from "axios"; 

const api = axios.create({
   baseURL: "http://14.225.210.143:8080/api/",
})

export default api;