import { useState } from 'react'
import { Input, Select, DatePicker, Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select

const TrainFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: null,
    passengers: 1,
  })

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value })
  }

  const handleFilter = () => {
    onFilter(filters)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <Row gutter={16}>
        <Col span={6}>
          <Input
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </Col>
        <Col span={6}>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Departure Date"
            value={filters.departureDate}
            onChange={(date) => handleInputChange('departureDate', date)}
          />
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Passengers"
            value={filters.passengers}
            onChange={(value) => handleInputChange('passengers', value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Option key={num} value={num}>
                {num} Passenger{num > 1 ? 's' : ''}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleFilter}
          >
            Search
          </Button>
        </Col>
      </Row>
    </div>
  )
}
TrainFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
}
export default TrainFilter
