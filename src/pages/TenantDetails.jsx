import { API } from "../data/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../hooks/dateFormat";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Input from "../components/Input";
const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const [countdownTime, setCountdownTime] = useState("N/A");
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRentEnd, setNewRentEnd] = useState("");
  const [newRentStart, setNewRentStart] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

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
      toast.success("image added successfully");
      console.log(downloadURL);
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  };

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(`${API}tenant/${id}`);
        setTenant(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTenant();
  }, [id]);

  const deleteTenant = async () => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this tenant?"
      );
      if (userConfirmed) {
        const response = await axios.delete(`${API}tenant/${id}`);

        if (response.status === 200) {
          navigate(-1);
        }
      } else {
        console.log("Deletion canceled by the user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateCountdownTime = () => {
      if (!tenant || !tenant.rent || !tenant.rent.rentend) {
        setCountdownTime("N/A");
        return;
      }

      const rentDueDate = new Date(tenant.rent.rentend).getTime();
      const currentDate = new Date().getTime();

      if (currentDate >= rentDueDate) {
        // Rent has expired
        setCountdownTime("Rent Expired");
      } else {
        const timeDifference = rentDueDate - currentDate;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdownTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    // Usage example
    updateCountdownTime();

    const intervalId = setInterval(updateCountdownTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [tenant]);
  const renewRent = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(`${API}tenant/${id}`, {
        comment: newComment,

        receiptUrl: imageUrl,

        amount: newAmount,
      });
      toast.success("Tenant updated");
      navigate("/tenant");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl text-gray-900 h-full w-full px-4 py-12 md:px-8 lg:px-12">
      <div className="flex justify-start items-center mt-4  ">
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-400 py-3 text-white px-4 text-sm rounded-md w-1/8 inline-block hover:bg-[#22215B] transition"
        >
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
          <Link
            to={`/tenant/update/${id}`}
            className="bg-[#567DF4] py-3 text-white px-4 text-sm rounded-md w-full hover:bg-[#22215B] transition"
          >
            Update
          </Link>
          <button
            onClick={deleteTenant}
            className="bg-red-500 py-3 px-4 text-white text-sm rounded-md w-full hover:bg-red-200"
          >
            Delete
          </button>
          <div className="timer bg-green-500 py-3 text-left px-3  text-nowrap rounded-md text-sm text-white w-full">
            {countdownTime === 0 ? "Rent Has Expired" : countdownTime}
          </div>

          <button
            className="bg-pink-500 py-3 px-2 rounded-md text-xs text-nowrap text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Renew Rent
          </button>
        </div>
      </div>
      <div className="md:grid grid-cols-2  flex flex-col md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-200 p-6  sm: col-span-1 md:col-span-2 text-sm  md:text-3xl text-left row-span-2 rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Address:</strong> {tenant?.address}
          {tenant?.imag}
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
        <div className="bg-pink-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Alt Phone Number:</strong> 0{tenant?.altphonetwo}
        </div>
        <div className="bg-orange-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Apartment Location:</strong> {tenant?.apartmentLocation}
        </div>
        <div className="bg-red-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Source of Tenant:</strong> {tenant?.source}
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
        <div className="bg-blue-400 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Payment Type:</strong> {tenant?.paymenttype}
        </div>
        <div className="bg-yellow-200 p-6 md:col-span-2 text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Rent paid on:</strong> {formatDate(tenant?.rent?.rentstart)}
        </div>
        <div className="bg-blue-200 p-6 md:col-span-4  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Rent due on:</strong> {formatDate(tenant?.rent?.rentend)}
        </div>
        <div className="bg-violet-300 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Rent Duration :</strong> {tenant?.duration}
        </div>

        <div className="bg-slate-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Name:</strong> {tenant?.guarantor?.guarantorname}
        </div>
        <div className="bg-green-200 p-6 md:col-span-2  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Address:</strong>{" "}
          {tenant?.guarantor?.guarantoraddress}
        </div>
        <div className="bg-purple-200 p-6  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Guarantor Number:</strong> 0
          {tenant?.guarantor?.guarantornumber}
        </div>
        <div className="bg-pink-300 p-6 col-span-3  text-sm md:text-2xl rounded-md shadow-md hover:scale-90 cursor-pointer transition">
          <strong>Comment:</strong> {tenant?.comment}
        </div>
      </div>
      <div className="flex justify-center flex-col mt-4 ">
        <label htmlFor="Receipt" className="text-3xl font-bold">
          Receipt:
        </label>
        <img
          src={tenant?.imageUrl}
          alt={tenant?.name}
          className="object-contain max-w-xl "
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold">Renew Rent</h2>

            <label className="block mt-2">New Amount:</label>
            <Input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="border p-2 w-full"
            />
            <label className="block mt-2">Comment</label>
            <Input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border p-2 w-full"
            />
            <label className="block mt-2">Receipt</label>
            <div className="flex space-x-4 mb-8">
              <Input type={"file"} onChange={handleFileChange} />
              <button
                onClick={uploadImageToFirebaseStorage}
                className="text-bold  bg-green-500  text-white  rounded-md px-3 py-1.5"
              >
                Upload Receipt
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={renewRent}
                className="bg-blue-500 px-4 py-2 text-white rounded-md"
              >
                Renew
              </button>
            </div>
          </div>
        </div>
      )}

      {tenant?.payments?.length > 0 &&
        tenant?.payments?.map((data, index) => (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">payment {index + 1}</h2>
            <div className="space-y-4">
              <div
                key={data._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p className="text-gray-700">
                  <strong>Comment:</strong> {data.comment}
                </p>
                <p className="text-gray-700">
                  <strong>Amount Paid:</strong> &#8358;{data.amountPaid}
                </p>
                <p className="text-gray-700">
                  <strong>Payment Date:</strong>{" "}
                  {new Date(data.paymentDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Payment Method:</strong> {data.paymentMethod}
                </p>
                <a
                  href={data.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Receipt
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TenantDetails;
