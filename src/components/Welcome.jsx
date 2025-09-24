import React, { use, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export function Welcome(props) {
    const [user,setUser] = useState({})
    const { backendUrl } = useContext(AppContext)
    // const {userData} = useContext(AppContext)
    // const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    // console.log(user)
    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/getuser')

            console.log(data)
            if(data.success){
                setUser(data.userData)
                // localStorage.setItem("user", JSON.stringify(data.userData));
                // localStorage.setItem("token", data.token);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getUserData()
    },[token])


    return (
        
        <div className="text-center  text-white mt-20">
            <label htmlFor="file-upload" className='bg-white w-50 h-50 rounded-full border-1 border-gray-400 overflow-hidden'>
            <img src={user.avatar? user.avatar : '/user.png'} alt="preview" className='w-full h-full object-cover' />
          </label>
          <div className="mb-5">
            <h2 className='text-6xl'>Hello {user ? user.name: "Developers"} </h2>
          </div>
            <h1 className='text-3xl'>Welecome to<span className="text-blue-500 cursor-pointer"> Coders.com</span></h1>
            <button className="btn w-100 text-center">Get Started</button>
        </div>

        
    )
}
