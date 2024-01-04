import { useState, useEffect } from "react";
import axios from 'axios';
import { API } from '../data/api';
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";
import { Loader } from "../components/Loader";

const Tenant = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const navigate = useNavigate();

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

  const onView = (id) => {
    navigate(`/tenant/${id}`);
  };

  return (
    <div className="mx-auto max-w-screen-xl h-full py-4 w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-center my-4 font-bold text-4xl">
        Welcome, <span className="text-[#567DF4] capitalize">{user?.user?.username}</span>
      </h1>
      <h2 className="text-left text-2xl font-semibold">Tenant List:</h2>
      <div className="flex justify-end text-center">
        <Link
          to="/tenant/add"
          className="bg-[#567DF4] py-3 text-white  md:text-nowrap text-xs md:text-sm rounded-md w-1/4 mt-4 hover:bg-[#22215B] transition"
        >
          Add New Tenant
        </Link>
       
      </div>
      <br />

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader color="#567df4" size={100} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm md:text-md text-left">No.</th>
                <th className="px-4 py-2 text-sm md:text-md text-left">Name</th>
                <th className="px-4 py-2 text-sm md:text-md text-left">Phone</th>
                <th className="px-4 py-2 text-sm md:text-md text-left">Amount</th>
                <th className="px-4 py-2 text-sm md:text-md text-left">Start Date</th>
                <th className="px-4 py-2 text-sm md:text-md text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, index) => (
                <tr
                  key={tenant._id}
                  className="border-b border-gray-200 cursor-pointer"
                  onClick={() => onView(tenant?._id)}
                >
                  <td className="px-4 py-2 text-sm md:text-md text-left">{index + 1}</td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">{tenant.name}</td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">0{tenant.phonenumber}</td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">&#8358;{tenant.amount}</td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">{formatDate(tenant.rent.rentstart)}</td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">{formatDate(tenant.rent.rentend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tenant;
