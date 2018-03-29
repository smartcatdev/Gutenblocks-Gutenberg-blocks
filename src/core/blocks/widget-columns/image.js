import PropTypes from 'prop-types'

const Image = ({
  src
}) => (
  <div className="gblx-widget-columns__image">
    <div className="gblx-widget-columns__image__centered">
      <img src={src} />
    </div>
  </div>
)

Image.propTypes = {
  src: PropTypes.string
}

export default Image