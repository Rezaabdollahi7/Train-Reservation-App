import { Input, Select, Button, Checkbox, Rate } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select
const AMENITIES_OPTIONS = ['Wi-Fi', 'Food', 'Power Outlet', 'Air Conditioning']

const Aside = ({ filters, onFilterChange, onApplyFilter, companies }) => {
  const onAmenitiesChange = (checkedValues) => {
    onFilterChange('amenities', checkedValues)
  }

  const onRatingChange = (value) => {
    onFilterChange('minRating', value)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky">
      {/* Passengers */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mb-2">
          مسافران
        </label>
        <Select
          style={{ width: '100%' }}
          placeholder="تعداد مسافران"
          value={filters.passengers}
          onChange={(value) => onFilterChange('passengers', value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <Option key={num} value={num}>
              {num} مسافر{num > 1 ? 's' : ''}
            </Option>
          ))}
        </Select>
      </div>

      {/* Company */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mt-6 mb-2">
          تعاونی
        </label>
        <Select
          style={{ width: '100%' }}
          placeholder="تعاونی"
          value={filters.company}
          onChange={(value) => onFilterChange('company', value)}
        >
          <Option value="">تمام تعاونی ها</Option>
          {companies.map((company) => (
            <Option key={company} value={company}>
              {company}
            </Option>
          ))}
        </Select>
      </div>

      {/* Amenities as Checkboxes */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mt-6 mb-2">
          امکانات
        </label>
        <Checkbox.Group
          options={AMENITIES_OPTIONS}
          value={filters.amenities}
          onChange={onAmenitiesChange}
          className="flex my-2 gap-2"
        />
      </div>

      {/* Min Rating as Stars */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mt-6 mb-2">
          حداقل امتیاز
        </label>
        <Rate
          value={filters.minRating || 0}
          onChange={onRatingChange}
          allowClear={false}
          className="text-lg"
        />
      </div>

      {/* Max Discount */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mt-6 mb-2">
          حداکثر قیمت
        </label>
        <Input
          type="number"
          placeholder="مثلا 200000"
          value={filters.maxDiscount}
          onChange={(e) =>
            onFilterChange(
              'maxDiscount',
              e.target.value ? Number(e.target.value) : null
            )
          }
          min={0}
          className="w-full"
        />
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-brightGray mt-6 mb-2">
          مرتب سازی
        </label>
        <Select
          style={{ width: '100%' }}
          placeholder="مرتب سازی بر اساس"
          value={filters.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        >
          <Option value="priceAsc">کمترین قیمت</Option>
          <Option value="departureDate">زودترین حرکت</Option>
          <Option value="priceDesc">بیشترین قیمت</Option>
          <Option value="ratingDesc">بیشترین رضایت</Option>
          <Option value="discountDesc">بیشترین ظرفیت</Option>
        </Select>
      </div>

      {/* Apply Filter Button */}
      <Button
        type="primary"
        onClick={onApplyFilter}
        className="w-full bg-bluePurple hover:bg-softBlue text-white font-semibold"
      >
        اعمال فیلتر
      </Button>
    </div>
  )
}

Aside.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Aside
