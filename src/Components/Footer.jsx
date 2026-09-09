import React, { useState } from 'react'
import { instagram_icon, youtube_icon, tiktok_icon } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_czyksfq'
const TEMPLATE_ID = 'template_j4xxi8k'
const PUBLIC_KEY = 'kfX86Q8qm0-WJvdZv'

const Footer = () => {

    const location = useLocation()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        postalCode: '',
        smsConsent: false
    })

    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: ''
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ submitting: true, success: false, error: '' })

        const templateParams = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || 'N/A',
            postal_code: formData.postalCode,
            sms_consent: formData.smsConsent ? 'Yes' : 'No'
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            )

            setStatus({ submitting: false, success: true, error: '' })
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                postalCode: '',
                smsConsent: false
            })
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus({
                submitting: false,
                success: false,
                error: 'Failed to send. Please try again later.'
            })
        }
    }

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
        <div className="w-full bg-black text-white pt-20 pb-10">
            {/* Mailing List Section */}
            <section className="max-w-4xl mx-auto px-6 mb-20 flex flex-col items-center text-center">
                <p className="text-neutral-300 text-sm sm:text-base font-medium tracking-wide mb-2">
                    Be the first to hear about music and news.
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-10">
                    Sign Up With Email And Text
                </h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                                First Name*
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                                Last Name*
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                                Email*
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                                Postal Code*
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                required
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                        <input
                            type="checkbox"
                            id="smsConsent"
                            name="smsConsent"
                            checked={formData.smsConsent}
                            onChange={handleChange}
                            className="w-4 h-4 mt-1 accent-white cursor-pointer"
                        />
                        <label htmlFor="smsConsent" className="text-[11px] leading-relaxed text-neutral-400 cursor-pointer">
                            Sign up for texts: By checking this box, you agree to receive recurring automated promotional and personalized marketing text messages from Valley One Worship at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg &amp; data rates may apply.
                        </label>
                    </div>

                    <p className="text-[10px] uppercase text-neutral-500 text-center leading-relaxed mt-2 tracking-wider">
                        Emails will be sent by or on behalf of Valley One Worship. You may withdraw your consent at any time. View privacy policy for details.
                    </p>

                    <div className="flex flex-col items-center gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={status.submitting}
                            className="bg-white text-black px-12 py-3.5 text-sm font-semibold tracking-wider hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        >
                            {status.submitting ? 'Submitting...' : 'Submit'}
                        </button>

                        {status.success && (
                            <p className="text-emerald-400 text-sm font-medium">
                                Thank you for signing up!
                            </p>
                        )}
                        {status.error && (
                            <p className="text-red-400 text-sm font-medium">
                                {status.error}
                            </p>
                        )}
                    </div>
                </form>
            </section>

            <footer className="row pb-6 px-8 flex flex-col">

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <h2 className="text-white text-2xl font-bold">
                            Valley One Worship
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <a className="invert" href="https://www.instagram.com/valleyoneworship" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={instagram_icon} size="2x" className="invert transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
                            </a>
                            <a className="invert" href="https://www.youtube.com/@ValleyOneWorship" target="_blank" rel="noreferrer" >
                                <FontAwesomeIcon icon={youtube_icon} size="2x" className="invert transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
                            </a>
                            <a className="invert" href="https://www.tiktok.com/@valleyoneworship" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={tiktok_icon} size="2x" className="invert transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px" />
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