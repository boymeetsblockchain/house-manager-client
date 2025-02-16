import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../data/api";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";
import { Loader } from "../components/Loader";

const Tenant = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getTenants = async () => {
      try {
        const response = await axios.get(`${API}tenant`);
        setTenants(response.data.tenants);
        setFilteredTenants(response.data.tenants);
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

  const tenantHasMoved = async (event, id) => {
    event.stopPropagation();

    const confirmAction = window.confirm(
      "Are you sure you want to mark this tenant as moved out?"
    );

    if (confirmAction) {
      try {
        const response = await axios.put(`${API}tenant/toggle/${id}`);

        if (response.status === 200) {
          alert("Tenant status updated successfully!");
          window.location.reload();
        } else {
          alert("Failed to update tenant status. Please try again.");
        }
      } catch (error) {
        console.error("Error updating tenant status:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl h-full py-6 w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-center my-4 font-bold text-4xl">
        Welcome,{" "}
        <span className="text-[#567DF4] capitalize">
          {user?.user?.username}
        </span>
      </h1>

      <h2 className="text-left text-2xl font-semibold mb-4">Tenant List</h2>

      {/* Search and Add Tenant Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-2 w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#567DF4]"
        />
        <Link
          to="/tenant/add"
          className="bg-[#567DF4] py-3 px-4 text-white text-center text-xs md:text-sm rounded-md hover:bg-[#22215B] transition"
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
          <table className="min-w-full table-auto border border-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  No.
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  Name
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  Phone
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  Amount
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  Start Date
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  End Date
                </th>
                <th className="px-4 py-3 text-sm md:text-base text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <tr
                  key={tenant._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => onView(tenant?._id)}
                >
                  <td className="px-4 py-3 text-sm md:text-base">
                    {index + 1}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm md:text-base ${
                      tenant.hasExpired && "line-through text-gray-500"
                    }`}
                  >
                    {tenant.name}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    0{tenant.phonenumber}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    &#8358;{tenant.amount}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    {formatDate(tenant.rent.rentstart)}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm md:text-base ${
                      new Date(tenant.rent.rentend) < new Date()
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {formatDate(tenant.rent.rentend)}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    {tenant.hasExpired ? (
                      <span className="text-gray-400 italic"> Moved Out</span>
                    ) : (
                      <button
                        className="bg-stone-500 text-xs rounded-md text-white px-3 py-2 border-pink-700 hover:bg-red-700 transition"
                        onClick={(event) => tenantHasMoved(event, tenant._id)}
                      >
                        Click, if Tenant Moved out
                      </button>
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm md:text-base ${
                      new Date(tenant.rent.rentend) < new Date()
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {new Date(tenant.rent.rentend) < new Date() &&
                      "Rent has Expired"}
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
