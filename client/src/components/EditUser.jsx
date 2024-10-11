import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Fetching user details for ID:', id);
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/users/get-single-user/${id}`, {
          withCredentials: true,
        });
        console.log('User details fetched:', res.data);
        setUser(res.data.data); // Access the correct data object
      } catch (error) {
        console.error("Error fetching user details", error);
        setErrorMessage('Failed to fetch user details.');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/users/edit-users/${id}`, user, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/'); // Adjust this based on where you want to navigate after editing
      } else {
        console.error('Error:', res.data.message);
        setErrorMessage('Failed to update user details.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Failed to update user details.');
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleUpdate} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName || ''}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="lasttName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName || ''}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="phoneNumber">Phone No.</label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber || ''}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;


