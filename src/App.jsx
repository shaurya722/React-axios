import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './pages/Movies'
import Login1 from './pages/Login1'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>
    {/* <Movies/> */}
    {/* <Login/> */}

   
      <Routes>
        <Route path='/' element={<Movies/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login1' element={<Login1/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </>
  )
}

export default App
