import React, { useState, useEffect, useMemo } from 'react'
import { pdf } from '@react-pdf/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { parseChordPro, getSemitoneDistance, KEYS } from '../utils/ChordPro'
import { ChordProPdfDocument } from './ChordProPdf'

export default function SongTransposerModal({ isOpen, onClose, initialChordPro = '', songTitle = '' }) {
    const [selectedKey, setSelectedKey] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    // Extract song title from ChordPro directive if not explicitly passed
    const displayTitle = useMemo(() => {
        if (songTitle) return songTitle
        const match = initialChordPro.match(new RegExp('^\\{\\s*(?:title|t):\\s*(.*?)\\}', 'im'))
        return match ? match[1].trim() : ''
    }, [initialChordPro, songTitle])

    // Read initial key tag from the chord chart
    const detectedKey = useMemo(() => {
        const match = initialChordPro.match(new RegExp('^\\{\\s*key:\\s*(.*?)\\}', 'im'))
        return match ? match[1].trim() : 'C'
    }, [initialChordPro])

    // Reset default key when opening a song
    useEffect(() => {
        setSelectedKey(detectedKey)
    }, [detectedKey, isOpen])

    if (!isOpen) return null

    const semitones = getSemitoneDistance(detectedKey, selectedKey)
    const parsedData = parseChordPro(initialChordPro, semitones, selectedKey)

    const handleDownloadPdf = async () => {
        try {
            setIsGenerating(true)

            const blob = await pdf(
                <ChordProPdfDocument parsedData={parsedData} semitones={semitones} />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            const fileName = `${parsedData.metadata.title.replace(/\s+/g, '_')}_Key_${selectedKey}.pdf`

            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            setTimeout(() => URL.revokeObjectURL(url), 1000)

            // Dismiss the modal after the download initiates
            onClose()
        } catch (error) {
            console.error('Error generating PDF:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-white">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
                    Transpose &amp; Download Chart{displayTitle ? ` for ${displayTitle}` : ''}
                </h2>
                <p className="text-sm text-neutral-400 mb-6">
                    Select your preferred key below to generate and download your lead sheet.
                </p>

                {/* Key Dropdown */}
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Target Key (Original: <span className="text-white font-bold">{detectedKey}</span>)
                    </label>
                    <select
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm focus:outline-none focus:border-neutral-600 cursor-pointer"
                    >
                        {KEYS.map((k) => (
                            <option key={k} value={k}>
                                Key of {k} {k === detectedKey ? '(Original)' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Trigger Button */}
                <div>
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FontAwesomeIcon
                            icon={isGenerating ? faSpinner : faFilePdf}
                            className={isGenerating ? 'animate-spin' : ''}
                        />
                        <span>{isGenerating ? 'Building PDF...' : `Download PDF (Key of ${selectedKey})`}</span>
                    </button>
                </div>

            </div>
        </div>
    )
}
