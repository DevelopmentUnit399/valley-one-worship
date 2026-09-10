import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RELEASES_DATA } from '../Data/ReleasesData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Music() {
  const [filter, setFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Determine whether to route to /music/album/:id or /music/song/:id
  const getReleasePath = (item) => {
    const isAlbum = item.subtitle?.toLowerCase().includes('album')
    return `/music/${isAlbum ? 'album' : 'song'}/${item.id}`
  }

  // Combined category filter + real-time search
  const filteredReleases = RELEASES_DATA.filter((item) => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ALBUMS' && item.subtitle.toLowerCase().includes('album')) ||
      (filter === 'SINGLES' && item.subtitle.toLowerCase().includes('single'))

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const featuredRelease = RELEASES_DATA.find((item) => item.featured) || RELEASES_DATA[0]

  useEffect(() => {
    document.title = 'Music & Discography | Valley One Worship'

    return () => {
      document.title = 'Valley One Worship'
    }
  }, [])

  return (
    <section data-theme="light">
      <main className="w-full min-h-screen bg-white text-black pt-24 pb-28">
        {/* Featured Banner */}
        <section data-theme="dark" className="row mb-20">
          <div className="relative w-full rounded-3xl overflow-hidden bg-neutral-900/70 border border-neutral-800 p-6 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
            <Link
              to={getReleasePath(featuredRelease)}
              className="w-full md:w-96 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-2xl group"
            >
              <img
                src={featuredRelease.cover}
                alt={featuredRelease.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="w-full flex flex-col items-start space-y-4">
              <span className="text-xs text-white md:text-sm font-semibold tracking-widest uppercase bg-neutral-800 px-3 py-1 rounded-full self-start">
                Latest Release &bull; {featuredRelease.releaseDate}
              </span>

              <div className="w-full text-center sm:text-left">
                <Link to={getReleasePath(featuredRelease)}>
                  <h1 className="text-3xl md:text-5xl text-white font-bold uppercase tracking-tight hover:underline">
                    {featuredRelease.title}
                  </h1>
                </Link>
                <p className="text-white text-sm md:text-base max-w-xl mt-3 mx-auto sm:mx-0">
                  {featuredRelease.subtitle} &bull; <br /> <br /> {featuredRelease.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-start self-start">
                <Link
                  to={getReleasePath(featuredRelease)}
                  className="action-button bg-white! text-black! hover:bg-neutral-200!"
                >
                  View Details & Lyrics
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Discography Grid Section */}
        <section data-theme="light" className="row">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between border-b border-neutral-300 pb-6 mb-12 gap-6">
            <div className="shrink-0 text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                Discography
              </h2>
              <p className="text-neutral-500 text-sm mt-1">
                Browse singles, worship albums, and ministry charts
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md mx-auto w-full">
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 text-neutral-400 text-sm pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search songs or albums..."
                  className="w-full py-2 pl-10 pr-10 text-sm bg-neutral-100 border border-neutral-300 rounded-full text-black placeholder-neutral-400 focus:outline-hidden focus:border-black focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 text-neutral-400 hover:text-black text-xs cursor-pointer p-1"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-start sm:justify-end gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
              {['ALL', 'ALBUMS', 'SINGLES'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    filter === type
                      ? 'bg-black text-white'
                      : 'bg-neutral-200 text-neutral-600 hover:text-black'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Grid View */}
          {filteredReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredReleases.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-neutral-950 rounded-2xl border border-neutral-900 overflow-hidden shadow-lg group hover:border-neutral-700 transition-all duration-300"
                >
                  <Link
                    to={getReleasePath(item)}
                    className="relative aspect-square w-full overflow-hidden bg-neutral-900"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {item.subtitle}
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div className="text-center sm:text-left">
                      <Link to={getReleasePath(item)}>
                        <h3 className="text-lg font-bold tracking-tight text-white hover:underline">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-400 font-medium mt-0.5">
                        {item.releaseDate}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-900 flex items-center justify-start">
                      <Link
                        to={getReleasePath(item)}
                        className="text-white hover:text-neutral-300 transition-colors text-xs font-semibold underline"
                      >
                        Lyrics & Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg font-medium">
                No songs or albums found matching "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilter('ALL')
                }}
                className="mt-4 text-sm font-bold text-black underline cursor-pointer"
              >
                Clear search & filters
              </button>
            </div>
          )}
        </section>
      </main>
    </section>
  )
}