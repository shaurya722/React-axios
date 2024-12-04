import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
function Login() {


    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')

    const Navigate = useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault();
        
        try {
            const API = 'http://127.0.0.1:8000/api/account/login/'

            // const postData = async () =>{
                const res = await axios.post(API,{
                    username:username,
                    password:password,
                });

                console.log(res.data.data.token);

                console.log(`user:${username
                    } and password: ${password}`);

                const {access ,refresh } = res.data.data.token;
                // setToken(access);
                localStorage.setItem('accessToken',access);
                localStorage.setItem('refreshToken',refresh);

                setMessage('Login success...')
                if(res.status === 200){
                    Navigate('/')
                }

            // }
        } catch (error) {
            console.log('errror:',error);
            setMessage('something went wrong..')
        }
    }


  return (
    <div>
        <h2>JWT Authentication</h2>

        <form>
            <input type="text" placeholder='username..' value={username} name='username' onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder='password..' value={password} name='password' onChange={(e)=>setPassword(e.target.value)}  />

            <button onClick={handleLogin}>Login</button>
        </form>
        {/* <button onClick={fetchProtectedData}>Get Protected Data</button> */}
        
        <p>{message}</p>
    </div>
  )
}

export default Login