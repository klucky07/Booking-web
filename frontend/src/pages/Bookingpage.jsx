import { useParams } from "react-router-dom"

export default function Bookingpage(){
    const {id} =useParams();
   
    return (
        <div>
            single Bookings : {id}
        </div>
    )
}