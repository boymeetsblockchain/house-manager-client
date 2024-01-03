import { useState, useEffect } from "react";
import axios from 'axios';
import { API } from '../data/api';
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Link,useNavigate} from "react-router-dom";
import { useCallback } from "react";
import { formatDate } from "../hooks/dateFormat";

const Tenant = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
 const navigate= useNavigate()
 

  useEffect(() => {
    const getTenants = async () => {
      try {
        const response = await axios.get(`${API}tenant`);
        setTenants(response.data.tenants);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      } finally {
        setLoading(false);
      }
    };

    getTenants();
  }, []);

  const onView = useCallback((id) => {
    navigate(`/tenant/${id}`);
  }, [navigate]);

  return (
    <div className="mx-auto max-w-screen-xl h-full py-4 w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-center my-4 font-bold text-4xl ">
        Welcome , <span className="text-[#567DF4] capitalize">{user.user.username}</span>
      </h1>
      <h2 className="text-left text-2xl font-semibold">Tenant List:</h2>
       <div className="flex justify-end text-center">
       <Link to={'/tenant/add'} 
        className='bg-[#567DF4] py-3 text-white text-sm rounded-md w-1/4 mt-4 hover:bg-[#22215B] transition'>
        Add New Tenant
      </Link>
       </div>
      <br />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th className="px-4 text-left text-sm md:text-lg">No.</th>
              <th className="px-4 text-left text-sm md:text-lg">Name</th>
              <th className="px-4 text-left text-sm md:text-lg">Phone</th>
              <th className="px-4 text-left text-sm md:text-lg">Amount</th>
              <th className="px-4 text-left text-sm md:text-lg">Start Date</th>
              <th className="px-4 text-left text-sm md:text-lg">End Rate</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={tenant._id} className="border-b border-gray-200 cursor-pointer"
              onClick={() => onView(tenant?._id)}>
                <td className="px-4 text-sm md:text-lg text-left">{index + 1}</td>
                <td className="px-4 text-sm md:text-lg text-left">{tenant.name}</td>
                <td className="px-4 text-sm md:text-lg text-left">0{tenant.phonenumber}</td>
                <td className="px-4 text-sm md:text-lg text-left">&#8358;{tenant.amount}</td>
                <td className="px-4 text-sm md:text-lg text-left">{formatDate(tenant.rent.rentstart)}</td>
                <td className="px-4 text-sm md:text-lg text-left">{formatDate(tenant.rent.rentend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tenant;
