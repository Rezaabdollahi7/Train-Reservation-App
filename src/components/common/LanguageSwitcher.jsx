import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '../../context/LanguageContext'
import { Select } from 'antd'
import { FaFlagUsa, FaFlag } from 'react-icons/fa'

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
      className="language-switcher"
    >
      <Option value="fa">
        <div className="flex items-center gap-2">
          <FaFlag className="text-xl text-green-600" /> <span>فارسی</span>
        </div>
      </Option>
      <Option value="en">
        <div className="flex items-center gap-2">
          <FaFlagUsa className="text-xl text-blue-600" />
          <span>English</span>
        </div>
      </Option>
    </Select>
  )
}

export default LanguageSwitcher
