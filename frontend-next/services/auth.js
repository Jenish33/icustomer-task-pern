import axios from 'axios';
import jwt from 'jsonwebtoken'
export const login = async (data) => {
  try {
    const response = await axios.post(' https://icustomer-backend-k0ocolwje-jenish33s-projects.vercel.app/login', data);
    const token = response?.data?.token;
    if(token){
      localStorage.setItem('token', token);
      return jwt.decode(token);
    }
    return response?.data
  } catch (error) {
    throw error;
  }
};

export const getToken = () => localStorage.getItem('token');

export const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  const decoded = jwt.decode(token);
  return decoded && decoded.exp > Date.now() / 1000;
};