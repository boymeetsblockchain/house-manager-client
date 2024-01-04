import {createContext,useState,useEffect} from 'react'
import axios  from 'axios'
import { API } from '../data/api'

const UserContext = createContext()



export const UserContextProvider=({children})=>{

    useEffect(()=>{
     const finduser =async()=>{
        const response= await axios.get(`${API}users/profile`,{withCredentials:true})
     setUser(response.data)
     }
 
     finduser()
    },[])
    const [user,setUser]= useState({})

    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}


export default UserContext