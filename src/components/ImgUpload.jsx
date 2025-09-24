import React, { useState, useContext } from 'react'
import { Navbar } from './Navbar'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import imageCompression from "browser-image-compression";
import { useNavigate } from 'react-router-dom'

export function ImgUpload() {
  const { backendUrl } = useContext(AppContext)
  const [userImg, setUserImg] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(backendUrl + "/api/auth/uploadImg", { image: userImg })
      console.log(data)
      if(data.success){
          toast.success(data.message||"Uploaded Successfully")
          // localStorage.setItem("user", JSON.stringify(data.userData));
          // console.log(data.userData);
          

          // localStorage.setItem()
          navigate('/')
      }else{
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message || "Upload failed")
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
     const options = {
    maxSizeMB: 1,          
    maxWidthOrHeight: 800, 
  };
    if (!file) return
    const compressedFile = await imageCompression(file, options);
    const base64 = await convertToBase64(compressedFile)
    setUserImg(base64)
    console.log("Base64:", base64) 
  }

  return (
    <>
      <Navbar />
      <div className="text-center text-white  mt-20">
        <form onSubmit={submitHandler} className="flex flex-col gap-10">
          <label htmlFor="file-upload" className='bg-white w-50 h-50 rounded-full border-1 border-gray-400 overflow-hidden'>
            <img src={userImg ? userImg: user.avatar}  alt="preview" className='w-full h-full object-cover' />
          </label>
         
          <input 
            type="file"
            name="myFile"
            id="file-upload"
            accept='.jpeg, .png, .jpg'
            className=''
            onChange={handleFileUpload}
          />
          <button type="submit" className="btn2">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
}
