import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Store/authSlice";
import axios from "axios";


const Navbar = () => {
  var user = useSelector(store=>store.auth.user);
  const dispatch = useDispatch ();
  const navigate  = useNavigate();


  function user_logout(){
    if(user){
        axios.post('/api/logout',{},{
            headers:{'Authorization':`Bearer ${user.token}`}
        });
        dispatch(removeUser());
        navigate('/');
    }
}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <h3 className="navbar-brand">MedStore</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user?
            <>
              <li className="nav-item">
                <NavLink to={"/addPage"} className="nav-link"> Add Data</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/view"} className="nav-link"> View Data</NavLink>
              </li>
              <li className="nav-item">
                 <span className="nav-link">{user.email}</span>
                 <span className="nav-link" onClick={user_logout}>Logout</span>
              </li>
            </>
            :
              <>
                <li className="nav-item">
                  <NavLink to={"/"} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">Register</NavLink>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
