import PropTypes from 'prop-types'
import {
  RichText
} from '@wordpress/blocks'
import {
  Button
} from '@wordpress/components'
import {
  Component
} from '@wordpress/element'

const EditableButton = ({ ...props, value, placeholder, onChange }) => (
  <Button 
    {...props}>
    <RichText 
      value={value}
      onChange={onChange} 
      placeholder={placeholder} />
  </Button>
)

EditableButton.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default EditableButton