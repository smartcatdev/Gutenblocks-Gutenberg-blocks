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
  padding,
  href,
  editor
}) => (
  <a
    className={classNames(
      'gblx-colour-cta__callout', 
      { 'has-transform': transformText }
    )}
    href={href}
    style={{
      color: accentColor,
      padding: `0 ${padding}px`,
      margin: `auto ${margin}px`,
      fontSize: `${fontSize}px`,
      borderRadius: `${borderRadius}px`,
      border: `${border}px solid ${accentColor}`,
      background: showBackground ? color : 'transparent'
    }}>
    { !editor 
        ? <style jsx>{`
            a.callout:hover {
              background: ${color} !important
            }
          `}</style>
        : null }
    {children}
  </a>
)

Callout.propTypes = {
  href: PropTypes.string,
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