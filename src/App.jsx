import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useContext } from 'react'
import { LanguageContext } from './context/LanguageContext'
import { ConfigProvider } from 'antd'
import Navbar from './components/common/Navbar'
import AppRouter from './routes/AppRouter'
function App() {
  const { language } = useContext(LanguageContext)
  return (
    <ConfigProvider direction={language === 'fa' ? 'rtl' : 'ltr'}>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </ConfigProvider>
  )
}

export default App
