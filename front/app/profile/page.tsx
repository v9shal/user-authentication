"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/me', {
          withCredentials: true, // Ensures cookies are sent with request
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Unable to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
    </div>
  );
};

export default Profile;
