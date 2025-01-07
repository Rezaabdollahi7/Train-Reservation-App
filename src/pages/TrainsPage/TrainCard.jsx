import PropTypes from 'prop-types'
import { Card, Typography, Button, Tag } from 'antd'

const { Title, Text } = Typography

const TrainCard = ({ train }) => {
  return (
    <Card
      className="
        mb-6 
        rounded-lg 
        overflow-hidden 
        shadow-md 
        hover:shadow-lg 
        transition-shadow 
        border-l-8 border-fuelYellow 
        bg-white 
        p-6
      "
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* بخش اطلاعات قطار */}
        <div className="md:mr-4">
          <Title level={4} className="mb-2 text-brightGray">
            {train.trainName}
          </Title>

          <div className="mb-2">
            <Text strong className="text-midGray">
              مبدا:
            </Text>{' '}
            <span className="text-purpleHaze">{train.origin}</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              مقصد:
            </Text>{' '}
            <span className="text-purpleHaze">{train.destination}</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              تاریخ حرکت:
            </Text>{' '}
            <span className="text-midGray">{train.departureDate}</span> ساعت{' '}
            <span className="text-midGray">{train.departureTime}</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              ظرفیت باقیمانده:
            </Text>{' '}
            <span className="text-midGray">{train.availableSeats}</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              قیمت:
            </Text>{' '}
            <span className="text-midGray">
              {train.price.toLocaleString()} تومان
            </span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              مدت سفر:
            </Text>{' '}
            <span className="text-midGray">{train.duration} ساعت</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              نوع صندلی:
            </Text>{' '}
            <span className="text-midGray">{train.seatType}</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              امکانات:
            </Text>{' '}
            {train.amenities.map((amenity, index) => (
              <Tag key={index} className="bg-info text-white border-none m-1">
                {amenity}
              </Tag>
            ))}
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              امتیاز:
            </Text>{' '}
            <span className="text-success">{train.rating} / 5</span>
          </div>

          <div className="mb-2">
            <Text strong className="text-midGray">
              تخفیف:
            </Text>{' '}
            <span className="text-error">{train.discount}%</span>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="
            bg-fuelYellow 
            border-fuelYellow 
            hover:bg-opacity-90 
            hover:border-fuelYellow 
            text-white 
            mt-4 
            md:mt-0
          "
        >
          انتخاب
        </Button>
      </div>
    </Card>
  )
}

TrainCard.propTypes = {
  train: PropTypes.shape({
    trainName: PropTypes.string.isRequired,
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
