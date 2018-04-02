import PropTypes from 'prop-types'
import classNames from 'classnames'

const Column = ({
  background,
  padding,
  margin,
  children,
  className
}) => (
  <div 
    className={classNames(
      'gblx-widget-columns__column', 
      `gblx-widget-columns__column__${className}`
    )}
    style={{
      background,
      padding: `${padding}px`,
      margin: `${margin}px`
    }}>
    {children}
  </div>
)

Column.propTypes = {
  margin: PropTypes.number,
  background: PropTypes.string
}

export default Column