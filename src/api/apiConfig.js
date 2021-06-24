import axios from 'axios';
import { getAccessToken } from '../helpers/localStorageHandlers';

import { config } from '../config';

let isRefreshingTokenInProgress = false;
let requestsQueue = [];

const apiInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Accept': 'application/json',
        'x-api-key': config.apiKey
    }
});

// Add a response interceptor
apiInstance.interceptors.response.use(function (response) {
    if(response?.data?.token || response?.data?.accessToken){
        const token = response.data.token || response.data.accessToken;
        apiInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return response;
  }, async function (error) {
    let passError = {};
    if(!error.response){
        passError = new Error('No Server error response');
        passError.status = 500;
        passError.data = null;
        passError.message = 'No Server error response';
        return Promise.reject(passError);
    } else {
        passError.status = error.response.status;
        passError.data = error.response.data;
        passError.message = error.response.data.message;
        passError.code = error.response.data.code;
        return Promise.reject(passError);
        
    }
});


export const refreshTokenProcess = {
    isRefreshingTokenInProgress,
    requestsQueue
}

export default apiInstance;