import PropTypes from 'prop-types'
import { 
	__ 
} from '@wordpress/i18n'
import { 
  MediaUpload
} from '@wordpress/blocks'
import {
	DropZone,
  FormFileUpload,
  Placeholder,
	Button
} from '@wordpress/components'
import {
	mediaUpload 
} from '@wordpress/utils'
import {
	handleImageUpload 
} from '@gblx/utils/media'
import styles from './background-image.scss'

const BackgroundImage = ({ style, image, onSelect, children }) => {
  const uploadImage = (file) => handleImageUpload(file, (media) => onSelect(media.url)) 
  if (image) {
    return (
      <section 
        style={{ ...style, backgroundImage: `url(${image})` }}>
        {children}
      </section>
    )
  }
  return (
    <Placeholder
      className={styles.imagePlaceholder}
      icon="format-image"
      instructions={__('Drag image here or add from media library', 'gblx')}
      label={__('Background Image', 'gblx')}>
      <DropZone onFilesDrop={(files) => uploadImage((files[0]))} />
      <FormFileUpload 
        onChange={(e) => uploadImage((e.target.files[0]))}
        className="wp-block-image__upload-button button button-large"
        isLarge>
        {__('Upload', 'glbx')}
      </FormFileUpload>
      <MediaUpload
        onSelect={(media) => onSelect(media.url)}
        type="image"
        render={({ open }) => (
          <Button onClick={open} isLarge>{__('Add from Media Library', 'gblx')}</Button>
        )} 
        />
    </Placeholder>
  )
}

BackgroundImage.propTypes = {
  image: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.array
}

export default BackgroundImage