import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Music from './Pages/Music'

function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
