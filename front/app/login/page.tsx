"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/login', data, {
        withCredentials: true, // Ensures cookies are sent with the request
      });

      if (!response.data.user) throw new Error('Error while logging in');
      
      setSuccess('Login successful! Redirecting...');
      setUsername('');
      setPassword('');
      setError('');

      // Redirect to profile page after login
      setTimeout(() => {
        router.push('/profile'); // Adjust the path as necessary
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-2 mb-4 text-center rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
