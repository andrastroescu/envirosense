import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './App.css'

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make HTTP POST request to your backend signup endpoint
            const response = await axios.post('https://orca-app-tue3f.ondigitalocean.app/auth/signup', { email, password, firstName, lastName });

            // Handle successful signup
            console.log('User signed up successfully:', response.data);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            // Handle signup error
            console.error('Error signing up:', error.response.data);
            setError(error.response.data.error); // Set error message
        }
    };

    return (
        <main className='main-content'>
            <section> <br/> <p>Join our waste-wise community</p> <br/>
                <div>
                    <div>
                        <form>
                            <div className="form-group">
                                <input className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                <input className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="First name"
                                />
                                <input className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Last name"
                                />
                            </div>
                            <button className="btn btn-success" style={{maxWidth: '50%'}} type="submit" onClick={onSubmit}>
                                Sign up
                            </button>
                            {error && <p>{error}</p>} {/* Display error message */}
                        </form>
                        <p className="text-sm text-center" style={{margin: 10}}>
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignUp;