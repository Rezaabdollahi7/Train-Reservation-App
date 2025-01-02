// src/components/SignUp.js
import { useState } from 'react'
import {
  auth,
  createUserWithEmailAndPassword,
} from '../../../firebase/firebase-config'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log('User registered:', user)
      alert('ثبت‌نام موفقیت‌آمیز بود!')
    } catch (error) {
      setError(error.message)
      alert(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ثبت‌نام در سوئیفت ریل
        </h2>
        <form onSubmit={handleSignUp} className="space-y-6">
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
            ثبت‌نام
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          عضو هستید؟{' '}
          <a href="/login" className="text-primary1 hover:text-primary1-75">
            وارد شوید
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
