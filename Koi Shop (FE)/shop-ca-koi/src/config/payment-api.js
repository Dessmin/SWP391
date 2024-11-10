import axios from "axios"; 

const apiPayment = axios.create({
   baseURL: "http://14.225.210.143:8080/api/payments/",
})

export default apiPayment;