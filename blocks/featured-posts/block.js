import { __ } from '@wordpress/i18n'
import {
  registerBlockType 
} from '@wordpress/blocks'
import Icon from '@gblx/fontawesome'

class FeaturedPostsBlock {
  title = __('Featured Posts', 'gblx')
	icon = <Icon icon="thumbtack" />
	category = 'widgets'
	attributes = {
  }
  edit = () => {
    return ''
  }
  save = () => {
    return ''
  }
}

registerBlockType('gblx/featured-posts', new FeaturedPostsBlock())