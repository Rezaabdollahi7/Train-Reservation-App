import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useContext } from 'react'
import { LanguageContext } from './context/LanguageContext'
import { ConfigProvider } from 'antd'
import Navbar from './components/common/Navbar'
import AppRouter from './routes/AppRouter'
import Layout from './components/Layout'

function App() {
  const { language } = useContext(LanguageContext)
  return (
    <ConfigProvider direction={language === 'fa' ? 'rtl' : 'ltr'}>
      <Router>
        <Navbar />
        <Layout fullWidth>
          <AppRouter />
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App
