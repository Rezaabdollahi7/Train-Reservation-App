import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/icons/train-icon.svg'
import { auth, onAuthStateChanged } from '../../firebase/firebase-config'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const { t } = useTranslation()

  const navLinks = [
    { to: '/', label: 'صفحه اصلی' },
    { to: '/tickets', label: 'خرید بلیط' },
    { to: '/refund', label: 'استرداد بلیط' },
    { to: '/cancellation', label: 'کنسلی' },
    { to: '/about', label: 'درباره ما' },
    { to: '/contact', label: 'ارتباط با ما' },
  ]

  const authLinks = [
    {
      to: '/login',
      label: 'ورود',
      className:
        'text-brightGray bg-fuelYellow/90 hover:bg-fuelYellow/80  font-semibold px-6 py-2 rounded-full transition-all ',
    },
    {
      to: '/signup',
      label: 'ثبت‌نام',
      className:
        'px-6 py-2 text-white bg-success hover:bg-success/80 font-semibold transition-all  rounded-full ',
    },
  ]

  return (
    <nav className="bg-white shadow-md w-full  ">
      <div className="container mx-auto px-4 w-4/5">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="h-12 w-12" />
            <span className="ml-3 lg:heading-1 text-softBlue font-semibold">
              {t('swift-rail')}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-8 text-midGray">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-brightGray hover:text-softBlue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-neutrals3">به سایتمون خوش اومدی!</span>
                <button
                  onClick={() => auth.signOut()}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 transition-all text-white rounded-full heading-3"
                >
                  خروج
                </button>
              </div>
            ) : (
              authLinks.map((link, index) => (
                <Link key={index} to={link.to} className={link.className}>
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-8 mt-4 pb-8 items-start">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-brightGray hover:text-softBlue transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="log-sign-wrapper flex gap-4 justify-center items-center w-full">
                <LanguageSwitcher />
                {user ? (
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-neutrals3">
                      به سایتمون خوش اومدی!
                    </span>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 transition-all text-white rounded-full heading-3"
                    >
                      خروج
                    </button>
                  </div>
                ) : (
                  authLinks.map((link, index) => (
                    <Link key={index} to={link.to} className={link.className}>
                      {link.label}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
