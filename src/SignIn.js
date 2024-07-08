import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const SignIn = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your backend login endpoint
            const response = await axios.post('http://localhost:7000/auth/login', { username, password });

            // Extract the JWT token from the response
            const { token } = response.data;

            // Store the token in the browser's local storage
            localStorage.setItem('token', token);

            console.log('Login successful'); // Handle successful login response

            // Redirect the user to the home page after successful login
            navigate('/');
        } catch (error) {
            setError(error.message); // Handle login error
        }
    };

    return (
        <main className='main-content'>
            
            <section> <br/> <p>Welcome to ENVIROSENSE</p> <p className="text-sm text-center"> Let's make a green impact! </p>
                <div>
                    <form onSubmit={onSubmit}> {/* Add onSubmit handler to the form */}
                        <div className="form-group">
                            <input className="form-control"
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Email address"
                            />

                            <input className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <button className="btn btn-success" type="submit" style={{maxWidth: '50%'}}> {/* Remove onClick handler and use type="submit" */}
                            Log in
                        </button>
                    </form>
                    <p className="text-sm text-center" style={{margin: 10}}>
                        Don't have an account yet?{' '}
                        <NavLink to="/signup">Sign up</NavLink>
                    </p>
                    {error && <p>{error}</p>}
                </div>
            </section>
        </main>
    );
};

export default SignIn;