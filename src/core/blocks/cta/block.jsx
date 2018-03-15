import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	InspectorControls,
	registerBlockType,
} from '@wordpress/blocks'
import {
	PanelBody,
} from '@wordpress/components'
import {
	BackgroundImage 
} from '@gblx/components'
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

	edit = ({ className, attributes, setAttributes, isSelected }) => {
		const {
			background
		} = attributes
		return (
			<div className={styles.test}>
				{this.renderInspector(isSelected)}
				<BackgroundImage 
					image={background}
					onSelect={(background) => setAttributes({ background })}>
						<RichText 
							onChange={(content) => setAttributes({ content })}
							value={attributes.content} />
				</BackgroundImage>
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
