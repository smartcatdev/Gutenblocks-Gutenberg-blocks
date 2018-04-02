import PropTypes from 'prop-types'
import classNames from 'classnames'

const Column = ({
  background,
  margin,
  children,
  className
}) => (
  <div 
    className={classNames('gblx-widget-columns__column', className)}
    style={{
      background,
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