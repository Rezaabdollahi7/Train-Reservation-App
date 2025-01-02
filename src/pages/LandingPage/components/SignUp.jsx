import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from '../../../firebase/firebase-config'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    return true
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log('User registered:', user)
      alert('Registration successful!')
      navigate('/')
    } catch (error) {
      setError(error.message)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed up with Google:', user)
      alert('Google sign-up successful!')
      navigate('/')
    } catch (error) {
      setError(error.message)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignUp = async () => {
    setIsLoading(true)
    const provider = new GithubAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed up with GitHub:', user)
      alert('GitHub sign-up successful!')
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email
        const methods = await fetchSignInMethodsForEmail(auth, email)

        if (methods.includes('password')) {
          alert(
            'An account already exists with this email. Please sign in with your email and password.'
          )
        } else if (methods.includes('google.com')) {
          alert(
            'An account already exists with this email. Please sign in with Google.'
          )
        } else {
          alert(
            'An account already exists with this email. Please sign in with the original method.'
          )
        }
      } else {
        setError(error.message)
        alert(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up for SwiftRail
        </h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
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
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary1 text-white py-2 px-4 rounded-md hover:bg-primary1-75 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Google
            </button>
            <button
              onClick={handleGithubSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <img
                src="https://github.com/favicon.ico"
                alt="GitHub"
                className="h-5 w-5 mr-2"
              />
              GitHub
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-primary1 hover:text-primary1-75">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
