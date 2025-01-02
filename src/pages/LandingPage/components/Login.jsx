// src/components/Login.js
import { useState } from 'react'
import {
  auth,
  signInWithEmailAndPassword,
} from '../../../firebase/firebase-config'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log('User logged in:', user)
      alert('ورود موفقیت‌آمیز بود!')
      navigate('/') // هدایت کاربر به صفحه‌ی اصلی پس از لاگین
    } catch (error) {
      setError(error.message)
      alert(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ورود به سوئیفت ریل
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              آدرس ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              پسورد
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="رمز عبور"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary1 text-white py-2 px-4 rounded-md hover:bg-primary1-75 transition-all"
          >
            ورود
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          عضو نیستید؟{' '}
          <Link to="/signup" className="text-primary1 hover:text-primary1-75">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
