import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import 'antd/dist/reset.css'
import { LanguageProvider } from './context/LanguageProvider'
import './assets/fonts/fonts.css'
import './i18n'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
)
