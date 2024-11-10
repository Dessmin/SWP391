import axios from "axios"; 

const apiOrder = axios.create({
   baseURL: "http://14.225.210.143:8080/api/orders/",
})

export default apiOrder;