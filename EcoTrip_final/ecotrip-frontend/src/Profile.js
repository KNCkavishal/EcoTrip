import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found, please login.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8081/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        setMessage("Failed to fetch profile: " + error.response.status);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;
