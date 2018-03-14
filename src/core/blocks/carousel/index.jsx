import { __ } from '@wordpress/i18n'
import { 
	RichText,
	registerBlockType
} from '@wordpress/blocks'

export default registerBlockType( 'gblx/carousel', { 
	title: __( 'GBLX Carousel', 'gblx' ),
	icon: 'format-gallery', 
	category: 'common',
	attributes: {
		content: {
				type: 'array',
				source: 'children',
				selector: 'h2',
		},
	},
	edit: ({ className, attributes, setAttributes }) => {
			return (
					<RichText
							tagName="h2"
							className={ className }
							value={ attributes.content }
							onChange={ (content) => setAttributes({ content }) } />
			)
	},
	save: () => {
		return <p></p> 
	},
})