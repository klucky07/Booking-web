
import { Navbar } from "../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Home = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/home-places').then(response => {
            setPlaces([...response.data,...response.data,...response.data,...response.data])
        })
    }, [])

    return (  <div className="w-full flex justify-center">

    
    <div className="grid grid-cols-2   md:grid-cols-3 gap-4 mt-8  lg:grid-cols-4">
        {places.length > 0 && places.map(place => (
            <Link to={'/place/'+place._id} className="m-4  border-b ">
                <div className="bg-gray-500 rounded-2xl">
                {place.photos?.[0] && (
                    <img className=" rounded-2xl " src={"http://localhost:4000/uploads/" + place.photos?.[0]} alt="" />
                )}

                </div>
                <h3 className="font-semibold mt-2 text-md">{place.address}</h3>
            <h2 className="text-sm  truncate text-gray-500">   {place.title}</h2>
          
             <h3 className="mt-1">${place.price} per night </h3>
            </Link>

        ))}
    </div>
    </div>)
}