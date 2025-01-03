import PropTypes from 'prop-types'

const AuthButton = ({ icon, text, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
  >
    {icon}
    <span className="text-sm font-semibold leading-6">{text}</span>
  </button>
)

AuthButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default AuthButton
