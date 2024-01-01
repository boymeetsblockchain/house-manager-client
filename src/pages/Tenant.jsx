import { useState, useEffect } from "react";
import { API } from '../data/api';
import axios from 'axios';

const Tenant = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const getTenants = async () => {
      try {
        const response = await axios.get(`${API}tenant`);
        setTenants(response.data.tenants);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    getTenants();
  }, []);

  return (
    <div>
      <h1>Tenant List</h1>
      {tenants.map(tenant => (
        <div key={tenant._id}>
          <h2>{tenant.name}</h2>
          <p>Address: {tenant.address}</p>
          <p>{tenant._id}</p>
          {/* Add other tenant details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Tenant;
