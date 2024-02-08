import './App.css'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { LoginPage, SignupPage,ActivationPage } from './Routes';
import {ToastContainer, toast} from 'react-toastify'
import { useEffect } from 'react';
import store from './redux/store';
import { loadUser } from './redux/actions/user';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { server } from './server';
import HomePage from './Pages/HomePage';
function App() {
  // useEffect(()=>{
  //   const {data}= axios.get(`${server}/getuser`,{withCredentials:true})
  //   console.log(data)
  // } )
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route  path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
    </Routes>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
/>
    </BrowserRouter>
      </>
  )
}

export default App
