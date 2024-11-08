import axios from "axios"; 

const apiOrderDetails = axios.create({
   baseURL: "http://14.225.210.143:8080/api/order-details/",
})

export default apiOrderDetails;