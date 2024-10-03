import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"

export const Navbar = () => {
    const {user}=useContext(UserContext)
    return (
        <div className=" flex justify-between py-2 border-b-2">
            <Link to={'/'} href="" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
                <span className="font-bold">hotels </span>
            </Link>
            <div className="flex text-slate-600 font-semibold border-2 rounded-full gap-4 py-3 px-4 shadow shadow-gray-200 ">
                <div >Anywhere</div>
                <div className=" border-r-2  border-slate-300"></div>
                <div> Any week</div>
                <div className=" border-r-2  border-slate-300"></div>
                <div> Add guest</div>
                <div className=" border-r-2  border-slate-300"></div>
                <button className="bg-red-300 text-white rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
            <Link to={user?'/account':'/signin'} className="flex items-center text-slate-600 font-semibold border-2 rounded-full gap-4  p-2 m-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>


                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                {!!user && (
                    <div>
                        {user.name}
                    </div>
                ) }
            </Link>

        </div>
    )
}