import React from 'react'
import { Link } from 'react-router-dom'

const MusicResourcesHome = ({ LATEST_ALBUM, RECENT_SONGS }) => {
    return (
        <section className="bg-white text-black py-20 px-6 sm:px-12 w-full">
            <div className="row mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left Section: Title, Description & More Button */}
                <div className="w-full lg:w-1/4 flex flex-col items-center justify-center text-left">
                    <h2 className="text-3xl sm:text-4xl font-black text-center tracking-wider uppercase mb-4 leading-tight">
                        Music &amp;<br />Resources
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base text-center leading-relaxed mb-8 max-w-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta atque magni laudantium nulla mollitia vitae quod possimus distinctio inventore pariatur ullam itaque, natus id vel illo fugit temporibus. Necessitatibus, sapiente?
                    </p>
                    <Link
                        to="/music"
                        className="inline-flex items-center gap-2 border border-black bg-black text-white rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:bg-white hover:text-black"
                    >
                        <span>More</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Center Section: Latest Album with Title Below */}
                <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
                    <Link
                        to={LATEST_ALBUM.link}
                        className="group block w-full aspect-square rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl relative"
                    >
                        <img
                            src={LATEST_ALBUM.cover}
                            alt={LATEST_ALBUM.title}
                            className="w-full h-full object-cover rounded-2xl"
                        />

                        {/* Gradient shadow for contrast */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Overlaid Title & Subtitle */}
                        <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col items-center text-center z-10 text-white">
                            <h3 className="text-2xl font-bold tracking-wide drop-shadow-md">{LATEST_ALBUM.title}</h3>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1 drop-shadow-md">
                                {LATEST_ALBUM.subtitle}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Right Section: 2x2 Grid with Text Overlaid at the Bottom Center */}
                <div className="w-full lg:w-1/3 flex items-center gap-4">
                    <div className="grid grid-cols-2 gap-4 w-full text-center">
                        {RECENT_SONGS.map((song) => (
                            <Link
                                key={song.id}
                                to={song.link}
                                className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 block"
                            >
                                <img
                                    src={song.cover}
                                    alt={song.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Subtle Gradient Shadow Behond the Bottom Text */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                                {/* Song Title Text in Bottom Center */}
                                <div className="absolute bottom-0 inset-x-0 p-3 flex justify-center text-center z-10">
                                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase line-clamp-1 drop-shadow-md">
                                        {song.title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MusicResourcesHome