import React, { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFileContract,
  faExternalLinkAlt,
  faPaperPlane,
  faCheckCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { UseDocumentTitle } from '../Hooks/UseDocumentTitle'
import { LICENSING_DATA, LICENSE_CATEGORIES } from '../Data/LicensingData'

export default function Licensing() {
  UseDocumentTitle('Song Licensing & Rights | Valley One Worship')

  const [query, setQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState(null)
  const [requestCategory, setRequestCategory] = useState('sync')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Filter songs based on search
  const filteredSongs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LICENSING_DATA
    return LICENSING_DATA.filter(
      (song) =>
        song.title.toLowerCase().includes(q) ||
        song.writers.toLowerCase().includes(q) ||
        song.ccli.includes(q)
    )
  }, [query])

  const openRequestModal = (song = null, categoryId = 'sync') => {
    setSelectedSong(song)
    setRequestCategory(categoryId)
    setSubmitted(false)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full">
      {/* Top Banner (White Header) */}
      <section data-theme="light" className="w-full bg-white text-black pt-28 pb-16 px-6 sm:px-12 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold bg-neutral-100 px-4 py-1.5 rounded-full border border-neutral-300 inline-block mb-4">
            Music Publishing &amp; Permissions
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-950 mb-4">
            Song Licensing
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Clearance for live worship, church streaming, media sync, broadcasts, and print arrangements.
          </p>
        </div>
      </section>

      {/* Main Content Area (Dark Theme) */}
      <section data-theme="dark" className="w-full bg-black text-white py-16 px-6 sm:px-12 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Licensing Types Cards */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 text-center">
              Available Rights &amp; Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LICENSE_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4 leading-relaxed">{cat.description}</p>
                    <p className="text-xs text-neutral-500 italic border-l-2 border-neutral-800 pl-3">
                      {cat.terms}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openRequestModal(null, cat.id)}
                    className="mt-6 w-full py-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
                  >
                    Request {cat.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Song Catalog Search Table */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">Song Clearance Catalog</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Locate song titles, CCLI identification numbers, and writer info.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, writer, or CCLI..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            {/* Results */}
            {filteredSongs.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 text-sm">
                No songs found matching "{query}".
              </div>
            ) : (
              <div className="divide-y divide-neutral-900">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-neutral-900/40 px-3 rounded-xl transition-colors"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white">{song.title}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{song.writers}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                        <span>CCLI #{song.ccli}</span>
                        <span>&bull;</span>
                        <span>Key: {song.originalKey}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {song.ccliUrl && (
                        <a
                          href={song.ccliUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center gap-1.5 transition-colors"
                        >
                          <span>CCLI</span>
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => openRequestModal(song, 'sync')}
                        className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer"
                      >
                        Request License
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Licensing Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-emerald-400" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Request Submitted</h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Our publishing administrator will review your project details and respond with clearance guidelines.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">License Inquiry</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {selectedSong
                      ? `Requesting rights for: ${selectedSong.title}`
                      : 'Submit a custom synchronization or arrangement request.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    License Category
                  </label>
                  <select
                    value={requestCategory}
                    onChange={(e) => setRequestCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    {LICENSE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Church or Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Intended Use &amp; Project Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white resize-none"
                    placeholder="Describe where and how the music will be distributed (e.g. YouTube documentary, indie film, conference broadcast)..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer mt-2"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}