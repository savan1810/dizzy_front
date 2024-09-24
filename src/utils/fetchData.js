import axios from 'axios'
import { BASE_URL } from './axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const postDataAPI = async (url, post, token) => {

    const res = await axios.post(`${BASE_URL}/${url}`, post,
        {
            headers: { Authorization: token }
        })

    return res;
}

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`,
        {
            headers: { Authorization: token }
        })

    return res;
}

export const putDataAPI = async (url, post, token) => {

    const res = await axios.put(`${BASE_URL}/${url}`, post,
        {
            headers: { Authorization: token }
        })

    return res;
}