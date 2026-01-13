import axios from 'axios';
import envConfig from '../config/env.config';
import useAuthStore from '../store/auth.store';
import { getTimedGreetings } from '../components/exports';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: envConfig.baseRL,
  timeout: 10000,
  withCredentials: true
})

api.interceptors.response.use(
  (res) => res, async (err) => {
    const originalRequest = err.config
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.get('/api/v1/user/auth', { withCredentials: true });
        useAuthStore.getState().login(data);

        const greeting = getTimedGreetings();
        toast.success(`${greeting?.phrase} ${data.user.username} Welcome!`);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        useAuthStore.getState().logout();
        toast.error('Session expired. Please log in again.');
        return Promise.reject(refreshError);
      }
    }

  }
)

export default api