import { useState, useEffect } from 'react'
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from '../../../firebase/firebase-config'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, message, Spin } from 'antd'
import { MdAlternateEmail } from 'react-icons/md'
import { TbPasswordFingerprint } from 'react-icons/tb'
import CustomInput from '../../../components/common/CustomInput'
import AuthButton from '../../../components/common/AuthButton'
import { FcGoogle } from 'react-icons/fc'
import { FaGithubSquare } from 'react-icons/fa'
import loginImg from '../../../assets/images/login2.jpg'
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../../../utils/validators'
import { getFirebaseErrorMessage } from '../../../utils/helpers'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remember, setRemember] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const validateForm = () => {
    if (!validateRequired(email) || !validateRequired(password)) {
      message.error('Please fill in all fields.')
      return false
    }
    if (!validateEmail(email)) {
      message.error('Please enter a valid email address.')
      return false
    }
    if (!validatePassword(password)) {
      message.error('Password must be at least 8 characters.')
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError('')
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      )

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log('User logged in:', user)
      message.success('ورود موفقیت‌آمیز بود!')
      navigate('/')
    } catch (error) {
      console.error('Error during login:', error)
      const userFriendlyMessage = getFirebaseErrorMessage(error)
      setError(userFriendlyMessage)
      message.error(userFriendlyMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (providerName) => {
    setIsLoading(true)
    setError('')
    let provider
    if (providerName === 'google') {
      provider = new GoogleAuthProvider()
    } else if (providerName === 'github') {
      provider = new GithubAuthProvider()
    } else {
      setError('روش ورود نامعتبر است.')
      message.error('روش ورود نامعتبر است.')
      setIsLoading(false)
      return
    }

    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      )

      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(`User logged in with ${providerName}:`, user)

      message.success(
        `ورود با ${providerName === 'google' ? 'گوگل' : 'گیت‌هاب'} موفقیت‌آمیز بود!`
      )
      navigate('/')
    } catch (error) {
      console.error(`Error during ${providerName} login:`, error)
      let userFriendlyMessage = getFirebaseErrorMessage(error)

      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email
        try {
          const methods = await auth.fetchSignInMethodsForEmail(email)

          if (methods.includes('password')) {
            userFriendlyMessage =
              'یک حساب با این ایمیل وجود دارد. لطفاً با ایمیل و رمز عبور وارد شوید.'
          } else if (methods.includes('google.com')) {
            userFriendlyMessage =
              'یک حساب با این ایمیل وجود دارد. لطفاً با گوگل وارد شوید.'
          } else {
            userFriendlyMessage =
              'یک حساب با این ایمیل وجود دارد. لطفاً با روش اصلی وارد شوید.'
          }
        } catch (fetchError) {
          console.error('Error fetching sign-in methods:', fetchError)
          userFriendlyMessage = 'خطایی در پردازش درخواست شما رخ داده است.'
        }
      }

      setError(userFriendlyMessage)
      message.error(userFriendlyMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (e) => {
    setRemember(e.target.checked)
  }

  return (
    <div className="flex min-h-full">
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover rounded-2xl"
          src={loginImg}
          alt="تصویر ورود"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ورود به سوئیفت ریل
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              عضو نیستید؟{' '}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                aria-label="رفتن به صفحه ثبت‌نام"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form
              onSubmit={handleLogin}
              className="space-y-9"
              aria-label="فرم ورود"
            >
              <CustomInput
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<MdAlternateEmail className="text-gray-500" />}
                aria-label="ایمیل"
              />
              <CustomInput
                placeholder="Password..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<TbPasswordFingerprint className="text-gray-500" />}
                aria-label="رمز عبور"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    onChange={onChange}
                    checked={remember}
                    aria-label="مرا به خاطر بسپار"
                  >
                    مرا به خاطر بسپار
                  </Checkbox>
                </div>
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  aria-label="فراموشی رمز عبور"
                >
                  فراموشی رمز عبور
                </Link>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                aria-label="ورود"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span>در حال ورود</span>
                    <Spin size="small" />
                  </div>
                ) : (
                  'ورود '
                )}
              </button>
            </form>

            <div className="mt-16">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-2 text-gray-500">
                    یا با استفاده از
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <AuthButton
                  icon={<FcGoogle className="h-5 w-5" />}
                  text="گوگل"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  aria-label="ورود با گوگل"
                />
                <AuthButton
                  icon={<FaGithubSquare className="h-5 w-5" />}
                  text="گیت‌هاب"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  aria-label="ورود با گیت‌هاب"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
