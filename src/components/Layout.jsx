import PropTypes from 'prop-types'

const Layout = ({ children, fullWidth = false }) => {
  return (
    <div
      className={
        fullWidth ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'
      }
    >
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
}

export default Layout
