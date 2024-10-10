import axios from "axios"; 

const apiKoi = axios.create({
   baseURL: "http://localhost:8080/api/koi-fishes/",
})

export default apiKoi;