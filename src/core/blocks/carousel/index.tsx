import * as React from 'react'
import{ __ } from '@wordpress/i18n'
import { registerBlockType  } from '@wordpress/blocks'

export default registerBlockType( 'gblx/carousel', { 
	title: __( 'GBLX Carousel', 'gblx' ),
	icon: 'format-gallery', 
	category: 'common',
	edit: () => {
		return (
			'Helldo from asdsa!'
		)
	},
	save: () => {
		return <p></p> 
	},
})