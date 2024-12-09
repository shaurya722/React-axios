import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () =>{
      localStorage.removeItem("accessToken");
      alert("You have been logged out successfully.");
      navigate("/login");  
    };
  
  
  return (
    <nav>
        <ul className='flex justify-center items-center h-[10vh] gap-5'>
            <a href="/"><li>Home</li></a>
            <a href="/login"><li>Login</li></a>
            <a href="/login1"><li>Login1</li></a>
            <a href="/register"><li>Register</li></a>
            <a href="/create"><li>Create A Post</li></a>
            <button onClick={handleLogout}>Logout</button>
        </ul>
    </nav>
  )
}

export default Navbar