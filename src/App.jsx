import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { ResetPass } from './pages/ResetPass'
import { About } from './pages/About'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Register } from './pages/Register'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { VerifyOtp } from './pages/verifyOtp'
import { Delete } from './components/Delete'
import { ImgUpload } from './components/ImgUpload'

function App() {
  // const {isLoggedIn} = useContext(AppContext)
  const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");


  return (
   <div className="main">
    <ToastContainer>
    </ToastContainer>
      <Routes>
        <Route path='/' element ={isLoggedIn ? <Home/>: <Navigate to="/login"/>}/>
        <Route path='/register' element ={<Register/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/verifyOtp' element = {<VerifyOtp/>}/>
        <Route path='/resetpass' element ={<ResetPass/>}/>
        <Route path='/delete' element ={isLoggedIn ? <Delete/>: <Navigate to="/login"/> }/>
        <Route path='/about' element ={isLoggedIn ? <About/>: <Navigate to="/login"/> }/>
        <Route path='/imgUpload' element ={isLoggedIn ? <ImgUpload/>: <Navigate to="/login"/> }/>
        
      </Routes>
   </div>
  )
}

export default App
