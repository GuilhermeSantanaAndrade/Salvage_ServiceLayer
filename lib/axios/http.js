'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axiosInstance = _axios2.default.create({
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  baseURL: 'http://esalvage.azurewebsites.net'
});

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

exports.default = axiosInstance;