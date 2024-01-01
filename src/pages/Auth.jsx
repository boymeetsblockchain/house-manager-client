import { useCallback, useState } from 'react'
import Home from '../assets/home4.png'
import axios from 'axios'
import {API} from '../data/api'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { toast } from 'react-toastify'
const Auth = () => {
  const navigate= useNavigate()
    const [variant, setVariant] = useState('login');
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [email,setEmail]= useState("")
    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => (currentVariant === 'login' ? 'register' : 'login'));
      }, []);


     
      const registerUser=async(e)=>{
        e.preventDefault()
     try {
      const formData= {email,username,password}
      const response=await axios.post(`${API}users/register`,formData, {withCredentials:true})
      toast.success("Successfully registered")
      navigate('/dashboard')
     } catch (error) {
       console.log(error)
       toast.error("something went wrong")
     }
    
      }

      const loginUser= async(e)=>{
        e.preventDefault()
        try {
           const formData= {email,password}
        const response=await axios.post(`${API}users/login`,formData, {withCredentials:true})
        toast.success("succesfully logged in")
        navigate('/dashboard')
        } catch (error) {
          console.log(error)
          toast.error("something went wrong")
        }
        
      }
  return (
    <div className="mx-auto max-w-screen-xl h-full w-full px-4 md:px-8 lg:px-12">
          <div className="h-screen flex flex-col items-center justify-center">
        <div>
          <h1 className="text-center font-bold text-3xl md:text-6xl my-6">House Management App</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="input-container">
                <form className="w-full md:w-[480px] flex flex-col space-y-4" onSubmit={ variant==="login"  ? loginUser: registerUser }>
                    {
                        variant==="register" && (
                            <Input label={"Username"} type={'text'} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        )
                    }
                  <Input label={'Email'} type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  
                  <Input label={"Password..."} type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <div className="flex justify-end">
                <button className="bg-[#567DF4] py-3 text-white text-sm rounded-md w-1/4 mt-4 hover:bg-[#22215B] transition">
                {variant === 'login' ? 'Login' : 'Register'}
                </button>
             
              </div>
              <p className="text-black mt-12">
                {variant === 'login' ? 'First time here?' : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-[#567df4] ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
                </form>
            </div>
            <div className="image hidden md:block">
                <img src={Home} alt="" width={640} height={852}/>
            </div>
        </div>
        </div>
    </div>
  )
}
export default Auth