import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Bookingwid from "../components/Bookingwid";
import PlaceImg from "../components/PlaceImg";
import Banner from "../components/Banner";

export default function Placepage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showPhotos, setShowPhotos] = useState(false);
    const [click,setClick]=useState(0)
  
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id]);

    if (!place) return " ";

    if (showPhotos) {
        if(click<0 || click>place.photos.length-1){
            return(
                setClick(0)
            )
           }
        return (
            <div className="absolute inset-0 bg-white text-black bg-opacity-5  min-h-screen ">
           
                <div className="p-8 grid gap-4  bg-white  ">
                    <div>
                        <p className="text-2xl font-light mr-30"> Photos of {place.title}</p>
                        <button onClick={() => {
                            setShowPhotos(false)
                        }} className="fixed right-4 shadow shadow-black flex gap-2 py-2 px-4 rounded-xl bg-gray-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            Close photos</button>
                    </div>
                    <div className="flex justify-center mt-8 items-center">
                    <button
                className="bg-gray-300 opacity-50 text-white p-2 rounded-full  hover:opacity-100 mx-2"
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
                    {place?.photos?.length > 0 && 
                        <div className="flex justify-center w-1/2">
                            <img src={'http://localhost:4000/uploads/' + place.photos[click]} alt="" />
                        </div>
                    }
                      <button
                className="bg-gray-300 opacity-50 text-white p-2 rounded-full hover:opacity-100 mx-2"
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
        )
    }
    return (
        <div className="flex justify-center   py-4 px-2 bg-gray-50">
               
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl  text-gray-600">
                    {place.title}
                </h1>
                <a target="_blank" className="block font-semibold underline" href={"https://www.google.com/maps/?q=" + place.address}>{place.address}</a>
                <div onClick={() => {
                                    setShowPhotos(true)
                                }} className="  grid w-2/3 gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div className="w-full h-full relative">
                      <PlaceImg place={place} />
                      </div>
                    <div className="grid ">
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden relative">
                            {place.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
                            )}
                            <div>


                                <button onClick={() => {
                                    setShowPhotos(true)
                                }} className=" flex gap-1 w-12 h-10 lg:w-2/3 md:w-1/3 sm:h-15  justify-center items-center hover:scale-110 transition-all ease-linear hover:shadow-black absolute bottom-2 right-2 p-2   shadow-md shadow-gray-500 rounded-2xl bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <p className="hidden lg:block lg:text-sm opacity-0 lg:opacity-100"> show more photos</p></button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr] w-full px-4">

                    <div>
                        <div className="my-6  ">
                            <h2 className="font-semibold text-2xl"> Description</h2>
                            {place.description}
                        </div>
                        Check-in :{place.checkin} <br />
                        check-Out :{place.checkOut} <br />
                        Max Guest :{place.maxGuests}

                    </div>
                    <div>
                        <Bookingwid place={place} />
                    </div>
                </div>
                <div className="bg-white mt-2 px-4 py-2 w-full border-t">
                    <div>
                        <h2 className="text-2xl ">Extra Info</h2>
                    </div>
                    <div className="text-sm text-gray-700 leading-4 my-4 ">
                        {place.extraInfo}
                    </div>
                </div>
            </div>


        </div>


    )
}