import axios from 'axios'

const headersConfig = () => {
  const token = localStorage.getItem('TOKEN')
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  return defaultHeaders
}

export const requestHttp = async (method, url, data = {}, params = {}) => {
  try {
    const options = {
      method, // post, get, put, delete
      url,
      baseURL: process.env.REACT_APP_BASE_URL,
      data, // body
      params, // query params
      timeout: 5000,
      headers: headersConfig()
    }
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw error
  }
}
