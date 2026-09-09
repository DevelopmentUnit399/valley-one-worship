import React from 'react'
import { instagram_icon, facebook_icon, youtube_icon, tiktok_icon } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

    const location = useLocation()

    const handleSamePageScroll = (targetPath) => {
        if (location.pathname === targetPath) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            })
        }
    }

    return (
        <div className="w-full bg-black pt-16 sm:pt-24">
            <footer className="row pb-6 px-8 flex flex-col">

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <h2 className="text-white text-2xl font-bold">
                            Valley One Worship
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <a className="invert" href="https://www.instagram.com/valleyoneworship" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={instagram_icon} size="2x" className="transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
                            </a>
                            <a className="invert" href="https://www.youtube.com/@ValleyOneWorship" target="_blank" rel="noreferrer" >
                                <FontAwesomeIcon icon={youtube_icon} size="2x" className="transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
                            </a>
                            <a className="invert" href="https://www.tiktok.com/@valleyoneworship" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={tiktok_icon} size="2x" className="transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 md:items-end">
                        <h2 className="text-white text-2xl font-bold">
                            Quick Links
                        </h2>
                        <div className="flex gap-4">
                            <Link
                                className="transition-all duration-200 text-white hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px"
                                to="/"
                                onClick={() => handleSamePageScroll('/')}
                            >
                                Home
                            </Link>
                            <Link
                                className="transition-all duration-200 text-white hover:underline hover:font-cold hover:-translate-y-0.5 active:translate-y-px"
                                to="/music"
                                onClick={() => handleSamePageScroll('/music')}
                            >
                                Latest Music
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col items-center justify-center text-center text-zinc-400 text-sm">
                    <p>&copy; 2026 Valley One Music. All rights reserved.</p>
                </div>

            </footer>
        </div>
    )
}

export default Footer