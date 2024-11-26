import axios from './axios-customize';

export const callRegister = (fullName, email, password, phone, dateOfBirth, address) => {
    return axios.post('/auth/register', { fullName, email, password, phone, dateOfBirth, address })
}

export const callLogin = (username, password) => {
    return axios.post('/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/auth/account')
}

export const callRefreshToken = () => {
    return axios.get('/auth/refresh')
}

export const callLogout = () => {
    return axios.post('/auth/logout')
}