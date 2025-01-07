import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '../../context/LanguageContext'
import { Select } from 'antd'
import iranFlag from '../../assets/icons/iran.png'
import englandFlag from '../../assets/icons/england.avif'

const { Option } = Select

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useContext(LanguageContext)
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    changeLanguage(lang)
    document.body.setAttribute('data-language', lang)
  }

  return (
    <Select
      defaultValue={language}
      style={{ width: 140 }}
      onChange={handleLanguageChange}
      className="language-switcher h-9"
    >
      <Option value="fa">
        <div className="flex items-center gap-2">
          <img src={iranFlag} className="w-6 h-6" /> <span>فارسی</span>
        </div>
      </Option>
      <Option value="en">
        <div className="flex items-center gap-2">
          <img src={englandFlag} className="w-6 h-6" /> <span>English</span>
        </div>
      </Option>
    </Select>
  )
}

export default LanguageSwitcher
