import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios";

export const Addplace = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [existingPhotos, setExistingPhotos] = useState([])
    const [photolink, setPhotolink] = useState('');
    const [description, setDexcriptiom] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguest, setMaxguest] = useState(1);
    const [redirect, setRedirect] = useState(false)
    const [price,setPrice]=useState(100)

    const handlePerkChange = (event) => {
        const { checked, name } = event.target;
        if (checked) {
            setPerks([...perks, name]);
        } else {
            setPerks(perks.filter((perk) => perk !== name));
        }
    };
    async function addPhotobylink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photolink })
        setExistingPhotos(prev => {
            return [...prev, filename];
        })
        setPhotolink('')
    }
    async function addNewplace(ev) {
        ev.preventDefault();

        await axios.post('/places', {
            title,
            address, perks, extraInfo, checkin, existingPhotos, description,
            checkout, maxguest,price,
        });
        setRedirect(true)

    }
    useEffect(() => {
        if (redirect) {
            console.log(redirect);
        }
    }, [redirect]);

    if (redirect) {
        return <Navigate to={'/account/places'} />;
    }


    function uploadphoto(ev) {
        const files = ev.target.files;

        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: { "Content-Type": "multipart/form-data" }

        }).then(response => {
            const { data: filenames } = response;
            setExistingPhotos(prev => {
                return [...prev, ...filenames];
            })
        })
    }

    function removePhoto(filename) {
        setExistingPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== filename));
      }
    return (
        <div className="w-full p-2 ">
            <div className="flex justify-center  text-white  ">
                <Link to={'/account/places'} className="bg-red-500 rounded-full p-2 px-6 border-2 cursor-pointer ">Go back</Link>
            </div>
            <form onSubmit={addNewplace} className="" >
                <h2 className="text-xl mt-4 pb-2 pl-2 ">title</h2>
                <input value={title} onChange={ev => {
                    setTitle(ev.target.value)
                }} className="p-2 px-4 w-full border rounded-full " type="text" placeholder="title " />
                <h2 className="text-xl mt-4 pl-2 pb-2">Address</h2>
                <input value={address} onChange={ev => {
                    setAddress(ev.target.value)
                }} className="p-2 px-4 w-full border rounded-full " type="text " placeholder="address" />
                <h2 className="text-xl mt-4 pb-2 pl-2 ">photos</h2>
                <div className="flex">
                    <input value={photolink} onChange={ev => {
                        setPhotolink(ev.target.value)
                    }} className="p-2 px-4 w-4/5 border rounded-full mb-4" type="text" placeholder={'add using a link....jpg'} />
                    <button onClick={addPhotobylink} className="bg-red-500 w-1/2 p-2 rounded-full mb-4 text-white">Add photo</button>

                </div>
                <div className=" grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-col-4 ">
                    {existingPhotos.length > 0 && existingPhotos.map(link => (
                        <div className="h-32 flex relative"  key={link}>
                            <img className="rounded-2xl" src={"http://localhost:4000/uploads/" + link} alt="error" />
                            <button onClick={()=>{
                                removePhoto(link)
                            }} className=" absolute flex inset-0  " >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"  className="size-4 hover:scale-125 bg-blend-normal   rounded-full m-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </div>
                    ))}
                    <label className="cursor-pointer items-center flex justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 ">
                        <input onChange={uploadphoto} type="file" multiple className="hidden" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>

                        Upload
                    </label>
                </div>
                <h2>Description</h2>
                <textarea className="w-full" name={description} onChange={ev => {
                    setDexcriptiom(ev.target.value)
                }} />

                <h2>Perks</h2>
                <p>select all perks </p>
                <div>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input value="wifi" onChange={handlePerkChange} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>

                            <span>Wifi</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input value="parking" onChange={handlePerkChange} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            <span>PArking</span>
                        </label>
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input value="Tv" onChange={handlePerkChange} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>

                            <span>TV</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input value="pets" onChange={handlePerkChange} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>

                            <span>pets</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer" >
                            <input value="entrance" onChange={handlePerkChange} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>

                            <span>Private entrance</span>
                        </label>

                    </div>

                </div>

                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">House rules </p>
                <textarea className="w-full" name={extraInfo} onChange={ev => {
                    setExtraInfo(ev.target.value)
                }} />
                <h2 className="text-2xl mt-4">check in & Out time</h2>
                <p className="text-gray-500 text-sm">add check in and out time </p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time </h3>
                        <input value={checkin} onChange={ev => {
                            setCheckin(ev.target.value)
                        }} type="text" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">check out time</h3>
                        <input value={checkout} onChange={ev => {
                            setCheckout(ev.target.value)
                        }}
                            type="text" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">max guests </h3>
                        <input value={maxguest} onChange={ev => {
                            setMaxguest(ev.target.value)
                        }} type="text" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night </h3>
                        <input value={price} onChange={ev => {
                            setPrice(ev.target.value)
                        }} type="text" />
                    </div>

                </div>
                <button className="bg-red-500 py-2 m-2 rounded-full text-white px-4 "> Save</button>
            </form>




        </div>
    )
}