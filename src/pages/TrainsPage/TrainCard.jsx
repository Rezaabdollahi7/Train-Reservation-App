import PropTypes from 'prop-types'
import { Card, Typography, Button } from 'antd'

const { Title, Text } = Typography

const TrainCard = ({ train }) => {
  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} className="mb-2">
            {train.trainName}
          </Title>
          <Text strong>From:</Text> {train.origin} <br />
          <Text strong>To:</Text> {train.destination} <br />
          <Text strong>Departure:</Text> {train.departureDate} at{' '}
          {train.departureTime} <br />
          <Text strong>Available Seats:</Text> {train.availableSeats} <br />
          <Text strong>Price:</Text> {train.price.toLocaleString()} تومان <br />
          <Text strong>Duration:</Text> {train.duration} <br />
          <Text strong>Seat Type:</Text> {train.seatType}
        </div>
        <Button type="primary" size="large">
          Select
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
    duration: PropTypes.string.isRequired,
    seatType: PropTypes.string.isRequired,
  }).isRequired,
}

export default TrainCard
