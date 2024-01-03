import { API } from "../data/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";

const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const { id } = useParams();

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

  return (
    <div className="mx-auto max-w-screen-xl text-gray-900 h-full w-full px-4 md:px-8 lg:px-12">
    <div className="flex justify-between items-center">
    <div>
     <h1 className="text-left text-3xl font-bold my-10">
       {tenant?.name}
      </h1>
     </div>
      <div className="flex text-center">
       <Link to={`/tenant/update/${id}`} 
        className='bg-[#567DF4] py-3 text-white  px-4 text-sm rounded-md w-full mt-4 hover:bg-[#22215B] transition'>
         Update
      </Link>
       </div>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-200 p-6 md:col-span-2 text-3xl text-left row-span-2 rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Address:</strong> {tenant?.address}
        </div>
        <div className="bg-green-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Amount Paid:</strong> &#8358;{tenant?.amount}
        </div>
        <div className="bg-yellow-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Phone Number:</strong> 0{tenant?.phonenumber}
        </div>
        <div className="bg-pink-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Alt Phone Number:</strong> 0{tenant?.altphone}
        </div>
        <div className="bg-purple-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Occupation:</strong> {tenant?.occupation}
        </div>
        <div className="bg-red-200 p-6 md:col-span-3 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Employment Address:</strong> {tenant?.employadd}
        </div>
        <div className="bg-slate-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Mode of Payment:</strong> {tenant?.paymentmethod}
        </div>
        <div className="bg-yellow-200 p-6 md:col-span-2 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Rent paid on:</strong> {formatDate(tenant?.rent?.rentstart)}
        </div>
        <div className="bg-blue-200 p-6 md:col-span-2 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Rent due on:</strong> {formatDate(tenant?.rent?.rentend)}
        </div>
    
        <div className="bg-slate-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Guarantor Name:</strong> {tenant?.guarantor?.guarantorname}
        </div>
        <div className="bg-green-200 p-6 md:col-span-2 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Guarantor Name:</strong> {tenant?.guarantor?.guarantoraddress}
        </div>
        <div className="bg-purple-200 p-6 text-2xl rounded-md shadow-md hover:scale-75 cursor-pointer transition">
          <strong>Guarantor Number:</strong> 0{tenant?.guarantor?.guarantornumber}
        </div>
        
      </div>
    </div>
  );
};

export default TenantDetails;
