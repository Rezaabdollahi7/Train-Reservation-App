import { useState } from 'react'
import { Input, Select, DatePicker, Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select

const TrainFilter = ({ onFilter, companies }) => {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: null,
    passengers: 1,
    sortBy: 'departureDate', // Default sorting by departure date
    company: '', // Filter by company
  })

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value })
  }

  const handleFilter = () => {
    onFilter(filters)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <Row gutter={16}>
        <Col span={5}>
          <Input
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
          />
        </Col>
        <Col span={5}>
          <Input
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </Col>
        <Col span={5}>
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
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Company"
            value={filters.company}
            onChange={(value) => handleInputChange('company', value)}
          >
            <Option value="">All Companies</Option>
            {companies.map((company) => (
              <Option key={company} value={company}>
                {company}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Sort By"
            value={filters.sortBy}
            onChange={(value) => handleInputChange('sortBy', value)}
          >
            <Option value="departureDate">Nearest Departure</Option>
            <Option value="priceAsc">Price: Low to High</Option>
            <Option value="priceDesc">Price: High to Low</Option>
          </Select>
        </Col>
        <Col span={1}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleFilter}
            className="w-full"
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
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TrainFilter
