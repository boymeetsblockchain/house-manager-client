import { IoWalletSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Input from '../components/Input'
import { Link } from "react-router-dom";
const Dashboard = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="mx-auto max-w-screen-xl h-full w-full px-4 md:px-8 lg:px-12">
       <div className="flex justify-between items-center">
       <h1 className="text-center text-3xl my-4">
           {user?.username}
          </h1>
            <div className="buttons flex justify-between   text-center items-center space-x-2 ">
            <Link to={'/tenant/add'} className="bg-[#567DF4] py-3 text-white px-4 text-sm rounded-md w-full hover:bg-[#22215B] transition" >
           Add  Tenant
          </Link>
          <Link to={'/tenant'} className="bg-red-500 py-3 text-white px-4 text-nowrap text-sm rounded-md w-full hover:bg-red-900 transition">
           View Tenants
          </Link>
            </div>
       </div>
    </div>
  )
}
export default Dashboard