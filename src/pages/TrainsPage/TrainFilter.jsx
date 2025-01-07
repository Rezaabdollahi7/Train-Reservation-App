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
    sortBy: 'departureDate',
    company: '',
    amenities: [],
    minRating: null,
    maxDiscount: null,
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
        <Col span={4}>
          <Input
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Input
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </Col>
        <Col span={4}>
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
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Amenities"
            value={filters.amenities}
            onChange={(value) => handleInputChange('amenities', value)}
          >
            <Option value="Wi-Fi">Wi-Fi</Option>
            <Option value="Food">Food</Option>
            <Option value="Power Outlet">Power Outlet</Option>
            <Option value="Air Conditioning">Air Conditioning</Option>
          </Select>
        </Col>
        <Col span={4}>
          <Input
            type="number"
            placeholder="Min Rating"
            value={filters.minRating}
            onChange={(e) =>
              handleInputChange(
                'minRating',
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={1}
            max={5}
          />
        </Col>
        <Col span={4}>
          <Input
            type="number"
            placeholder="Max Discount"
            value={filters.maxDiscount}
            onChange={(e) =>
              handleInputChange(
                'maxDiscount',
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
            max={100}
          />
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
            <Option value="ratingDesc">Rating: High to Low</Option>
            <Option value="discountDesc">Discount: High to Low</Option>
          </Select>
        </Col>
        <Col span={2}>
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
