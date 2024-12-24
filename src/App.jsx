import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>صفحه اصلی</h2>} />
        <Route path="/tickets" element={<h2>خرید بلیط</h2>} />
        <Route path="/refund" element={<h2>استرداد بلیط</h2>} />
        <Route path="/cancellation" element={<h2>کنسلی</h2>} />
        <Route path="/about" element={<h2>درباره ما</h2>} />
        <Route path="/contact" element={<h2>ارتباط با ما</h2>} />
      </Routes>
    </Router>
  )
}

export default App
