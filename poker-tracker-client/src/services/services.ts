import { GetCasinosResponse } from '@/models/requests/types';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`; // Replace with your actual API URL

export const fetchCasinos = async () => {
  const response = await axios.get<GetCasinosResponse>(`${API_URL}/casinos`);
  return response.data;
};