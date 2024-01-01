import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import { UserContextProvider } from "./context/UserContext"
export default function App() {
  return (
  <>
    <UserContextProvider>
    {/* <Auth/> */}
    <Dashboard/>
    </UserContextProvider>
  </>
  )
}