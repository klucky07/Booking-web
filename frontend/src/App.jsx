
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Routes ,Route} from 'react-router-dom'
import { Signup } from './pages/Signup'
import{Signin} from './pages/Signin'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
axios.defaults.baseURL=" http://localhost:4000";
axios.defaults.withCredentials=true; 
function App() {
 
  return <div className="">
    <UserContextProvider>
    <Routes>
      <Route path='/'  element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
   <Route path="/signup" element={<Signup />} />
   <Route path="/signin" element={<Signin />} />
      </Route>
  
    </Routes>
    </UserContextProvider>
  </div>
}

export default App
