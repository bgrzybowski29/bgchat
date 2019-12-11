import axios from 'axios';

// const baseUrl = 'https://garagelistings-api.herokuapp.com';
const baseUrl = 'http://localhost:3000';

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}
export const changePassword = async (loginData) => {
  const resp = await api.post('/auth/resetpassword', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data
}
export const resetPassword = async (resetToken, data) => {
  const resp = await api.put(`/password_resets/${resetToken}`, data)
  return JSON.stringify(resp.data);
}
export const resetPasswordInit = async (data) => {
  const resp = await api.put(`/password_resets/new`, data)
  return JSON.stringify(resp.data);
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}
