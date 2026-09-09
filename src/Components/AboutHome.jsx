import React from 'react'
import { Link } from 'react-router-dom'

const AboutHome = ({ about_image }) => {
    return (
        <section className="bg-black py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={about_image}
                        alt="Valley One Image"
                        className="w-full max-w-137.5 h-auto rounded-[20px] object-cover shadow-lg"
                    />
                </div>

                {/* Right Text (Column Aligned) */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left text-white">
                    <h2 className="text-3xl font-bold mb-4">We Are Valley One Worship</h2>
                    <p className="text-white leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo dolorem cupiditate sit laborum facere consequuntur at alias pariatur debitis ex, beatae minus iste quidem sed eum numquam error.
                    </p>
                    <Link to="/about" className="action-button bg-white! text-black! hover:bg-[#a8a7a7]!">
                        Read More
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutHome