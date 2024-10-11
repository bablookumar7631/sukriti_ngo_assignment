import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import EditUser from "./components/EditUser";
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<Registration/>} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
