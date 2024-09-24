/**
 * axios setup to use mock service
 */

import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/admin/v2' });
const axiosServices = axios.create({ baseURL: BASE_URL });
// const axiosServices = axios.create({ baseURL: 'https://mock-data-api-nextjs.vercel.app/' });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
