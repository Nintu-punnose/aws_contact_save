import { useNavigate } from 'react-router-dom';
import Login from './Components/login'
import Navbar from './Components/navbar'
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem("user");
    console.log(user)
    if(user){
      navigate("/view")
    }
  },[navigate])

  return (
    <>
      <Navbar/>
      <Login/>
    </>
  );
}

export default App;
