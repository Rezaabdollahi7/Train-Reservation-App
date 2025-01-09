import './global.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from './pages/LandingPage/components/SignUp'
import Login from './pages/LandingPage/components/Login'
import TrainList from './pages/TrainsPage/TrainList'
import AddTrain from './pages/TrainsPage/AddTrain'
import EditProfile from './components/common/EditProfile'
import NotFound from './pages/404/404'
import Support from './pages/Support/Support'
import { useContext } from 'react'
import { LanguageContext } from './context/LanguageContext'
import { ConfigProvider } from 'antd'
function App() {
  const { language } = useContext(LanguageContext)
  return (
    <ConfigProvider direction={language === 'fa' ? 'rtl' : 'ltr'}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/TrainList" element={<TrainList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AddTrain" element={<AddTrain />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
