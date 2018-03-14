import { __ } from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	InspectorControls,
	registerBlockType
} from '@wordpress/blocks'
import styles from './block.scss'

export default registerBlockType( 'gblx/cta', { 
	title: __( 'GBLX CTA', 'gblx' ),
	icon: 'megaphone', 
	category: 'common',
	attributes: {
		background: {
			source: 'attribute',
			attribute: 'style',
			selector: 'p',
		},
		content: {
			source: 'children',
			selector: 'p'
		}
	},
	edit: ({ className, attributes, setAttributes }) => {
			return (
				<div className={styles.test}>
					<InspectorControls>
						<ColorPalette 
							onChange={ (background) => setAttributes({ background }) } />
					</InspectorControls>
					<RichText 
						style={{ background: attributes.background }}
						onChange={ (content) => setAttributes({ content }) }
						value={ attributes.content } />
				</div>
			)
	},
	save: ({ attributes }) => {
		return <p	style={{ background: attributes.background }} className="test">{ attributes.content }</p> 
	},
})