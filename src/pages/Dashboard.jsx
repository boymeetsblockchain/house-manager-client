import { IoWalletSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Input from '../components/Input'
const Dashboard = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="mx-auto max-w-screen-xl h-full w-full px-4 md:px-8 lg:px-12">
        <h1 className="text-center text-3xl my-4">Dashboard</h1>
        <p>
          
        </p>
    </div>
  )
}
export default Dashboard