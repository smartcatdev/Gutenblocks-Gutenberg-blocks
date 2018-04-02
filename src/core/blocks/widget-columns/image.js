import PropTypes from 'prop-types'

const Image = ({
  src
}) => (
  <div className="gblx-widget-columns__image">
    <img src={src} />
  </div>
)

Image.propTypes = {
  src: PropTypes.string
}

export default Image