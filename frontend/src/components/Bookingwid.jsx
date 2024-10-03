import { useState } from "react"
import { differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function Bookingwid({place}){
    const [checkin,setCheckin] =useState('');
    const [checkOut,setCheckOut] =useState('');
    const [noofguest,setNoofguest] =useState(1);
    const [name,setName]=useState('');
    const [phoneno, setPhoneno]=useState('')
    const[redirect,setRedirect]=useState('')
let numberofdays=0;
if(checkOut && checkin){
    numberofdays= differenceInCalendarDays(new Date(checkOut),new Date(checkin))
}
 async function bookThis(){
   
        const response = await axios.post('/bookings',  { 
            checkin,checkOut,
            place:place._id,
            name,phoneno,noofguest,
            price:numberofdays*place.price
        });
            const bookingId=response.data._id;
            setRedirect(`/account/bookings/${bookingId}`)

}
if(redirect){
    return <Navigate to ={redirect}/>
}
    return(
        <div class="bg-white p-6 mt-8 rounded-2xl shadow-lg max-w-md mx-auto">
        <div class="text-2xl font-bold text-center mb-6">
            Price: $<span id="price-placeholder">{place.price}</span> <span class="text-gray-500 text-lg">per night</span>
        </div>

        <div class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <label for="check-in" class="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                    <div class="relative">
                        <input value={checkin} onChange={(ev=>{
                            setCheckin(ev.target.value)
                        })} type="date" id="check-in" class="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div class="flex-1">
                    <label for="check-out" class="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                    <div class="relative">
                        <input value={checkOut} onChange={(ev=>{
                            setCheckOut(ev.target.value)
                        })}  type="date" id="check-out" class="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
            </div>

            <div>
                <label for="max-guests" class="block text-sm font-medium text-gray-700 mb-1">
                    No of guests</label>
                <div class="relative">
                    <input value={noofguest} onChange={(ev=>{
                            setNoofguest(ev.target.value)
                        })}  type="number" id="max-guests" min="1" class="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
            {numberofdays>0 &&(
                <div className="py-3  border-t">
                    <div>
                    <label htmlFor="">Your full name</label>
                    <input className=" border-2 rounded-md p-1 ml-2"
                     value={name} 
                     onChange={ev=>{
                        setName(ev.target.value)
                    }} type="text" placeholder="john doe" />
                    </div>
                    <div className="mt-2">
                  
                    <label htmlFor="">Your Phone no</label>
                    <input className=" border-2 rounded-md p-1 ml-2"
                     value={phoneno} 
                     onChange={ev=>{
                        setPhoneno(ev.target.value)
                    }} type="tel" placeholder="987654321" />
                          
                          </div>
                </div>
            )}
        </div>

        <button onClick={bookThis} class="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-xl mt-6 hover:bg-red-600 transition duration-300">
            Book Now
            {numberofdays>0 && ( 
                <span>
    -${numberofdays * place.price}
                </span>
                )}
        </button>
    </div>
    )
}