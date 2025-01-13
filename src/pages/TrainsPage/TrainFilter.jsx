import { useState } from 'react'
import { Input, DatePicker, Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const TrainFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: null,
  })

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value })
  }

  const handleFilter = () => {
    onFilter(filters)
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mb-6">
      <Row gutter={[16, 16]} className="items-end">
        {/* Origin */}
        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium text-brightGray ">
            مبدا
          </label>
          <Input
            size="large"
            placeholder="مبدا ( شهر )"
            value={filters.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
            className="w-full"
          />
        </Col>

        {/* Destination */}
        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium text-brightGray ">
            مقصد
          </label>
          <Input
            size="large"
            placeholder="مقصد ( شهر ) "
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="w-full"
          />
        </Col>

        {/* Departure Date */}
        <Col xs={24} sm={12} md={6}>
          <label className="block text-sm font-medium text-brightGray ">
            تاریخ حرکت
          </label>
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            placeholder="انتخاب تاریخ"
            value={filters.departureDate}
            onChange={(date) => handleInputChange('departureDate', date)}
          />
        </Col>

        {/* Search Button */}
        <Col xs={24} sm={12} md={6}>
          <Button
            size="large"
            icon={<SearchOutlined />}
            onClick={handleFilter}
            className="w-full bg-selectiveYellow hover:bg-fuelYellow text-black font-semibold"
          >
            جستجو
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
