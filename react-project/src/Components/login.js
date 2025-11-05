import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState('');  // ✅ Changed from undefined to ''
  const [password, setpassword] = useState('');  // ✅ Changed from undefined to ''
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function userlogin(e) {
    e.preventDefault();
    
    // Trim whitespace
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    // Validation checks
    if (!trimmedEmail || !trimmedPassword) {
      seterror('Email and password are required');
      return;
    }
    
    if (!isValidEmail(trimmedEmail)) {
      seterror('Please enter a valid email address');
      return;
    }
    
    if (trimmedPassword.length < 6) {
      seterror('Password must be at least 6 characters long');
      return;
    }
    
    setloading(true);
    const data = { 
      email: trimmedEmail, 
      password: trimmedPassword 
    };
    
    console.log(data);
    
    axios.post('/api/user_login', data)
      .then((response) => {
        const user = {
          id: response.data.userId,
          email: response.data.email,
          token: response.data.token
        };
        seterror('');
        dispatch(setUser(user));
        alert('Login successful!');
        navigate("/view");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Invalid email or password';
        seterror(errorMessage);
        console.log("Error:", error);
      })
      .finally(() => setloading(false));
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={userlogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setemail(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setpassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
