import axios from 'axios';
import * as cookie from 'cookie';

const api = axios.create({
  baseURL: '/api',
});

function getToken(): string | null {

  if (typeof document === 'undefined') return null;
  const rawCookies = document.cookie;
  const cookies = cookie.parse(rawCookies);
  localStorage.setItem('access_token', cookies.access_token);
  return cookies.access_token ?? null;
}

api.interceptors.request.use(config => {
 
  const token = getToken();
   console.log(token)
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = `application/json`;
  }
  return config;
});

export default api;

