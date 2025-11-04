import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'; 
import { RouterProvider } from 'react-router-dom'; 
import router from './router'; 
import store from './Store/store'; 
import AutoLogin from "./Components/AutoLogin"; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  
      <AutoLogin>
        <RouterProvider router={router}/>
      </AutoLogin>
    </Provider>
  </React.StrictMode>
);
