import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	InspectorControls,
	registerBlockType,
	MediaUpload
} from '@wordpress/blocks'
import {
	PanelBody,
	DropZone,
	Placeholder,
	FormFileUpload,
	Button
} from '@wordpress/components'
import {
	mediaUpload 
} from '@wordpress/utils'
import {
	MediaUploader 
} from '@gblx/components'
import {
	handleImageUpload 
} from '@gblx/utils/media'
import styles from './block.scss'

/**
 * GBLX Call To Action Module.
 * 
 * @since 1.0.0
 */
class GblxCta {
	title = __('GBLX CTA', 'gblx')
	icon = 'megaphone'
	category = 'common'
	attributes = {
		content: {
			source: 'children',
			selector: 'p'
		},
		background: {
			source: 'attribute',
			selector: 'img',
			attributes: 'src'
		}
	}
	
	renderInspector = (isSelected) => {
		if (!isSelected) {
			return null
		}
		return (
			<InspectorControls>
				<PanelBody title={__('Background Settings', 'gblx')}>
				</PanelBody>
			</InspectorControls>
		)
	}

	renderImageUpload = (image, onSelect) => {
		if (image) {
			return null
		}
		const uploadImage = (file) => handleImageUpload(file, (media) => onSelect(media.url))
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

	edit = ({ className, attributes, setAttributes, isSelected }) => {
		const {
			background
		} = attributes
		return (
			<div className={styles.test}>
				{this.renderInspector(isSelected)}
				{this.renderImageUpload(background, (background) => setAttributes({ background }))}
				<div style={{ backgroundImage: `url(${background})` }}>
					<RichText 
						onChange={(content) => setAttributes({ content })}
						value={attributes.content} />
				</div>
			</div>
		)
	}

	save = ({ attributes }) => {
		return (
			<p	
				className="test"
				style={{ background: attributes.background }} >
				{ attributes.content }
			</p> 
		)
	}

}

export default registerBlockType('gblx/cta', new GblxCta())

console.log(wp)
