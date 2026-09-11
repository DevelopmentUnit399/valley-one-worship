import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RELEASES_DATA } from '../Data/ReleasesData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
    faArrowLeft,
    faFilePdf,
    faGuitar,
    faHashtag,
    faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { UseDocumentTitle } from '../Hooks/UseDocumentTitle'
import SongTransposerModal from '../Components/SongTransposerModal'
import { chordProToPlainLyrics, parseChordProForLyricsPdf, parseChordProForNumbers } from '../utils/ChordPro'
import { LyricSheetPdfDocument } from '../Components/LyricSheetPdf'
import { pdf } from '@react-pdf/renderer'
import { ChordProPdfDocument } from '../Components/ChordProPdf'

export default function MusicDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const release = RELEASES_DATA.find((item) => item.id === id)
    const [isTransposerOpen, setIsTransposerOpen] = useState(false)
    const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false)
    const [isGeneratingNumbers, setIsGeneratingNumbers] = useState(false)

    UseDocumentTitle(release ? release.title : 'Release Not Found')

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
        "w-full flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm hover:bg-neutral-800 hover:border-neutral-700 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"

    // Check if valid chordPro content exists
    const hasChordPro = Boolean(release.chordPro && release.chordPro.trim().length > 0)
    const activeChordPro = release.chordPro || ''

    // Clean lyrics stripped of chords for on-screen display
    const displayLyrics = hasChordPro ? chordProToPlainLyrics(release.chordPro) : release.lyrics

    // Downloads clean lyrics-only PDF
    const handleDownloadLyricsPdf = async () => {
        if (!hasChordPro) return
        try {
            setIsGeneratingLyrics(true)
            const docData = parseChordProForLyricsPdf(activeChordPro)
            const blob = await pdf(<LyricSheetPdfDocument docData={docData} />).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${release.title.replace(/\s+/g, '_')}_Lyrics.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            setTimeout(() => URL.revokeObjectURL(url), 1000)
        } catch (error) {
            console.error('Error generating lyrics PDF:', error)
        } finally {
            setIsGeneratingLyrics(false)
        }
    }

    // Downloads dynamic Nashville Numbers PDF
    const handleDownloadNumberChart = async () => {
        if (!hasChordPro) return
        try {
            setIsGeneratingNumbers(true)
            const numberData = parseChordProForNumbers(activeChordPro)
            numberData.metadata.key = 'Numbers'

            const blob = await pdf(
                <ChordProPdfDocument parsedData={numberData} semitones={0} />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${release.title.replace(/\s+/g, '_')}_Number_Chart.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            setTimeout(() => URL.revokeObjectURL(url), 1000)
        } catch (error) {
            console.error('Error generating number chart:', error)
        } finally {
            setIsGeneratingNumbers(false)
        }
    }

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

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Centered Sticky Left Column */}
                    <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-24 self-start flex flex-col items-center space-y-6">
                        <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
                            <img
                                src={release.cover}
                                alt={release.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2.5 max-w-[300px]">
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

                            {/* Only display ChordPro-generated downloads if chordPro text is present */}
                            {hasChordPro && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsTransposerOpen(true)}
                                        className={buttonStyle}
                                    >
                                        <FontAwesomeIcon icon={faGuitar} className="text-lg text-neutral-400" />
                                        Transpose &amp; Download Chart
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDownloadLyricsPdf}
                                        disabled={isGeneratingLyrics}
                                        className={buttonStyle}
                                    >
                                        <FontAwesomeIcon
                                            icon={isGeneratingLyrics ? faSpinner : faFilePdf}
                                            className={`text-lg text-neutral-400 ${isGeneratingLyrics ? 'animate-spin' : ''}`}
                                        />
                                        {isGeneratingLyrics ? 'Generating PDF...' : 'Download Lyrics Sheet'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDownloadNumberChart}
                                        disabled={isGeneratingNumbers}
                                        className={buttonStyle}
                                    >
                                        <FontAwesomeIcon
                                            icon={isGeneratingNumbers ? faSpinner : faHashtag}
                                            className={`text-lg text-neutral-400 ${isGeneratingNumbers ? 'animate-spin' : ''}`}
                                        />
                                        {isGeneratingNumbers ? 'Building Number Chart...' : 'Download Number Chart'}
                                    </button>
                                </>
                            )}

                            {/* Static fallback downloads */}
                            {release.chordsPdf && (
                                <a
                                    href={release.chordsPdf}
                                    download
                                    className={buttonStyle}
                                >
                                    <FontAwesomeIcon icon={faGuitar} className="text-lg text-neutral-400" />
                                    Download Original Chord Chart
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-8">
                        <div className="text-center md:text-left">
                            <div className="flex justify-center md:justify-start">
                                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                                    {release.subtitle} &bull; {release.releaseDate}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-4">
                                {release.title}
                            </h1>
                            {release.description && (
                                <p className="text-neutral-400 text-base mt-4 leading-relaxed max-w-2xl mx-auto md:mx-0">
                                    {release.description}
                                </p>
                            )}
                        </div>

                        {/* Tracklist */}
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

                        {/* Clean Plaintext Lyrics */}
                        {displayLyrics && (
                            <div className="border-t border-neutral-800 pt-6">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                                    Lyrics
                                </h2>
                                <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-left">
                                    <pre className="font-sans text-neutral-300 text-base whitespace-pre-line leading-relaxed">
                                        {displayLyrics}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {hasChordPro && (
                <SongTransposerModal
                    isOpen={isTransposerOpen}
                    onClose={() => setIsTransposerOpen(false)}
                    songTitle={release.title}
                    initialChordPro={activeChordPro}
                />
            )}
        </section>
    )
}
