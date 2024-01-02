import { API } from "../data/api"
import axios from "axios"
import { useEffect,useCallback,useState } from "react"
import { useParams } from "react-router-dom"
const TenantDetails = () => {
  const {id}= useParams()
  useEffect(()=>{
    const fetchTenant= async()=>{
        try {
            const response = await axios.get(`${API}tenant/${id}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchTenant()
  },[])
  return (
    <div>TenantDetails</div>
  )
}
export default TenantDetails