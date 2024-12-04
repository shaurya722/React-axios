import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './pages/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <App />
  </StrictMode>,
)


