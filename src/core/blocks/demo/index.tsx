import * as React from 'react'
import { registerBlockType } from '@gblx/wordpress/blocks'
import { __ } from '@gblx/wordpress/i18n'

registerBlockType( 'gblx/demo', { 
	title: __( 'GBLX Demo', 'smartcat' ),
	icon: 'shield', 
	category: 'common',

	edit: () => {
		return (
			'Hello from Gutenblox!'
		);
	},

	save: () => {
		return <p></p>
	},
})