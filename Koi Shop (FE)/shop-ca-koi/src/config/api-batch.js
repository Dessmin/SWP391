import axios from "axios";

const apiBatch = axios.create({
  baseURL: "http://14.225.210.143:8080/api/batches/",
});

export default apiBatch;
