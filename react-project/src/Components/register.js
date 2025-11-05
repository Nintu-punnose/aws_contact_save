import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  function savechange(e) {
    e.preventDefault();
    
    if (!name || !email || !password) {
      seterror('All fields are required');
      return;
    }
    
    setloading(true);
    const data = { name: name, email: email, password: password };

    axios.post('/api/create_user', data)  // ✅ FIXED - Added '/api'
      .then(response => {
        console.log("User created successfully:", response.data);
        seterror('');
        navigate("/");
      })
      .catch(error => {
        console.error("Error occurred:", error);
        const errorMessage = error.response?.data?.message || 'Registration failed';
        seterror(errorMessage);
      })
      .finally(() => setloading(false));
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow">
              <h2 className="text-center mb-4">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={savechange}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setname(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)}
                    disabled={loading}
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
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
