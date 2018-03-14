import { __ } from '@wordpress/i18n'
import { 
	RichText,
	registerBlockType
} from '@wordpress/blocks'
import styles from './block.scss'

export default registerBlockType( 'gblx/cta', { 
	title: __( 'GBLX CTA', 'gblx' ),
	icon: 'megaphone', 
	category: 'common',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
	},
	edit: ({ className, attributes, setAttributes }) => {
			return (
				<div className={styles.test}>
					<RichText
							tagName="p"
							className={ className }
							value={ attributes.content }
							onChange={ (content) => setAttributes({ content }) } />
				</div>
			)
	},
	save: ({ attributes }) => {
		return <p className="test">{ attributes.content }</p> 
	},
})