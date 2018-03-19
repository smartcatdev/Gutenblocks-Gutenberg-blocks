import {
  RichText,
  UrlInputButton 
} from '@wordpress/blocks'
import {
  Button
} from '@wordpress/components'
import {
  Component
} from '@wordpress/element'
import styles from './link-button.scss'

export default ({ ...props, value, placeholder, onChange }) => (
  <Button 
    {...props}>
    <RichText 
      value={value}
      onChange={onChange} 
      placeholder={placeholder} />
  </Button>
)