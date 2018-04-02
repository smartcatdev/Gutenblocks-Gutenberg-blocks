import PropTypes from 'prop-types'

const Content = ({ 
  padding,
  children
}) => (
  <div
    className="gblx-widget-columns__column__content"
    style={{
      padding: `0 ${padding}px`
    }}>
    {children}
  </div>
)

Content.propTypes = {
  padding: PropTypes.number
}

export default Content