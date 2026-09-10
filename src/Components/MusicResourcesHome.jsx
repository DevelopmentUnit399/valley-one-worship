import React from 'react'
import { Link } from 'react-router-dom'

const MusicResourcesHome = ({ LATEST_ALBUM, RECENT_SONGS }) => {
    return (
        <section className="bg-white text-black py-20 px-6 sm:px-12 w-full">
            <div className="row mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

                {/* Left Section: Title, Description & More Button */}
                <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-4 leading-tight">
                        Music &amp;<br />Resources
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
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

                {/* Paired Grid Container */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* Center Section: Album Art matches the exact height of the song grid box */}
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full aspect-square overflow-hidden bg-neutral-900 shadow-2xl">
                            <Link to={LATEST_ALBUM.link} className="block w-full h-full group">
                                <img
                                    src={LATEST_ALBUM.cover}
                                    alt={LATEST_ALBUM.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </div>
                        <div className="mt-3 text-center">
                            <h3 className="text-xl font-bold tracking-wide text-neutral-900">
                                {LATEST_ALBUM.title}
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-0.5">
                                {LATEST_ALBUM.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Right Section: 2x2 Song Grid */}
                    <div className="w-full grid grid-cols-2 gap-x-4 gap-y-4">
                        {RECENT_SONGS.map((song, index) => (
                            <div key={song.id} className="flex flex-col">
                                <Link
                                    to={song.link}
                                    className="group block w-full aspect-square overflow-hidden bg-neutral-900 shadow-md"
                                >
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                                {/* Fixed height wrapper for bottom text to keep grid spacing even */}
                                <div className="mt-2 h-10 text-center">
                                    {index >= 2 && (
                                        <Link to={song.link} className="inline-block">
                                            <span className="text-xs font-bold tracking-wider text-neutral-900 uppercase line-clamp-1 transition-colors hover:text-neutral-600">
                                                {song.title}
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    )
}

export default MusicResourcesHome