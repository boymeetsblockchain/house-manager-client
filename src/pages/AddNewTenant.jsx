import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import {API} from '../data/api'
import axios from 'axios'
import{toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import {Loader} from '../components/Loader'
import { storage } from "../firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { paymentOptions } from "../data/payment";
const AddNewTenant = () => {
  const navigate = useNavigate()
 
  const [cautionFee,setCautionFee] = useState("false")
  const [loading,setLoading]= useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const uploadImageToFirebaseStorage = async () => {

    try {
      if (!selectedFile) {
        console.error("No file selected for upload");
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadURL);
      console.log(downloadURL)
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  };
 
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phonenumber: "",
    amount: "",
    occupation: "",
    altphone: "",
    employadd: "",
    paymentmethod: "",
    duration:"",
    guarantorname: "",
    guarantoraddress: "",
    guarantornumber: "",
    rentstart: "",
    rentend: "",
    apartmentLocation:"",
    source:"",
  });

  const handleCautionFeeChange = (e) => {
    setCautionFee(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addNewTenant= async(e)=>{
    e.preventDefault()
    const newFormData= {cautionFee, imageUrl, ...formData}
    try {
      setLoading(true)
        const response = await axios.post(`${API}tenant/add-tenant`,newFormData)
       
          toast.success("Tenant added")
          navigate('/tenant')
          setFormData({})
       
        
    } catch (error) {
         console.log(error)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="mx-auto max-w-screen-xl h-full py-4 w-full px-4 md:px-8 lg:px-12">
      <div className="flex justify-start items-center ">
      <button onClick={()=>navigate(-1)} className="bg-[#567DF4] py-3 my-3 text-white px-4 text-sm text-nowrap rounded-md w-1/4 inline-block hover:bg-[#22215B] transition">
         Go Back
        </button>
      </div>
      <h1 className="text-center font-bold text-3xl mb-4">Add a New Tenant</h1>
      <div className="flex space-x-4 mb-8">
      <Input type={'file'} onChange={handleFileChange}/>
          <button onClick={uploadImageToFirebaseStorage} className="text-bold  bg-green-500  text-white  rounded-md px-3 py-1.5">Upload Image</button>
      </div>
      <form className="flex flex-col space-y-4 justify-center w-full mx-auto" onSubmit={addNewTenant}>
        <Input name="name" label="Name" value={formData.name} onChange={handleChange} />
        <Input name="address" label="Address" value={formData.address} onChange={handleChange} />
        <Input name="phonenumber" label="Phone Number" type={'number'} value={formData.phonenumber} onChange={handleChange} />
        <Input name="amount" label="Amount of Rent " value={formData.amount} onChange={handleChange} />
        <Input name="source" label="Source of Tenant" value={formData.source} onChange={handleChange} />
          <Input name="apartmentLocation" label="Apartment Location" value={formData.apartmentLocation} onChange={handleChange} />
          <div className="flex justify-between  md:flex-row flex-col space-y-4 md:space-x-4">
          <Input name="occupation" label="Occupation" value={formData.occupation} onChange={handleChange} />
        <Input name="altphone" label="Alternative Phone" value={formData.altphone} type={'number'}  onChange={handleChange} />
        <Input name="employadd" label="Employment Address" value={formData.employadd} onChange={handleChange} />
          <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="cautionFee"
          name="cautionFee"
          checked={formData.cautionFee}
          onChange={handleCautionFeeChange}
        />
        <label htmlFor="cautionFee">Caution Fee</label>
      </div>

          </div>
          <Select
  id="selectInput"
  name={"paymentmethod"}
  value={formData.paymentmethod}
  onChange={handleChange}
  label="Payment Method"
  options={paymentOptions}
/>
        <br />
          <h2 className="text-center capitalize font-bold text-3xl">Guarantor's Details</h2>
          <Input name="guarantorname" label="Guarantor Name" value={formData.guarantorname} onChange={handleChange} />
        <Input name="guarantoraddress" label="Guarantor Address" value={formData.guarantoraddress} onChange={handleChange} />
        <Input name="guarantornumber" label="Guarantor Number"  type={"number"} value={formData.guarantornumber} onChange={handleChange} />
         <br />
        
         <h2 className="text-center font-bold text-3xl">Rent Details</h2>
         <div className="flex space-y-2 md:space-x-4 md:flex-row flex-col ">
    
          <Input name="rentstart" label="Rent Start Date" type="date" value={formData.rentstart} onChange={handleChange} />
        <Input name="rentend" label="Rent End Date" type="date" value={formData.rentend} onChange={handleChange} /> 
        <Input name="duration" label="Rent Duration" type="number" value={formData.duration} onChange={handleChange} /> 
          </div>
          {imageUrl && (
        <div>
          <p>Receipt Preview:</p>
          <img src={imageUrl} alt="Uploaded"/>
        </div>
      )}

       <div className="flex justify-end">
       <button className="bg-[#567DF4] py-3 text-white text-sm rounded-md w-1/4 mt-4 hover:bg-[#22215B] transition">
               {
                loading ? <Loader/> : "Add"
               }
        </button>
       </div>
             
      </form>
    

       
    </div>
  );
};

export default AddNewTenant;
