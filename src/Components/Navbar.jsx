import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-transparent backdrop-blur-xs'
                    : 'bg-white'
            }`}
        >
            <div className={`row flex items-center transition-all duration-200 ${scrolled ? 'h-14' : 'h-20'}`}>
                <div className="relative flex justify-between gap-4 items-center w-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="transition-all duration-200 max-w-25 hover:-translate-y-0.5 active:translate-y-px"
                    >
                        <img
                            className={`hidden sm:block transition-all duration-200 ${
                                scrolled ? 'invert-0 drop-shadow-md' : 'invert'
                            }`}
                            src={assets.v1_icon_full}
                            alt="Valley One Logo Full"
                        />
                        <img
                            className={`block sm:hidden w-8.75 transition-all duration-200 ${
                                scrolled ? 'invert-0 drop-shadow-md' : 'invert'
                            }`}
                            src={assets.v1_icon}
                            alt="Valley One Logo Small"
                        />
                    </Link>

                    {/* Nav Links */}
                    <nav className="absolute left-1/2 -translate-x-1/2">
                        <ul className="flex gap-5">
                            <li className="flex gap-5 justify-center">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About', path: '/about' },
                                    { name: 'Music', path: '/music' },
                                    { name: 'Events', path: '/events', hiddenOnMobile: true },
                                    { name: 'Booking', path: '/booking', hiddenOnMobile: true},
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px ${
                                            link.hiddenOnMobile ? 'hidden sm:block' : ''
                                        } ${
                                            scrolled
                                                ? 'text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                                : 'text-black'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </nav>

                    {/* Music Icon */}
                    <a
                        href="https://linktr.ee/valleyoneworship"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-all duration-200 max-w-5.5 hover:-translate-y-0.5 active:translate-y-px"
                    >
                        <img
                            src={assets.music_icon}
                            alt="Music Icon"
                            className={`w-8.75 transition-all duration-200 ${
                                scrolled ? 'invert drop-shadow-md' : 'invert-0'
                            }`}
                        />
                    </a>
                </div>
            </div>

        </header>

        // <nav className="bg-white">
        //     <div className="row flex mt-1 h-20">
        //         <div className="relative flex justify-between gap-4 items-center w-full">
        //             <Link to="/" className="transition-all duration-200 max-w-25 hover:-translate-y-0.5 active:translate-y-px">
        //                 <img className="invert hidden sm:block" src={assets.v1_icon_full} alt="Valley One Logo" />
        //                 <img className="invert block sm:hidden w-8.75" src={assets.v1_icon} alt="Valley One Logo Small" />
        //             </Link>
        //             <nav className="absolute left-1/2 -translate-x-1/2">
        //                 <ul className="flex gap-5">
        //                     <li className="flex gap-5 justify-center">
        //                         <Link to="/" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
        //                             Home
        //                         </Link>
        //                         <Link to="/about" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
        //                             About
        //                         </Link>
        //                         <Link to="/music" className="transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
        //                             Music
        //                         </Link>
        //                         <Link to="/events" className="hidden sm:block transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
        //                             Events
        //                         </Link>
        //                         <Link to="/booking" className="hidden sm:block transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px text-black">
        //                             Booking
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </nav>
        //             <a href="https://linktr.ee/valleyoneworship" target="_blank" rel="noreferrer" className="transition-all duration-200 max-w-5.5 hover:-translate-y-0.5 active:translate-y-px">
        //                 <img src={assets.music_icon} alt="Music Icon" />
        //             </a>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default Navbar