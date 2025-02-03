import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../data/api";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";
import { Loader } from "../components/Loader";

const Tenant = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]); // Stores filtered tenants
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getTenants = async () => {
      try {
        const response = await axios.get(`${API}tenant`);
        setTenants(response.data.tenants);
        setFilteredTenants(response.data.tenants); // Initialize filtered list
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

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredTenants(tenants);
    } else {
      setFilteredTenants(
        tenants.filter((tenant) => tenant.name.toLowerCase().includes(query))
      );
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl h-full py-4 w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-center my-4 font-bold text-4xl">
        Welcome,{" "}
        <span className="text-[#567DF4] capitalize">
          {user?.user?.username}
        </span>
      </h1>
      <h2 className="text-left text-2xl font-semibold">Tenant List:</h2>

      {/* Search and Add Tenant Button */}
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-2 w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#567DF4]"
        />
        <Link
          to="/tenant/add"
          className="bg-[#567DF4] py-3 text-white text-center  text-xs md:text-sm rounded-md w-1/4 md:w-1/5 hover:bg-[#22215B] transition"
        >
          Add New Tenant
        </Link>
      </div>

      {/* Loader */}
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
                <th className="px-4 py-2 text-sm md:text-md text-left">
                  Phone
                </th>
                <th className="px-4 py-2 text-sm md:text-md text-left">
                  Amount
                </th>
                <th className="px-4 py-2 text-sm md:text-md text-left">
                  Start Date
                </th>
                <th className="px-4 py-2 text-sm md:text-md text-left">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <tr
                  key={tenant._id}
                  className="border-b border-gray-200 cursor-pointer"
                  onClick={() => onView(tenant?._id)}
                >
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    {tenant.name}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    0{tenant.phonenumber}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    &#8358;{tenant.amount}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    {formatDate(tenant.rent.rentstart)}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-md text-left">
                    {formatDate(tenant.rent.rentend)}
                  </td>
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
