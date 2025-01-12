import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [nationalCode, setNationalCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userDocRef)
          if (userDoc.exists()) {
            const data = userDoc.data()
            setDisplayName(data.displayName || '')
            setPhotoURL(data.photoURL || '')
            setPhoneNumber(data.phoneNumber || '')
            setCardNumber(data.cardNumber || '')
            setNationalCode(data.nationalCode || '')
          } else {
            message.error('اطلاعات کاربری یافت نشد.')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          message.error('مشکلی در بارگذاری اطلاعات شما وجود دارد.')
        }
      } else {
        message.error('کاربر احراز هویت نشده است.')
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const validateProfile = () => {
    const phoneRegex = /^09[0-9]{9}$/
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      message.error(
        'شماره تماس نامعتبر است. شماره تماس باید با 09 شروع شود و 11 رقم داشته باشد.'
      )
      return false
    }

    const cardRegex = /^[0-9]{16}$/
    if (cardNumber && !cardRegex.test(cardNumber)) {
      message.error('شماره کارت باید شامل 16 رقم باشد.')
      return false
    }

    const nationalCodeRegex = /^[0-9]{10}$/
    if (nationalCode && !nationalCodeRegex.test(nationalCode)) {
      message.error('کد ملی باید شامل 10 رقم باشد.')
      return false
    }

    return true
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!validateProfile()) return
    setIsLoading(true)
    try {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        await updateDoc(userDocRef, {
          displayName,
          photoURL,
          phoneNumber,
          cardNumber,
          nationalCode,
        })

        await updateProfile(user, {
          displayName,
          photoURL,
        })

        message.success('مشخصات با موفقیت بروز شد!')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      message.error('بروز رسانی مشخصات با مشکل مواجه شد.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center mt-12 ">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">ویرایش مشخصات</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              نام نمایش
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="نام نمایش خود را وارد کنید"
            />
          </div>
          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700"
            >
              آدرس عکس پروفایل
            </label>
            <input
              type="text"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="آدرس عکس پروفایل خود را وارد کنید"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              شماره تماس
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="مثال: 09219811980"
            />
          </div>
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              شماره کارت
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="شماره کارت خود را وارد کنید"
            />
          </div>
          <div>
            <label
              htmlFor="nationalCode"
              className="block text-sm font-medium text-gray-700"
            >
              کد ملی
            </label>
            <input
              type="text"
              id="nationalCode"
              value={nationalCode}
              onChange={(e) => setNationalCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary1 focus:border-primary1"
              placeholder="کد ملی خود را وارد کنید"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-all disabled:opacity-50"
            aria-label="بروز رسانی"
          >
            {isLoading ? 'در حال بروز رسانی...' : 'بروز رسانی'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
