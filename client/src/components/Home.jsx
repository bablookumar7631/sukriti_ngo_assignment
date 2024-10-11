import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/users/all-users", {
          withCredentials: true
        });
        setUsers(res.data.users); // Assuming `users` array in response data
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle Delete user
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/users/delete-users/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        // Update UI after deletion
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error('Error:', res.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  // Handle Edit user
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };


  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-10 relative">
      <h1 className="text-2xl font-bold mb-8 text-center">All Users</h1>
      <button className='bg-slate-400 px-5 py-2 rounded absolute end-10 top-0' onClick={logoutHandler}>Logout</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone No.</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(user._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

