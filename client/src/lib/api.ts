import axios from 'axios';
import envConfig from '../config/env.config';

const api = axios.create({
  baseURL: envConfig.baseRL,
  timeout: 10000
})

api.interceptors.response.use(
  (res) => res,
  err => {
    return Promise.reject(err)
  }
)

export default api