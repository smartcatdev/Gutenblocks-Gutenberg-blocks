import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  relativeRange
} from '@gblx/utils/math'

const Wrapper = ({ 
  children, 
  backgroundColor, 
  fixedBackground, 
  textAlignment, 
  textBrightness, 
  overlayColor, 
  overlayOpacity, 
  verticalAlignment,
  verticalPadding,
  horizontalPadding 
}) => (
  <section 
    className={classNames('gblx-colour-cta', {
      'has-parallax': fixedBackground,
      'has-left-alignment': textAlignment === 'left',
      'has-right-alignment': textAlignment === 'right',
    })} 
    style={{     
      background: backgroundColor, 
      color: `hsl(0, 0%, ${textBrightness}%)`,
      padding: `${verticalPadding}px ${horizontalPadding}px`
    }}>
    <div 
      className="gblx-colour-cta__inner"
      style={{
        top: `${-(relativeRange(-100, 100, verticalAlignment))}px`
      }}>
      {children}
    </div>
  </section>
)

Wrapper.propTypes = {
  background: PropTypes.string,
  fixedBackground: PropTypes.bool,
  textAlignment: PropTypes.string,
  textBrightness: PropTypes.number,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
  verticalAlignment: PropTypes.number,
  verticalPadding: PropTypes.number,
  horizontalPadding: PropTypes.number
}

export default Wrapper