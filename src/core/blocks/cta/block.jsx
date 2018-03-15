import { __ } from '@wordpress/i18n'
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
	MediaUploader 
} from '@gblx/components'
import styles from './block.scss'

/**
 * GBLX Call To Action Module.
 * 
 * @since 1.0.0
 */
class GblxCta {
	title = __( 'GBLX CTA', 'gblx' )
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
				<PanelBody title={ __('Background Settings', 'gblx') }>
				</PanelBody>
			</InspectorControls>
		)
	}
	
	edit = ({ className, attributes, setAttributes, isSelected }) => {
		return (
			<div className={styles.test}>
				{ this.renderInspector(isSelected) }
				<Placeholder
					icon="format-image"
					instructions={ __('Drag image here or add from media library', 'gblx') }
					label={ __( 'Background Image', 'gblx' )}>
					<DropZone />
					<FormFileUpload 
						className="wp-block-image__upload-button button button-large"
						isLarge>
						{ __('Upload', 'glbx') }
					</FormFileUpload>
					<MediaUpload
						onSelect={ (media) => console.log('selected ' + media.length) }
						type="image"
						render={ ({ open }) => (
							<Button onClick={ open } isLarge>
								{ __('Add from Media Library', 'gblx') }
							</Button>
						) } 
						/>
				</Placeholder>
				<RichText 
					style={ { background: attributes.background } }
					onChange={ (content) => setAttributes({ content }) }
					value={ attributes.content } />
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