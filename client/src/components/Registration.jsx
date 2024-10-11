import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Registration = () => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:8000/api/v1/users/register", formData, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          });
          if (res.status === 201) {
            navigate("/sign-in");
          }
        } catch (error) {
          console.error("There was an error signing up!", error);
        }
      };

      useEffect(() => {
        if(user){
          navigate('/');
        }
      },[])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-4/12">
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to={"/sign-in"} className="text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration

