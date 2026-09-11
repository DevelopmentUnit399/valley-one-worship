import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { parseChordPro } from './utils/ChordPro'
import { ChordProPdfDocument } from './Components/ChordProPdf'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Music from './Pages/Music'
import About from './Pages/About'
import MusicDetail from './Pages/MusicDetail'
import Events from './Pages/Events'
import Booking from './Pages/Booking'

const SAMPLE_CHORDPRO = `{title: Wayfaring Stranger}
{artist: Traditional}
{key: Am}
{comment: Verse 1}
I'm [Am]just a going over [Dm]Jordan
I'm only [Am]going over [E7]home
I'm just a [Am]going over [Dm]Jordan
I'm only [Am]going [E7]over [Am]home`

export default function App() {

  const [chordProText, setChordProText] = useState(SAMPLE_CHORDPRO)
  const [semitones, setSemitones] = useState(0)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => setChordProText(evt.target.result)
    reader.readAsText(file)
  }

  const parsed = parseChordPro(chordProText, semitones)

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/album/:id" element={<MusicDetail />} />
          <Route path="/music/song/:id" element={<MusicDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}