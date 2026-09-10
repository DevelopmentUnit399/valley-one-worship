import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RELEASES_DATA } from '../Data/ReleasesData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
    faArrowLeft,
    faFilePdf,
    faGuitar,
    faHashtag
} from '@fortawesome/free-solid-svg-icons'
import { UseDocumentTitle } from '../Hooks/UseDocumentTitle'

export default function MusicDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const release = RELEASES_DATA.find((item) => item.id === id)

    UseDocumentTitle(release ? release.title : 'Release Not Found')

    // Reset scroll position on navigation
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!release) {
        return (
            <section data-theme="dark" className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24">
                <h2 className="text-3xl font-bold mb-4">Release Not Found</h2>
                <Link to="/music" className="action-button bg-white text-black">
                    Back to Discography
                </Link>
            </section>
        )
    }

    const buttonStyle =
        "w-full flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm hover:bg-neutral-800 hover:border-neutral-700 active:scale-[0.98] transition-all duration-200"

    return (
        <section data-theme="dark" className="w-full min-h-screen bg-black text-white pt-24 pb-28">
            <div className="row">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors mb-8 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Cover Art & Action Buttons */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
                            <img
                                src={release.cover}
                                alt={release.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            {release.spotifyUrl && (
                                <a
                                    href={release.spotifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faSpotify} className="text-lg text-[#1DB954]" />
                                    Listen on Spotify
                                </a>
                            )}

                            {release.appleUrl && (
                                <a
                                    href={release.appleUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faApple} className="text-lg text-white" />
                                    Listen on Apple Music
                                </a>
                            )}

                            {release.youtubeUrl && (
                                <a
                                    href={release.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faYoutube} className="text-lg text-[#FF0000]" />
                                    Watch on YouTube
                                </a>
                            )}

                            {release.chordsPdf && (
                                <a
                                    href={release.chordsPdf}
                                    download
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faGuitar} className="text-lg text-neutral-400" />
                                    Download Chord Chart
                                </a>
                            )}

                            {release.numbersPdf && (
                                <a
                                    href={release.numbersPdf}
                                    download
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faHashtag} className="text-lg text-neutral-400" />
                                    Download Number Chart
                                </a>
                            )}

                            {release.lyricsPdf && (
                                <a
                                    href={release.lyricsPdf}
                                    download
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="text-lg text-neutral-400" />
                                    Download Lyrics Sheet
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Title, Description, Tracklist & Lyrics */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Centered on mobile view, left-aligned on desktop */}
                        <div className="text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start">
                                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                                    {release.subtitle} &bull; {release.releaseDate}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-4">
                                {release.title}
                            </h1>
                            {release.description && (
                                <p className="text-neutral-400 text-base mt-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {release.description}
                                </p>
                            )}
                        </div>

                        {/* Tracklist linking to /music/song/:id */}
                        {release.tracks && release.tracks.length > 0 && (
                            <div className="border-t border-neutral-800 pt-6">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                                    Tracklist
                                </h2>
                                <ul className="space-y-2">
                                    {release.tracks.map((trk) => {
                                        const Content = (
                                            <>
                                                <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">
                                                    <span className="text-neutral-500 mr-3">{trk.number}</span>
                                                    {trk.title}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-neutral-500 text-xs">{trk.duration}</span>
                                                    {trk.id && (
                                                        <span className="text-neutral-500 group-hover:text-white text-xs transition-colors">
                                                            →
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )

                                        return trk.id ? (
                                            <li key={trk.number}>
                                                <Link
                                                    to={`/music/song/${trk.id}`}
                                                    className="group flex justify-between items-center text-sm py-3 px-4 rounded-xl bg-neutral-900/60 border border-neutral-800/40 hover:border-neutral-700 hover:bg-neutral-900 transition-all cursor-pointer"
                                                >
                                                    {Content}
                                                </Link>
                                            </li>
                                        ) : (
                                            <li
                                                key={trk.number}
                                                className="flex justify-between items-center text-sm py-3 px-4 rounded-xl bg-neutral-900/60 border border-neutral-800/40"
                                            >
                                                {Content}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Lyrics Area */}
                        {release.lyrics && (
                            <div className="border-t border-neutral-800 pt-6">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                                    Lyrics
                                </h2>
                                <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-left">
                                    <pre className="font-sans text-neutral-300 text-base whitespace-pre-line leading-relaxed">
                                        {release.lyrics}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}