import PropTypes from 'prop-types'

const Caption = ({
  fontSize,
  brightness,
  children
}) => (
  <p 
    className="gblx-widget-columns__caption"
    style={{
      fontSize,
      color: `hsl(0, 0%, ${brightness}%)`
    }}>
    {children}
  </p>
)

Caption.propTypes = {
  fontSize: PropTypes.number,
  brightness: PropTypes.number
}

export default Caption