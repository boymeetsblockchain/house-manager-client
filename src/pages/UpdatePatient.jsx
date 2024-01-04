import { useState, useEffect } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import { API } from '../data/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from '../components/Loader';
import { paymentOptions } from "../data/payment";

const UpdateTenant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phonenumber: "",
    amount: "",
    occupation: "",
    altphone: "",
    employadd: "",
    paymentmethod: "",
    guarantorname: "",
    guarantoraddress: "",
    guarantornumber: "",
    rentstart: "",
    rentend: "",
  });

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(`${API}tenant/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTenant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateTenant = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${API}tenant/${id}`, formData);
      toast.success("Tenant updated");
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
  
    // Pad single-digit month and day with a leading zero
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mx-auto max-w-screen-xl h-full py-4 w-full px-4 md:px-8 lg:px-12">
      <div className="flex justify-start items-center ">
        <button onClick={() => navigate(-1)} className="bg-[#567DF4] py-3 my-3 text-white px-4 text-sm rounded-md w-1/4 inline-block hover:bg-[#22215B] transition">
          Go Back
        </button>
      </div>
      <h1 className="text-center font-bold text-3xl mb-4">Update Tenant</h1>
      <form className="flex flex-col space-y-4 justify-center w-full mx-auto" onSubmit={updateTenant}>
        <Input name="name" label="Name" value={formData?.name} onChange={handleChange} />
        <Input name="address" label="Address" value={formData?.address} onChange={handleChange} />
        <Input name="phonenumber" label="Phone Number" type={'number'} value={formData?.phonenumber} onChange={handleChange} />
        <Input name="amount" label="Amount of Rent " value={formData?.amount} onChange={handleChange} />
        <div className="flex justify-between space-x-4">
          <Input name="occupation" label="Occupation" value={formData?.occupation} onChange={handleChange} />
          <Input name="altphone" label="Alternative Phone" value={formData?.altphone} type={'number'} onChange={handleChange} />
          <Input name="employadd" label="Employment Address" value={formData?.employadd} onChange={handleChange} />
        </div>
        <Select
          id="selectInput"
          name={"paymentmethod"}
          value={formData?.paymentmethod}
          onChange={handleChange}
          label="Payment Method"
          options={paymentOptions}
        />
        <br />
        <h2 className="text-center capitalize font-bold text-3xl">Guarantor's Details</h2>
        <Input name="guarantorname" label="Guarantor Name" value={formData?.guarantor?.guarantorname} onChange={handleChange} />
        <Input name="guarantoraddress" label="Guarantor Address" value={formData?.guarantor?.guarantoraddress} onChange={handleChange} />
        <Input name="guarantornumber" label="Guarantor Number" type={"number"} value={formData?.guarantor?.guarantornumber} onChange={handleChange} />
        <br />
        <h2 className="text-center font-bold text-3xl">Rent Details</h2>
        <div className="flex space-y-2 md:space-x-4 md:flex-row flex-col ">
          <Input name="rentstart" label="Rent Start Date" type="date" value={formatDateForInput(formData?.rent?.rentstart)} onChange={handleChange} />
          <Input name="rentend" label="Rent End Date" type="date" value={formatDateForInput(formData?.rent?.rentend)} onChange={handleChange} />
        </div>
        <div className="flex justify-end">
          <button className="bg-[#567DF4] py-3 text-white text-sm rounded-md w-1/4 mt-4 hover:bg-[#22215B] transition">
            {loading ? <Loader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTenant;