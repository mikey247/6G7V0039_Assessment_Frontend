import { useState } from 'react';
import { useDispatch } from "react-redux";
import "./Login.css"

import { authActions } from "../redux/authRedux";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Login successful:', data);
                if (!data) {
                    setErrors("Wrong username or password");
                } else {
                    // Hit another endpoint to get user details
                    fetch(`${import.meta.env.VITE_API_URL}/auth/creds`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${data.access_token}`
                        }
                    })
                        .then(response => response.json())
                        .then(userData => {
                            // Combine token and user details
                            const user = {
                                token: data.access_token,
                                user: {...userData,password:null}
                            };
                            console.log('User:', user);
                            // Dispatch to Redux manager
                            dispatch(authActions.login({ ...user }));
                        })
                        .catch(error => {
                            console.error('Failed to get user details:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errors && <div className="error">{errors}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


export default Login;
