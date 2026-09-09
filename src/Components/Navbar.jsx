import React from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import homepage_video from '../assets/videos/homepage_video.mp4'

const Navbar = () => {
    return (
        <nav className="bg-white">
            <div className="row flex mt-1 h-20">
                <div className="relative flex justify-between gap-4 items-center w-full">
                    <Link to="/" className="transition-all duration-200 max-w-25 hover:-translate-y-0.5 active:translate-y-px">
                        <img className="invert hidden sm:block" src={assets.v1_icon_full} alt="Valley One Logo" />
                        <img className="invert block sm:hidden w-8.75" src={assets.v1_icon} alt="Valley One Logo Small" />
                    </Link>
                    <nav className="absolute left-1/2 -translate-x-1/2">
                        <ul className="flex gap-5">
                            <li className="flex gap-5 justify-center">
                                <Link to="/" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
                                    Home
                                </Link>
                                <Link to="/about" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
                                    About
                                </Link>
                                <Link to="/music" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
                                    Music
                                </Link>
                                <Link to="/events" className="hidden sm:block transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
                                    Events
                                </Link>
                                <Link to="/booking" className="hidden sm:block transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
                                    Booking
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <a href="https://linktr.ee/valleyoneworship" target="_blank" rel="noreferrer" className="transition-all duration-200 max-w-5.5 hover:-translate-y-0.5 active:translate-y-px">
                        <img src={assets.music_icon} alt="Music Icon" />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar