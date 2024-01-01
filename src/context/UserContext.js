import {createContext,useState,useEffect} from 'react'
import axios  from 'axios'


const UserContext = createContext()



export const UserContextProvider=({children})=>{

    useEffect(()=>{
     const finduser =async()=>{
        const response= await axios.get("http://localhost:5000/api/users/profile",{withCredentials:true})
     setUser(response.data)
     }
 
     finduser()
    },[])
    const [user,setUser]= useState({})
    console.log(user)

    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}


export default UserContext