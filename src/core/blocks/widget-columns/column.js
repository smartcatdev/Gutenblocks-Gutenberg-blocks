import PropTypes from 'prop-types'
import classNames from 'classnames'

const Column = ({
  children,
  className
}) => (
  <div className={classNames('gblx-widget-columns__column', className)}>
    {children}
  </div>
)

Column.propTypes = {

}

export default Column