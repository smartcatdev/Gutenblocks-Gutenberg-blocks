import PropTypes from 'prop-types'

const Wrapper = ({
  spacing,
  children
}) => (
  <section 
    className="gblx-widget-columns"
    style={{
      marginBottom: `${spacing}px`
    }}>
    {children}
  </section>
)

Wrapper.propTypes = {
  spacing: PropTypes.number
}

export default Wrapper