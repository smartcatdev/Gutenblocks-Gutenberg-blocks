import PropTypes from 'prop-types'

const Header = ({ children, fontSize }) => (
  <div
    className="header"
    style={{ 
      fontSize: `${fontSize}px`,
      lineHeight: `${fontSize}px`, 
    }}>
    {children}
  </div>
)

Header.propTypes = {
  fontSize: PropTypes.number
}

export default Header