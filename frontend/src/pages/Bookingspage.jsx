import { useEffect, useState } from "react"

import axios from "axios"
import PlaceImg from "../components/PlaceImg"
import { format } from "date-fns"
import { Link } from "react-router-dom"

export default function Bookingspage(){
    const[booking,setBooking]=useState([])
    useEffect(()=>{
        axios.get('/bookings',).then(response=>{
            setBooking(response.data)
        })
    },[])
    if(!booking){
        return (
            <div>
                No bookings yet 
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1  sm:grid-cols-2 mt-4">
        {booking?.length>0 &&  booking.map(booking=>(
            <Link to={`/account/bookings/${booking._id}`} className="flex m-2 border shadow-md  shadow-amber-100  gap-4   overflow-hidden">
                <div className="w-48 border border-gray-500 ">
                <PlaceImg place={booking.place} />
                </div>
                <div className="pt-2">
                    <h2 className="text-xl">{booking.place.title}</h2>
              {format(new Date(booking.checkin), 'yyyy/MM/dd' )} --- {format(new Date(booking.checkOut), 'yyyy/MM/dd' )}
              <div>
                  Total price - ${booking.price}
                </div>
                <div className="pt-2 ">
                   
                    <h2 className="font-semibold">Your name - <span>{booking.name}</span></h2>
                    <h2 className="font-semibold">Phone no - <span>{booking.phoneno}</span></h2>
                    
                   
                    
                </div>
              
                </div>
                
              
            </Link>
        )

        )}
        </div>
    )
}