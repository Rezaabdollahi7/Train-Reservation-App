import PropTypes from 'prop-types'
import { Card, Typography, Tag, Badge, Tooltip } from 'antd'
import { BsTrainFreightFrontFill } from 'react-icons/bs'
import { Rate, Button, message } from 'antd'
import dayjs from 'dayjs'
import jalaliPlugin from '@zoomit/dayjs-jalali-plugin'
import { IoTrainSharp } from 'react-icons/io5'
import { db, auth } from '../../firebase/firebase-config'
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

dayjs.extend(jalaliPlugin)
const { Text } = Typography

const calculateArrivalTime = (departureTime, duration) => {
  const departure = dayjs(departureTime, 'hh:mm A')
  const arrival = departure.add(duration, 'hour')
  return arrival.format('hh:mm A')
}

const TrainCard = ({ train }) => {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const favorites = doc.data().favorites || []
          setIsFavorite(favorites.includes(train.id))
        }
      })
    }
  }, [user, train.id])

  const toggleFavorite = async () => {
    if (!user) {
      message.error('لطفاً ابتدا وارد شوید!')
      navigate('/login')
      return
    }

    try {
      const userRef = doc(db, 'users', user.uid)
      if (isFavorite) {
        await updateDoc(userRef, {
          favorites: arrayRemove(train.id),
        })
        setIsFavorite(false)
        message.success('قطار از لیست علاقه‌مندی‌ها حذف شد!')
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(train.id),
        })
        setIsFavorite(true)
        message.success('قطار به لیست علاقه‌مندی‌ها اضافه شد!')
      }
    } catch (error) {
      console.error('Error updating favorites:', error)
      message.error('خطایی در به‌روزرسانی لیست علاقه‌مندی‌ها رخ داد.')
    }
  }

  const arrivalTime = calculateArrivalTime(train.departureTime, train.duration)

  const addToCart = async () => {
    const user = auth.currentUser
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          tickets: arrayUnion(train),
        })
        message.success('قطار به سبد خرید اضافه شد!')
      } catch (error) {
        console.error('Error adding train to cart:', error)
        message.error('خطایی در اضافه کردن قطار به سبد خرید رخ داد.')
      }
    } else {
      message.error('لطفاً ابتدا وارد شوید!')
      navigate('/login')
    }
  }

  return (
    <Card className="mb-6 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="flex flex-col justify-center items-start relative pb-4">
        <div className="top-section flex justify-between items-center w-full p-5 bg-[#02314a]">
          <div className="company-section flex items-center gap-2 text-white font-semibold">
            <BsTrainFreightFrontFill className="text-white h-6 w-6" />
            <span className="mt-1">{train.company}</span>
          </div>
          <div className="state-type flex items-center gap-2">
            <Tooltip title="میزان رضایت ">
              <Rate
                disabled
                className="bg-purpleHaze/50 px-2 py-1 rounded-2xl"
                defaultValue={train.rating}
              />
            </Tooltip>

            <Tooltip title="افزودن به علاقه‌مندی‌ها">
              <Button
                type="text"
                icon={
                  isFavorite ? (
                    <HeartFilled style={{ color: 'red', fontSize: '24px' }} />
                  ) : (
                    <HeartOutlined
                      style={{ fontSize: '24px', color: 'white' }}
                    />
                  )
                }
                onClick={toggleFavorite}
              />
            </Tooltip>
            <Tooltip title="کلاس قظار ">
              <span className="text-green-500 font-medium bg-[#ecfee4] px-3 py-1 rounded-lg hover:cursor-default">
                {train.seatType}
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="middle-section flex justify-between items-center w-full my-5 px-5">
          <div className="origin-section flex flex-col justify-center items-center">
            <div className="start-time mt-1 text-brightGray font-bold text-3xl">
              {train.departureTime}
            </div>
            <span className="text-softBlue font-semibold">{train.origin}</span>
          </div>

          <div className="duration-time flex justify-center items-center relative">
            <Tooltip
              title="طول مسیر "
              className="flex justify-center items-center"
            >
              <p className="absolute -top-2 flex items-center gap-2 text-[#fdba09] bg-[#fff1ce] px-4 rounded-lg py-1 font-medium hover:cursor-default">
                <IoTrainSharp className="w-5 h-5" />
                {train.duration} ساعت
              </p>
              <span className="w-4 h-4 bg-info rounded-full"></span>
              <span className="w-64 h-[1px] bg-gray-200"></span>
              <span className="w-4 h-4 bg-white border border-info rounded-full"></span>
            </Tooltip>
          </div>

          <div className="destination-section flex flex-col justify-center items-center">
            <div className="start-time mt-1 text-brightGray font-bold text-3xl">
              {arrivalTime}
            </div>
            <span className="text-softBlue font-semibold">
              {train.destination}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full px-6 my-3">
          <div className="mb-2">
            <Text strong className="text-midGray">
              امکانات :
            </Text>{' '}
            {train.amenities.map((amenity, index) => (
              <Tag
                key={index}
                className="bg-gray-100 text-gray-500 border-none m-1 rounded-xl px-3"
              >
                {amenity}
              </Tag>
            ))}
          </div>
          <div className="mb-2">
            <Text strong className="text-midGray">
              تاریخ حرکت :
            </Text>{' '}
            <span className="text-midGray font-medium">
              {train.departureDate}
            </span>
          </div>
        </div>

        <div className="bottom-section flex justify-between items-center w-full mt-3 pt-3 border-t px-8">
          <div className="count bg-gray-100 px-2 py-1 rounded-lg">
            <Text strong className="text-midGray">
              ظرفیت باقی مانده:
            </Text>{' '}
            <span className="text-midGray">{train.availableSeats}</span>
          </div>
          <div className="price flex items-center gap-2">
            <Badge count={`% ${train.discount}`} />
            <span className="text-brightGray font-bold text-xl">
              {train.price.toLocaleString()} تومان
            </span>
          </div>
        </div>
        <Button
          onClick={addToCart}
          className="mx-auto bg-success font-semibold text-white"
        >
          اضافه کردن به سبد خرید
        </Button>
      </div>
    </Card>
  )
}

TrainCard.propTypes = {
  train: PropTypes.shape({
    trainName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    departureDate: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    availableSeats: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    seatType: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default TrainCard
