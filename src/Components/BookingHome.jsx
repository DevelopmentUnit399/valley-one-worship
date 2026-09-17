import React from 'react'
import { Link } from 'react-router-dom'

const BookingHome = () => {
  return (
    <section className="bg-transparent text-neutral-900 py-24 px-6 w-full border-t border-neutral-200">
        <div className="row mx-auto flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8">
                Want us to come to you?
            </h2>
            <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-neutral-300 text-[#212121] px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 hover:border-white hover:bg-white shadow-md"
            >
                <span>Book Us Now</span>
                <span aria-hidden="true">&rarr;</span>
            </Link>
        </div>
    </section>
  )
}

export default BookingHome