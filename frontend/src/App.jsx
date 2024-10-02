
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Routes ,Route} from 'react-router-dom'
import { Signup } from './pages/Signup'
import{Signin} from './pages/Signin'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'
import { Addplace } from './components/Addplace'
import Places from './components/Places'
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
   
   <Route path="/account/:subpage?" element={<Account/>} />
   <Route path="/account/:subpage/:action" element={<Account/>} />
   <Route path="/account/places/:id" element={<Addplace/>} />

      </Route>
  
    </Routes>
    </UserContextProvider>
  </div>
}

export default App
