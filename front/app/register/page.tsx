"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e:any) => {
    e.preventDefault();

    const registerData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/register', { // Update this URL to match your backend server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
      setError(''); // Reset error on success

      // Optionally redirect to the login page
      setTimeout(() => {
        router.push('/auth/login'); // Adjust the path as necessary
      }, 2000);
    } catch (err) {
      setError(err.message); // Set the error message to a string
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 text-center rounded">
            {error} {/* Make sure this is a string */}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-2 mb-4 text-center rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
