import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Places from "../components/Places";
export default function Account(){
   const {user,ready ,setUser}=useContext(UserContext);
   const [redirect,setRedirect]=useState(null)
   let {subpage}= useParams();
   async function logout(){
    await axios.post('/logout')
    setUser(null)
    setRedirect('/')
 
    }
   if(subpage===undefined){
    subpage='profile';
   }
   if(!ready){
    return <div>
        loading...
    </div>
   }
   if (ready && !user && !redirect) {
    return <Navigate to={'/signin'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
   function linkclass(type=null){
    let classes= 'py-2 px-6';
    if(type===subpage ){
        classes += ' bg-red-500 text-white rounded-full shadow-red-800 shadow-md'
    }
    else{
        classes +=' bg-gray-200 rounded-full mx-2  '
    }
return classes
   }
    return(
        <div className=" w-full   mt-8  ">
            <nav className="flex justify-center">
            <Link className={linkclass('profile')} to={'/account'}>My profile</Link>
                <Link className={linkclass('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkclass('places')}  to={'/account/places'} > My accomodation</Link>
            </nav>
            {subpage==='profile'&&(
                <div className=" text-center mt-8">
                    Loggen in as {user.name}({user.email}) <br />
                    <button onClick={logout } className="bg-red-500 text-white p-1 mt-3 rounded-full px-6">Logout</button>
                </div>
            )}
            {subpage==='places'&&(
  <Places/>
  
            )}
          
        </div>
    )
}