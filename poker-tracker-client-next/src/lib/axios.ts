import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
  timeout: 30000, 
  httpsAgent: true
});

export default axiosClient;