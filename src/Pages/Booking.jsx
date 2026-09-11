import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faSpinner,
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faEnvelope,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { UseDocumentTitle } from '../Hooks/UseDocumentTitle'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Booking() {
  UseDocumentTitle('Booking & Invitations | Valley One Worship')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    eventType: 'Worship Night',
    eventTitle: '',
    eventDate: '',
    flexibleDates: 'No',
    expectedAttendance: '',
    venueName: '',
    city: '',
    state: '',
    country: 'United States',
    additionalDetails: ''
  }

  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          reply_to: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          role: formData.role || 'Not specified',
          event_type: formData.eventType,
          event_title: formData.eventTitle || 'Untitled Gathering',
          event_date: formData.eventDate,
          flexible_dates: formData.flexibleDates,
          attendance: formData.expectedAttendance || 'Not specified',
          venue: formData.venueName || 'Not specified',
          location: `${formData.city}, ${formData.state} (${formData.country})`,
          notes: formData.additionalDetails || 'None provided'
        },
        EMAILJS_PUBLIC_KEY
      )

      setIsSubmitted(true)
      setFormData(initialFormState)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('EmailJS Submission Error:', err)
      setErrorMessage(
        'Failed to send your request. Please check your connection or contact us directly via email.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors'
  const labelClass = 'block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2'

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <section data-theme="light" className="w-full bg-white text-black pt-28 pb-20 px-6 sm:px-12 border-b border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold bg-neutral-100 px-4 py-1.5 rounded-full border border-neutral-300 inline-block mb-4">
            Booking &amp; Ministry Invitations
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-950 mb-4">
            Invite Valley One Worship
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Thank you for your interest in partnering with us. Please fill out the form below with as much detail as possible, and our team will be in touch.
          </p>
        </div>
      </section>

      {/* Form Body */}
      <section data-theme="dark" className="w-full bg-black text-white py-20 px-6 sm:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wide">Request Received</h2>
              <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                We appreciate you reaching out! Our team has received your information and will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-6 inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm flex items-center gap-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Contact Details */}
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-xs text-neutral-400" />
                    Primary Contact
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">Who should we communicate with regarding this event?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="name@church.org"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Organization / Church Name *</label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Church or Organization"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Your Role / Title</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Worship Pastor, Event Director"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Event Logistics */}
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-xs text-neutral-400" />
                    Event Logistics
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">Tell us about the structure and schedule of the gathering.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Event Type *</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="Worship Night">Night of Worship</option>
                      <option value="Sunday Service">Sunday Morning Service</option>
                      <option value="Conference">Conference / Retreat</option>
                      <option value="Youth / Young Adults">Youth or YA Gathering</option>
                      <option value="Worship Workshop">Worship Workshop / Masterclass</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Event Name / Theme</label>
                    <input
                      type="text"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Encounter Conference"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Target Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Are Dates Flexible?</label>
                    <select
                      name="flexibleDates"
                      value={formData.flexibleDates}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="No">No, fixed date</option>
                      <option value="Yes">Yes, flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Expected Attendance</label>
                    <input
                      type="text"
                      name="expectedAttendance"
                      value={formData.expectedAttendance}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 500 - 1,000"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Location */}
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs text-neutral-400" />
                    Venue &amp; Location
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">Where will the gathering take place?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Venue Name</label>
                    <input
                      type="text"
                      name="venueName"
                      value={formData.venueName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Church Sanctuary, Auditorium, etc."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="State or Region"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Country *</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Details & Notes */}
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs text-neutral-400" />
                    Additional Vision &amp; Notes
                  </h2>
                </div>

                <div>
                  <label className={labelClass}>Tell us more about the vision for this event</label>
                  <textarea
                    name="additionalDetails"
                    rows={4}
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Share any background details, themes, musical expectations, or questions you have..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-60 flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <span>Submit Request</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
