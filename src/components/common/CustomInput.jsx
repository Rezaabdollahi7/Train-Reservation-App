import { Input } from 'antd'
import PropTypes from 'prop-types'

const CustomInput = ({
  icon,
  placeholder,
  type,
  value,
  onChange,
  required,
}) => (
  <Input
    size="large"
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    prefix={icon}
    className="bg-white p-2 w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm lg:text-base sm:leading-6 rtl-input"
  />
)

CustomInput.propTypes = {
  icon: PropTypes.node.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

export default CustomInput
