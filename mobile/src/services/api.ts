import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// NOTE: On Android Emulator, 10.0.2.2 is the address to your machine's localhost
const LOCAL_IP = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = `http://${LOCAL_IP}:8000/api/v1`;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
