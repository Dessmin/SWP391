import axios from "axios"; 

const apiOrderDetails = axios.create({
   baseURL: "http://localhost:8080/api/order-details/",
})

export default apiOrderDetails;