import axios from "axios"; 

const apiPayment = axios.create({
   baseURL: "http://localhost:8080/api/payments/",
})

export default apiPayment;