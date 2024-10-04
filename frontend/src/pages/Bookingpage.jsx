import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function Bookingpage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [click, setClick] = useState(0);
  

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const found = response.data.find(({ _id }) => _id === id);
                if (found) {
                    setBooking(found);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return <div>No booking found.</div>;
    }
    if(click>booking.place.photos.length-1 || click<0){
        return(
         setClick(0)
        ) 
     }

    return (
        <div className="max-w-md mt-2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
           
            <div className="relative h-64">
    <div className="w-full h-full">
       
        <img
            src={'http://localhost:4000/uploads/' + booking.place.photos[click]}
            alt="Booking Place"
            className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex justify-between items-center">
          
            <button
                className="bg-red-100 opacity-20 text-white p-2 rounded-full  hover:opacity-100 mx-2"
                onClick={() => setClick(click - 1)}
                style={{ height: '40px', width: '40px' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                    />
                </svg>
            </button>

       
            <button
                className="bg-red-100 opacity-25 text-white p-2 rounded-full hover:opacity-100 mx-2"
                onClick={() => setClick(click + 1)}
                style={{ height: '40px', width: '40px' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>


            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {booking.place.title}
                </h2>
                <p className="text-gray-600">{booking.place.description}</p>

                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Address: {booking.place.address}
                    </p>
                    <p className="text-sm text-gray-500">
                        Check-in: {new Date(booking.checkin).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                        Check-out: {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                        Guests: {booking.noofguest}
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-800">Contact Details</h3>
                    <p className="text-sm text-gray-500">Name: {booking.name}</p>
                    <p className="text-sm text-gray-500">Phone: {booking.phoneno}</p>
                </div>



                <div className="mt-4">
                    <p className="text-xl font-bold text-gray-800">
                        Price: ₹{booking.place.price} / night
                    </p>
                </div>
            </div>
        </div>
    );
}
