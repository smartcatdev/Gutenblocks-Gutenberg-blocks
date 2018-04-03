import PropTypes from 'prop-types'

const Content = ({ children, fontSize }) => (
  <div
    className="gblx-colour-cta__content"
    style={{ fontSize: `${fontSize}px` }}>
    {children}
  </div>
)

Content.propTypes = {
  fontSize: PropTypes.number
}

export default Content