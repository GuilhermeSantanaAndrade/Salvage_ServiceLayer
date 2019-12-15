import axios from 'axios'

const axiosInstance = axios.create({
  validateStatus: (status) => status >= 200 && status < 300,
  baseURL: 'http://esalvage.azurewebsites.net'
})

axiosInstance.interceptors.request.use(function (config) { 
  return config;
}, function (error) { 
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) { 
  return response;
}, function (error) { 
  return Promise.reject(error);
})

export default axiosInstance