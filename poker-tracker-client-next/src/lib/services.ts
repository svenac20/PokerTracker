import axios from 'axios';
import axiosClient from './axios';
import { GetCasinosResponse } from './types';


export const fetchCasinos = async () => {
  const response = await axiosClient.get<GetCasinosResponse>(`/casinos`);
  return response.data;
};