import { useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from '../../../firebase/firebase-config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { Checkbox, message, Spin } from 'antd'
import { MdAlternateEmail } from 'react-icons/md'
import { TbPasswordFingerprint } from 'react-icons/tb'
import CustomInput from '../../../components/common/CustomInput'
import AuthButton from '../../../components/common/AuthButton'
import { FcGoogle } from 'react-icons/fc'
import { FaGithubSquare } from 'react-icons/fa'
import loginImg from '../../../assets/images/login2.jpg'
import { db } from '../../../firebase/firebase-config'
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../../../utils/validators'
import { getFirebaseErrorMessage } from '../../../utils/helpers'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remember, setRemember] = useState(false)

  const navigate = useNavigate()

  const validateForm = useCallback(() => {
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
  }, [email, password])

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      )

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: '',
        photoURL: '',
        createdAt: new Date(),
        tickets: [],
        phoneNumber: '',
        cardNumber: '',
        nationalCode: '',
      })

      message.success('ثبت‌نام موفقیت‌آمیز بود!')
      navigate('/')
    } catch (error) {
      console.error('Error during sign up:', error)
      const userFriendlyMessage = getFirebaseErrorMessage(error)
      message.error(userFriendlyMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      )

      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
          tickets: [],
          phoneNumber: '',
          cardNumber: '',
          nationalCode: '',
        })
      }

      message.success('ثبت‌نام با گوگل موفقیت‌آمیز بود!')
      navigate('/')
    } catch (error) {
      console.error('Error during Google sign up:', error)
      const userFriendlyMessage = getFirebaseErrorMessage(error)
      message.error(userFriendlyMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignUp = async () => {
    setIsLoading(true)
    const provider = new GithubAuthProvider()
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      )

      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
          tickets: [],
          phoneNumber: '',
          cardNumber: '',
          nationalCode: '',
        })
      }

      message.success('ثبت‌نام با گیت‌هاب موفقیت‌آمیز بود!')
      navigate('/')
    } catch (error) {
      console.error('Error during GitHub sign up:', error)
      if (error.code === 'auth/account-exists-with-different-credential') {
        try {
          const email = error.customData.email
          const methods = await fetchSignInMethodsForEmail(auth, email)

          if (methods.includes('password')) {
            message.warning(
              'یک حساب با این ایمیل وجود دارد. لطفاً با ایمیل و رمز عبور وارد شوید.'
            )
          } else if (methods.includes('google.com')) {
            message.warning(
              'یک حساب با این ایمیل وجود دارد. لطفاً با گوگل وارد شوید.'
            )
          } else {
            message.warning(
              'یک حساب با این ایمیل وجود دارد. لطفاً با روش اصلی وارد شوید.'
            )
          }
        } catch (fetchError) {
          console.error('Error fetching sign-in methods:', fetchError)
          const userFriendlyMessage = getFirebaseErrorMessage(fetchError)
          message.error(userFriendlyMessage)
        }
      } else {
        const userFriendlyMessage = getFirebaseErrorMessage(error)
        message.error(userFriendlyMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (e) => {
    setRemember(e.target.checked)
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ثبت نام در سوئیفت ریل
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              عضو هستی؟{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                aria-label="رفتن به صفحه لاگین"
              >
                بریم لاگین کنیم
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form
              onSubmit={handleSignUp}
              className="space-y-9"
              aria-label="فرم ثبت نام"
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
                placeholder="Password ... "
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
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                aria-label="ثبت نام"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span>در حال ثبت‌نام</span>
                    <Spin size="small" />
                  </div>
                ) : (
                  'ثبت نام'
                )}
              </button>
            </form>

            <div className="mt-12">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    ثبت نام با
                  </span>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <AuthButton
                  icon={<FcGoogle className="h-5 w-5" />}
                  text="Google"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  aria-label="ثبت نام با گوگل"
                />
                <AuthButton
                  icon={<FaGithubSquare className="h-5 w-5" />}
                  text="GitHub"
                  onClick={handleGithubSignUp}
                  disabled={isLoading}
                  aria-label="ثبت نام با گیت‌هاب"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover rounded-2xl"
          src={loginImg}
          alt="تصویر ورود"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default SignUp
