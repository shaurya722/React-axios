import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login1() {


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
<>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
        <div class="mt-2">
          <input type="username" name="username" id="username" autocomplete="username" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"  onChange={(e)=>setUsername(e.target.value)} />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"  onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLogin}>Login</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
    </p>
  </div>
</div>
</>
)
}

export default Login1