import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  relativeRange
} from '@gblx/utils/math'
import {
  Dashicon
} from '@wordpress/components'

const Blurb = ({
  fontSize,
  blockQuote,
  brightness,
  children
}) => (
  <p 
    className={classNames(
      'gblx-widget-columns__blurb',
      { 'is-quote': blockQuote }
    )}
    style={{
      fontSize,
      color: `hsl(0, 0%, ${brightness}%)`
    }}>
    { blockQuote ? 
      <span style={{ 
        color: `hsl(0, 0%, ${relativeRange(65, 90, 100 - brightness)}%)` 
      }}>
        <Dashicon 
          size={35} 
          className="gblx-widget-columns__blurb__quote-icon"
          icon="format-quote" /> 
      </span>
      : null 
    }
    {children}
  </p>
)

Blurb.propTypes = {
  fontSize: PropTypes.number,
  blockQuote: PropTypes.bool,
  brightness: PropTypes.number
}

export default Blurb