import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/train-icon.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        'text-neutrals3 heading-3 outline outline-1 outline-neutrals6 px-6 py-2 rounded-full',
    },
    {
      to: '/signin',
      label: 'ثبت‌نام',
      className:
        'px-6 py-2 bg-primary1 hover:bg-primary1-75 transition-all text-yellow-50 rounded-full heading-3',
    },
  ]

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 w-4/5">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="h-12 w-12" />
            <span className="ml-3 lg:heading-1 text-neutrals3">سوئیفت ریل</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-8 text-gray-600">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-neutrals4 hover:text-neutrals2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            {authLinks.map((link, index) => (
              <Link key={index} to={link.to} className={link.className}>
                {link.label}
              </Link>
            ))}
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
                  className="text-neutrals4 hover:text-neutrals2"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="log-sign-wrapper flex gap-4 justify-center items-center w-full">
                {authLinks.map((link, index) => (
                  <Link key={index} to={link.to} className={link.className}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
