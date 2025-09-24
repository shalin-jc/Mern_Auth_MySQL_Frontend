import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext()
 
export const AppContextProvider = ({children})=>{

    axios.defaults.withCredentials = true
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async()=>{
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success === true){
                setIsLoggedIn(true)
                const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
                setIsLoggedIn(loggedIn);
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
        
    }

    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/getuser')

            console.log(data)
            if(data.success){
                setUserData(data.userData)
                localStorage.setItem("user", JSON.stringify(data.userData));
                localStorage.setItem("token", data.token);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getAuthState()
    },[])

    const value ={
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}