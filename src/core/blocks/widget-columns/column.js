import PropTypes from 'prop-types'
import classNames from 'classnames'

const Column = ({
  margin,
  children,
  className
}) => (
  <div 
    className={classNames('gblx-widget-columns__column', className)}
    style={{
      margin: `${margin}px`
    }}>
    {children}
  </div>
)

Column.propTypes = {
  margin: PropTypes.number
}

export default Column