import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset errors before submitting
        setErrors({});

        try {
            const API = 'http://127.0.0.1:8000/api/account/register/';

            const res = await axios.post(API, {
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
            });

            console.log(res.data);

            if (res.status === 200) {
                Navigate('/login');
            }

        } catch (error) {
            console.log(error);
            if (error.response) {
                // Capture and display backend validation errors
                const responseErrors = error.response.data;
                if (responseErrors) {
                    setErrors(responseErrors);
                }
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        }
    };

    return (
        <>
            <div>Register</div>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p style={{ color: 'red' }}>{errors.username[0]}</p>}
                
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}

                {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default Register;
