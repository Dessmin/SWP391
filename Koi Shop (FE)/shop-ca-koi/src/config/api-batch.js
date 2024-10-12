import axios from "axios"; 

const apiBatch = axios.create({
   baseURL: "http://localhost:8080/api/batches/",
})

export default apiBatch;