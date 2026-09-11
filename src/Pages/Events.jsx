import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ARTIST_NAME = 'Valley One Worship'
const BANDSINTOWN_APP_ID = import.meta.env.VITE_BANDSINTOWN_APP_ID || 'bc509e9534e77989eec3942d780cd7ba'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  UseDocumentTitle('Events | Valley One Worship')

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://rest.bandsintown.com/artists/${encodeURIComponent(
            ARTIST_NAME
          )}/events?app_id=${BANDSINTOWN_APP_ID}`
        )
        const data = await response.json()
        if (Array.isArray(data)) {
          setEvents(data)
        } else {
          setEvents([])
        }
      } catch (err) {
        console.error('Failed to load tour dates:', err)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = date.toLocaleDateString('en-US', { day: 'numeric' })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
    return { month, day, year, time, weekday }
  }

  const bookingButton = (
    <Link
      to="/booking"
      className="inline-flex items-center justify-center bg-white text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98] shadow-lg"
    >
      Want Us? Book Us!
    </Link>
  )

  return (
    <section data-theme="dark" className="bg-black text-white py-16 sm:py-20 px-6 sm:px-12 w-full border-t border-neutral-800 h-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-3 text-gray-50">
            Events &amp; On The Road
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto">
            Upcoming worship nights, tours, and conferences.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-neutral-700 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* No Events: Booking Callout */}
        {!loading && events.length === 0 && (
          <div className="w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-10 sm:p-14 flex flex-col items-center text-center max-w-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">No Upcoming Tour Dates</h3>
            <p className="text-neutral-400 text-sm sm:text-base mb-8 max-w-md">
              We currently don't have any scheduled public dates. Interested in having Valley One Worship at your church or conference?
            </p>
            {bookingButton}
          </div>
        )}

        {/* Bandsintown Style Event Feed */}
        {!loading && events.length > 0 && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col divide-y divide-neutral-800 border-y border-neutral-800 mb-12">
              {events.map((event) => {
                const { month, day, year, time, weekday } = formatDate(event.datetime)
                const eventTitle = event.title || event.description || `${ARTIST_NAME} Live`
                const locationText = `${event.venue.city}, ${event.venue.region || event.venue.country}`
                const ticketUrl = event.offers?.find((o) => o.type === 'Tickets')?.url || event.url

                return (
                  <div
                    key={event.id}
                    className="py-6 px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 transition-colors duration-200 hover:bg-neutral-950/70 rounded-2xl text-center md:text-left"
                  >
                    {/* Left: Date Badge */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-center md:text-left text-gray-50">
                          {month} {day} &bull; {weekday} &bull; {year} <br /> {time}
                        </span>
                      </div>
                    </div>

                    {/* Center: Title & Location */}
                    <div className="flex-1 flex flex-col text-center md:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-50 tracking-tight leading-snug line-clamp-1">
                        {eventTitle}
                      </h3>

                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 mt-1 text-sm text-neutral-400">
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{locationText}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 justify-center shrink-0 self-center">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                      >
                        RSVP
                      </a>
                      <a
                        href={ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 hover:bg-neutral-200"
                      >
                        <span>Tickets</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Callout Under All Events */}
            <div className="flex flex-col items-center text-center gap-4">
              <p className="text-neutral-400 text-sm sm:text-base">
                Looking to host Valley One Worship at your church or upcoming conference?
              </p>
              {bookingButton}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
