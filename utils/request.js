// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const service = axios.create({
  baseURL: process.env.baseUrl,
  timeout: 5000,
});

// request interceptors
service.interceptors.request.use((config) => config, (error) => {
  console.log(error);
  return Promise.reject(error);
});

// response interceptors
service.interceptors.response.use((response) => {
  console.log('[Axios]: response ');
  return response.data;
}, (error) => {
  const { response = {} } = error;
  const { data = null } = response;
  console.log('[Axios:Error]: ', data); // for debug
  return Promise.reject(data || error);
});

export default async function api(url, data, method = 'POST', headers = {}, params = {}) {
  // Set token before request sent
  let token = '';
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('auth_token');
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers['Access-Control-Allow-Origin'] = '*';
  }

  const result = await service.request({
    method,
    url,
    data,
    params,
    headers,
  });
  return result;
}
