import React, { useState } from "react";
import { RegisterUser } from "../utils/api";
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
  const [data, setData] = useState<{ email: string; password: string; username: string; image: string | File }>({ email: '', password: '', username: '', image: '' });
  const navigate = useNavigate()
  const { mutate, isPending, isError, error } = RegisterUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageString: string | undefined = typeof data.image === 'string' ? data.image : undefined;

    if (data.image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        imageString = reader.result as string;
        const formData = {
          email: data.email,
          password: data.password,
          username: data.username,
          image: imageString,
        };
        mutate(formData);
      };
      reader.readAsDataURL(data.image);
    } else {
      const formData = {
        email: data.email,
        password: data.password,
        username: data.username,
        image: imageString,
      };
      mutate(formData);
    }
    navigate('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({ ...data, image: e.target.files[0] });
    }
  };


  return (
    <div>
      <fieldset className="border-dotted border-4 border-light-blue-500 rounded-lg">
        <legend>
          <h1>Register</h1>
        </legend>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-1 p-1 text-black rounded-lg border-gray-600"
        >
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />

          <label htmlFor="image">Profile Image</label>
          <input
            id="image"
            type="file"
            accept="image/*" // Restrict file types to images
            onChange={handleFileChange} // Handle file selection
          />

          <button className="cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? `Registering ...` : 'Register'}
          </button>
          {isError && <p>Error: {error?.message || 'An error occurred'}</p>}
        </form>
      </fieldset>
    </div>
  );
};

export default Register;