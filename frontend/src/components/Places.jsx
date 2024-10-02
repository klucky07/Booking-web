import { useState ,useEffect} from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios";
import { Addplace } from "./Addplace";
export default function Places() {
    const {id} =useParams();
    console.log({id})
    const[places,setPlaces]=useState([])
    const { action } = useParams();
   

    // useEffect(()=>{
    //     if(!id){
    //         return;
    //     }
    //     axios.get('/places/' +id)
    //         .then(response=>{
    //             const {data} =response;
    //             setTitle(data.title);
    //             setAddress(data.address);
    //             setDexcriptiom(data.description)
    //             setexis
    //         })
    // },[id])

    // function InputHEader(text){
    //     return (
    //         <h2 className="text-xl mt-4 pb-2 pl-2 ">{text}</h2>
    //     )
    // }
useEffect(()=>{
  axios.get('/places').then(({data})=>{
    setPlaces(data);
  })
},[])

    
    return (
        <div>
            {action !== 'new'  && (
                <div className=" text-center mt-8">
                    <Link className="bg-red-500 gap-1 inline-flex justify-center  rounded-full px-4 py-2 text-white" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Add new places </Link>
                </div>
            )}
            {action === 'new' && (
                <Addplace/>
            )}
            <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                {places.length>0&& places.map(place=>(
                    <Link to={'/account/places/'+place._id} className="border-2 cursor-pointer shadow-md mb-2  p-2 rounded-2xl">
                        {place.title}
                    <div className="w-32 h-32 bg-gray-300 rounded-lg ">
                        {place.photos.length>0 &&(
                            <img className="w-32 h-32 object-cover rounded-lg" src={`http://localhost:4000/uploads/${place.photos[0]}`}  alt="error" />
                        )}
                       
                    </div>
                    <div>
                            <p>{place.description}</p>
                            <p>{place.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}