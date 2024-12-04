import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>
    {/* <Movies/> */}
    {/* <Login/> */}

    <Router>
      <Routes>
        <Route path='/' element={<Movies/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
