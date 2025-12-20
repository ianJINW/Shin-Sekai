import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore, { type LoginReq, type Loginres } from "../store/auth.store";
import api from "./api";

const usePostInfo = <T = unknown>(url: string) => {

  return useMutation<T, Error, unknown>({
    mutationFn: (data: unknown) => {
      return api.post(url, data).
        then(res => res.data)
    },
    onSuccess: () => {
      console.log('Posted')
    },
    onError: (error) => {
      console.error('Error sending info', error);

    }
  })
}

const useGetInfo = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await api.get(url)

      return res.data
    }
  })
}

const LoginUser = (url: string) => {
  const login = useAuthStore(state => state.login)

  return useMutation({
    mutationFn: (data: LoginReq) => api.post<Loginres>(url, data),

    onSuccess: (res) => {
      login(res.data)
      console.log("Res data", res.data);
    },
    onError: (error) => {
      console.error(`Log in failed. ${error}`);
    }
  })
}

const LogoutUser = (url: string) => {
  const logout = useAuthStore(state => state.logout)

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await api.get(url)

        logout()
        return res.data
      } catch (error) {
        console.error(`${error}, Error logging out`);

      }
    }
  })
}

export { usePostInfo, useGetInfo, LoginUser, LogoutUser }