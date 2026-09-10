import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isDarkSection, setIsDarkSection] = useState(true)

    useEffect(() => {
        const updateNavbarTheme = () => {
            // Scroll state
            setScrolled(window.scrollY > 20)

            // Find all tagged sections
            const sections = document.querySelectorAll('section[data-theme]')
            if (!sections.length) return

            // Position of navbar midpoint (around 30-40px from screen top)
            const checkPoint = 40

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                // If this section covers the navbar line:
                if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
                    const theme = section.getAttribute('data-theme')
                    setIsDarkSection(theme === 'dark')
                }
            })
        }

        // Run once on load/navigation and attach scroll listener
        updateNavbarTheme()
        window.addEventListener('scroll', updateNavbarTheme, { passive: true })
        window.addEventListener('resize', updateNavbarTheme)

        return () => {
            window.removeEventListener('scroll', updateNavbarTheme)
            window.removeEventListener('resize', updateNavbarTheme)
        }
    }, [])

    const isLightText = isDarkSection

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-transparent backdrop-blur-md' : 'bg-transparent'
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
                                isLightText ? 'invert-0 drop-shadow-md' : 'invert'
                            }`}
                            src={assets.v1_icon_full}
                            alt="Valley One Logo Full"
                        />
                        <img
                            className={`block sm:hidden w-8.75 transition-all duration-200 ${
                                isLightText ? 'invert-0 drop-shadow-md' : 'invert'
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
                                    { name: 'Booking', path: '/booking', hiddenOnMobile: true },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`transition-all duration-200 hover:underline hover:font-bold hover:-translate-y-0.5 active:translate-y-px ${
                                            link.hiddenOnMobile ? 'hidden sm:block' : ''
                                        } ${
                                            isLightText
                                                ? 'text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                                : 'text-black font-extrabold drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] [text-shadow:0_1px_2px_rgb(255_255_255/80%),-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff]'
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
                                isLightText ? 'invert drop-shadow-md' : 'invert-0'
                            }`}
                        />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Navbar