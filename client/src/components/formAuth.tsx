import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthProps } from "../pages/auth";
import { LoginUser, usePostInfo } from "../lib/apiRequests";
import { NavLink } from 'react-router-dom';
import { Eye, EyeClosed } from "lucide-react";
import Button from "./ui/button";
import { toast } from "sonner";


interface Form_Data {
  username: string,
  email: string,
  password: string,
  profile?: File
}

const FormAuth: FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { mutateAsync: registerMutate, isSuccess, isPending, error: registerErr } = usePostInfo('/api/v1/user')
  const { mutateAsync: loginMutate, isSuccess: loginSuccess, isPending: loginending, error: loginError } = LoginUser('/api/v1/user/login')


  const [form_Data, setFormData] = useState<Form_Data>({
    username: '',
    email: '',
    password: '',
  });
  const [showing, setShowing] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()


    if (mode === 'login') {
      toast.promise(
        loginMutate({ email: form_Data.email, password: form_Data.password }),
        {
          loading: "Logging...",
          success: "Logged successfully!",
          error: `Login failed. ${loginError}`,
        }
      );

      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } else {
      const data = new FormData();
      data.append('email', form_Data.email);
      data.append('username', form_Data.username);
      data.append('password', form_Data.password);
      if (form_Data.profile) {
        data.append('profile', form_Data.profile);
      }

      toast.promise(
        registerMutate(data),
        {
          loading: "Registering...",
          success: "Registered successfully!",
          error: `Registration failed. ${registerErr}`,
        }
      );

      setFormData({
        username: '',
        email: '',
        password: '',
      });
    }
  }


  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary text-text">
      <fieldset className="w-full max-w-md p-6 bg-bg-primary border border-gray-300 rounded-lg shadow">
        <legend className="text-2xl font-semibold text-primary">
          {mode === 'login' ? "Log In" : "Register"}
        </legend>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
          {mode === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" htmlFor="username">
                Username
              </label>
              <input
                required
                type="text"
                placeholder="Username please"
                name="username"
                value={form_Data.username}
                onChange={handleChange}
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              disabled={mode === 'login' ? loginending : isPending}
              required
              type="email"
              name="email"
              placeholder="Email please"
              value={form_Data.email}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>

            <div className="relative">
              <input
                disabled={mode === 'login' ? loginending : isPending}
                required
                type={showing ? "text" : "password"}
                name="password"
                placeholder="Password please"
                value={form_Data.password}
                onChange={handleChange}
                className="border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <Button
                type="button"
                onClick={() => setShowing((prev) => !prev)}
                variant="ghost"
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showing ? <Eye /> : <EyeClosed />}
                <span className="sr-only">
                  {showing ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" htmlFor="profile">
                Profile Image (optional)
              </label>
              <input
                type="file"
                name="profile"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFormData(prev => ({ ...prev, profile: file }));
                }}
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}


          <input
            disabled={mode === 'login' ? loginending : isPending}
            type="submit"
            value={mode === 'login' ? 'Log In' : 'Register'}
            className="mt-4 bg-p border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary primary text-white px-4 py-2 rounded hover:bg-primary/90 transition cursor-pointer"
          />
        </form>

        <NavLink
          to={`/${mode === 'register' ? 'login' : 'register'}`}
          className="mt-3 block text-sm text-secondary hover:text-secondary/80 text-center" onClick={() => setFormData({
            username: '',
            email: '',
            password: '',
            profile: undefined
          })}
        >
          {mode === 'register' ? 'Log In' : 'Register'}
        </NavLink>
      </fieldset>
    </main>

  )
}

export default FormAuth