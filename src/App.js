import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import { UserContextProvider } from "./context/UserContext"
import {Route,Routes} from 'react-router-dom'
import Tenant from "./pages/Tenant"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AddNewTenant from "./pages/AddNewTenant";
import TenantDetails from "./pages/TenantDetails"
export default function App() {
  return (
  <>
    <UserContextProvider>
      <Routes>
        <Route path="/" index element={<Auth/>}/> 
        <Route path="/dashboard" index element={<Dashboard/>}/>
        <Route path="/tenant">
          <Route  path="" element={<Tenant/>}/>
          <Route path="add" element={<AddNewTenant/>}/>
          <Route path=":id" element={<TenantDetails/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </UserContextProvider>
  </>
  )
}