import PropTypes from 'prop-types'

const Header = ({ children, fontSize }) => (
  <div
    className="gblx-colour-cta__header"
    style={{ fontSize: `${fontSize}px` }}>
    {children}
  </div>
)

Header.propTypes = {
  fontSize: PropTypes.number
}

export default Header