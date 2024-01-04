import { API } from "../data/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";
import { useNavigate } from "react-router-dom";

const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const [countdownTime, setCountdownTime] = useState("N/A");
  const { id } = useParams();
   const navigate = useNavigate()
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(`${API}tenant/${id}`);
        setTenant(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTenant();
  }, [id]);

  const deleteTenant = async()=>{
    try {
      const response = await axios.delete(`${API}tenant/${id}`);
      if(response.status===200){
        navigate(-1)
      }
    } catch (error) {
       console.log(error)
    }
  }
 
  useEffect(() => {
    const updateCountdownTime = () => {
      if (!tenant || !tenant.rent || !tenant.rent.rentend) {
        setCountdownTime("N/A");
        return;
      }

      const rentDueDate = new Date(tenant.rent.rentend).getTime();
      const currentDate = new Date().getTime();
      const timeDifference = rentDueDate - currentDate;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setCountdownTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateCountdownTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [tenant]);

  return (
    <div className="mx-auto max-w-screen-xl text-gray-900 h-full w-full px-4 md:px-8 lg:px-12">
        <div className="flex justify-start items-center mt-4  ">
      <button onClick={()=>navigate(-1)} className="bg-slate-400 py-3 text-white px-4 text-sm rounded-md w-1/8 inline-block hover:bg-[#22215B] transition">
         Go Back
        </button>
      </div>
    <div className="flex justify-between md:flex-row flex-col  items-center">
    <div>
     <h1 className="md:text-left  text-3xl font-bold mb-4 md:mb-0 md:my-10">
       {tenant?.name}
      </h1>
     </div>
     <div className="flex justify-between items-center  mb-4 md:mb-0 text-center space-x-4">
  <Link to={`/tenant/update/${id}`} className="bg-[#567DF4] py-3 text-white px-4 text-sm rounded-md w-full hover:bg-[#22215B] transition">
    Update
  </Link>
  <button onClick={deleteTenant} className="bg-red-500 py-3 px-4 text-white text-sm rounded-md w-full hover:bg-red-200">
    Delete
  </button>
  <div className="timer bg-green-500 py-3 text-left px-3  text-nowrap rounded-md text-sm text-white w-full">
    {countdownTime === 0 ? "Rent Has Expired" : countdownTime}
  </div>
</div>

     
    </div>
      <div className="md:grid grid-cols-2  flex flex-col md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-200 p-6  sm: col-span-1 md:col-span-2 text-sm  md:text-3xl text-left row-span-2 rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Address:</strong> {tenant?.address}
        </div>
        <div className="bg-green-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Amount Paid:</strong> &#8358;{tenant?.amount}
        </div>
        <div className="bg-yellow-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Phone Number:</strong> 0{tenant?.phonenumber}
        </div>
        <div className="bg-pink-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Alt Phone Number:</strong> 0{tenant?.altphone}
        </div>
        <div className="bg-purple-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Occupation:</strong> {tenant?.occupation}
        </div>
        <div className="bg-red-200 p-6 md:col-span-2  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Employment Address:</strong> {tenant?.employadd}
        </div>
        <div className="bg-slate-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Mode of Payment:</strong> {tenant?.paymentmethod}
        </div>
        <div className="bg-yellow-200 p-6 md:col-span-2  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Rent paid on:</strong> {formatDate(tenant?.rent?.rentstart)}
        </div>
        <div className="bg-blue-200 p-6 md:col-span-2  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Rent due on:</strong> {formatDate(tenant?.rent?.rentend)}
        </div>
    
        <div className="bg-slate-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Name:</strong> {tenant?.guarantor?.guarantorname}
        </div>
        <div className="bg-green-200 p-6 md:col-span-2  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Address:</strong> {tenant?.guarantor?.guarantoraddress}
        </div>
        <div className="bg-purple-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Number:</strong> 0{tenant?.guarantor?.guarantornumber}
        </div>
        
      </div>
    </div>
  );
};

export default TenantDetails;
