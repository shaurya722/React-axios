import React from 'react'

function Navbar() {
  return (
    <nav>
        <ul className='flex justify-center items-center h-[10vh] gap-5'>
            <a href="/"><li>Home</li></a>
            <a href="/login"><li>Login</li></a>
            <a href="/register"><li>Register</li></a>
            <a href="/create"><li>Create A Post</li></a>
        </ul>
    </nav>
  )
}

export default Navbar