import PropTypes from 'prop-types'
import classNames from 'classnames'

const Callout = ({ 
  children, 
  accentColor, 
  fontSize, 
  showBackground, 
  color, 
  border, 
  borderRadius, 
  transformText, 
  margin,
  padding 
}) => (
  <div
    className="callout"
    style={{
      color: accentColor,
      padding: `0 ${padding}px`,
      margin: `auto ${margin}px`,
      fontSize: `${fontSize}px`,
      borderRadius: `${borderRadius}px`,
      border: `${border}px solid ${accentColor}`,
      background: showBackground ? color : 'transparent',
      textTransform: transformText ? 'uppercase': 'inherit'
    }}>
    {children}
  </div>
)

Callout.propTypes = {
  color: PropTypes.string,
  accentColor: PropTypes.string,
  padding: PropTypes.number,
  margin: PropTypes.number,
  fontSize: PropTypes.number,
  borderRadius: PropTypes.number,
  border: PropTypes.number,
  showBackground: PropTypes.bool,
  textTransform: PropTypes.bool
}

export default Callout