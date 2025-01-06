import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { LanguageContext } from './LanguageContext'
import i18n from '../i18n'

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fa')

  const changeLanguage = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    document.body.setAttribute('data-language', lang)
  }

  useEffect(() => {
    i18n.changeLanguage(language)
    document.body.setAttribute('data-language', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
