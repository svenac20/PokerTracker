import axios from 'axios';
import https from 'https'

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
  timeout: 3000, 
});

export default axiosClient;