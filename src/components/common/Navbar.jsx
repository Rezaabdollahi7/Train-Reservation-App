import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
} from '../../firebase/firebase-config'
import { doc, onSnapshot } from 'firebase/firestore'
import Logo from '../../assets/icons/train-icon.svg'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { Dropdown, Menu, Avatar, message, Badge } from 'antd'
import {
  LogoutOutlined,
  EditOutlined,
  ShoppingOutlined,
  HeartFilled,
} from '@ant-design/icons'
import { TbTicket } from 'react-icons/tb'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [purchasedTicketsCount, setPurchasedTicketsCount] = useState(0)
  const [favoritesTicketsCount, setfavoritesTicketsCountt] = useState(0)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)

        const userRef = doc(db, 'users', user.uid)
        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data()
            setCartCount(userData.tickets?.length || 0)
            setPurchasedTicketsCount(userData.purchasedTickets?.length || 0)
            setfavoritesTicketsCountt(userData.favorites?.length || 0)
          }
        })

        return () => unsubscribeFirestore()
      } else {
        setUser(null)
        setCartCount(0)
        setPurchasedTicketsCount(0)
        setfavoritesTicketsCountt(0)
      }
    })

    return () => unsubscribeAuth()
  }, [])

  const navLinks = [
    { to: '/', label: 'صفحه اصلی' },
    { to: '/tickets', label: 'خرید بلیط' },
    { to: '/refund', label: 'استرداد بلیط' },
    { to: '/cancellation', label: 'کنسلی' },
    { to: '/about', label: 'درباره ما' },
    { to: '/Support', label: 'ارتباط با ما' },
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

  const handleLogout = async () => {
    try {
      await signOut(auth)
      message.success('با موفقیت خارج شدید!')
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
      message.error('خطایی در هنگام خروج رخ داده است.')
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined style={{ fontSize: '18px' }} />}>
        <Link to="/EditProfile">ویرایش مشخصات</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<ShoppingOutlined style={{ fontSize: '18px' }} />}
      >
        <Link to="/cart">
          سبد خرید <Badge count={cartCount} className="text-error" />
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TbTicket style={{ fontSize: '18px' }} />}>
        <Link to="/purchased-tickets">
          بلیط‌ها{' '}
          <Badge
            count={purchasedTicketsCount}
            style={{ backgroundColor: '#52c41a' }}
          />
        </Link>
      </Menu.Item>

      <Menu.Item key="4" icon={<HeartFilled style={{ fontSize: '18px' }} />}>
        <Link to="/favorites">
          علاقه مندی ها{' '}
          <Badge
            count={favoritesTicketsCount}
            style={{ backgroundColor: '#52c41a' }}
          />
        </Link>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        key="5"
        icon={<LogoutOutlined style={{ fontSize: '16px' }} />}
        onClick={handleLogout}
      >
        خروج
      </Menu.Item>
    </Menu>
  )

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
                <Dropdown overlay={menu} placement="bottomRight">
                  <Avatar
                    size="large"
                    src={
                      user.photoURL ||
                      'https://cdn.alibaba.ir/h2/desktop/assets/images/avatar-4c776756.svg'
                    }
                    style={{ cursor: 'pointer' }}
                  />
                </Dropdown>
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
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons / User Dropdown */}
              <div className="log-sign-wrapper flex gap-4 justify-center items-center w-full">
                <LanguageSwitcher />
                {user ? (
                  <Dropdown overlay={menu} placement="bottomRight">
                    <div className="flex items-center gap-4 cursor-pointer">
                      <Avatar
                        size="large"
                        src={
                          user.photoURL ||
                          'https://cdn.alibaba.ir/h2/desktop/assets/images/avatar-4c776756.svg'
                        }
                      />
                      <span className="text-neutrals3">کاربر</span>
                    </div>
                  </Dropdown>
                ) : (
                  authLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className={link.className}
                      onClick={() => setIsOpen(false)}
                    >
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
