import axios from "axios"; 

const apiKoi = axios.create({
   baseURL: "http://14.225.210.143:8080/api/koi-fishes/",
})

export default apiKoi;