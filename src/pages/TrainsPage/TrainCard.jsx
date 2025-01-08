import PropTypes from 'prop-types'
import { Card, Typography, Tag, Badge, Tooltip } from 'antd'
import { BsTrainFreightFrontFill } from 'react-icons/bs'
import { Rate } from 'antd'
import dayjs from 'dayjs'
import jalaliPlugin from '@zoomit/dayjs-jalali-plugin'
import { IoTrainSharp } from 'react-icons/io5'

dayjs.extend(jalaliPlugin)
const { Text } = Typography

const calculateArrivalTime = (departureTime, duration) => {
  const departure = dayjs(departureTime, 'hh:mm A')
  const arrival = departure.add(duration, 'hour')
  return arrival.format('hh:mm A')
}

const TrainCard = ({ train }) => {
  const arrivalTime = calculateArrivalTime(train.departureTime, train.duration)

  return (
    <Card className="mb-6 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="flex flex-col justify-center items-start relative pb-4">
        <div className="top-section flex justify-between items-center w-full p-5 bg-[#02314a]">
          <div className="company-section flex items-center gap-2 text-white font-semibold">
            <BsTrainFreightFrontFill className="text-white h-6 w-6" />
            <span className="mt-1">{train.company}</span>
          </div>
          <div className="state-type flex items-center gap-2">
            <Rate disabled defaultValue={train.rating} />
            <span className="text-green-500 font-medium bg-[#ecfee4] px-3 py-1 rounded-lg">
              {train.seatType}
            </span>
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
              title="Travel Duration"
              className="flex justify-center items-center"
            >
              <p className="absolute -top-2 flex items-center gap-2 text-[#fdba09] bg-[#fff1ce] px-4 rounded-lg py-1 font-medium">
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
  }).isRequired,
}

export default TrainCard
