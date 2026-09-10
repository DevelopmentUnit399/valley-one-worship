import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Music from './Pages/Music'
import About from './Pages/About'
import MusicDetail from './Pages/MusicDetail'

function App() {

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
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
