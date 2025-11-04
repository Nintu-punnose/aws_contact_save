import React,{useState} from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {

const[name,setname] = useState('')
const[email,setemail] = useState('')
const[password,setpassword] = useState('')
const navigate = useNavigate()
 
function savechange(e){
  e.preventDefault()
 const data = {name:name,email:email,password:password}

 axios.post('/api/create_user', data)
  .then(response => { 
    console.log("User created successfully:", response.data);
    navigate("/")
  })
  .catch(error => {
    console.error("Error occurred:" ,error);
  });

}

  

  return (
   <>
   <Navbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)}  required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)}  required/>
              </div>
              <button type="submit" className="btn btn-primary w-100" onClick={(e)=>savechange(e)}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Register;
