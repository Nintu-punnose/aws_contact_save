import React,{useState} from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setUser } from "../Store/authSlice";
import {useNavigate} from "react-router-dom";


const Login = () => {

  const [email,setemail] = useState()
  const [password,setpassword] = useState()
  const[error,seterror] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch()


  function userlogin(e){

    e.preventDefault();

    const data ={email,password}

    console.log(data)

    axios.post('/api/user_login', data).then((response)=>{
      var user = {
        id:response.data.userId,
        email:response.data.email,
        token:response.data.token
      } 
      seterror('')
      dispatch(setUser(user));
      navigate("/view");
    })
    .catch((error)=>{
      const a ="invalid username or password";
      seterror(a)
      console.log("error")

    });
    
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            <form>
              <span className="text-danger m-1">{error}</span>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
              </div>
              <button type="submit" className="btn btn-primary w-100" onClick={(e)=>userlogin(e)}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
