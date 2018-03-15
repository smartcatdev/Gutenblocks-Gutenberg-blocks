import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	InspectorControls,
	registerBlockType,
	BlockControls,
  AlignmentToolbar
} from '@wordpress/blocks'
import {
	PanelBody,
	RangeControl
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
		title: {
			source: 'children',
			selector: 'h2'
		},
		content: {
			source: 'children',
			selector: 'p'
		},
		background: {
			source: 'attribute',
			selector: 'img',
			attributes: 'src'
		},
		textColor: {
			type: 'string'
		},
		alignment: {
			type: 'string',
		},
		headerFontSize: {
			type: 'integer'
		},
		contentFontSize: {
			type: 'integer'
		}
	}
	
	renderInspector = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			textColor,
			headerFontSize,
			contentFontSize
		} = attributes
		return (
			<InspectorControls>
				<PanelBody title={__('Text Color', 'gblx')}>
					<ColorPalette 
						value={textColor} 
						onChange={(textColor) => setAttributes({ textColor })} />
				</PanelBody>
				<PanelBody title={__('Heading Settings', 'gblx')}>
					<RangeControl
						min={16}
						max={32}
						allowReset
						value={headerFontSize}
						label={__('Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(headerFontSize) => setAttributes({ headerFontSize })} />
				</PanelBody>
				<PanelBody title={__('Content Settings', 'gblx')}>
				<RangeControl
						min={12}
						max={24}
						allowReset
						value={contentFontSize}
						label={__('Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(contentFontSize) => setAttributes({ contentFontSize })} />
				</PanelBody>
			</InspectorControls>
		)
	}

	renderToolbar = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			alignment,
			background
		} = attributes
		return (
			<BlockControls>
				{ background 
					? <AlignmentToolbar 
							value={alignment} 
							onChange={(alignment) => setAttributes({ alignment })} />
					: null
				}
			</BlockControls>
		)
	}

	edit = ({ className, attributes, setAttributes, isSelected }) => {
		const {
			background,
			textColor,
			alignment,
			content,
			header,
			headerFontSize,
			contentFontSize
		} = attributes
		return (
			<div>
				{this.renderInspector(isSelected, attributes, setAttributes)}
				{this.renderToolbar(isSelected, attributes, setAttributes)}
				<BackgroundImage 
					image={background}
					style={{ 
						textAlign: alignment,
						color: textColor
					}}
					onSelect={(background) => setAttributes({ background })}>
						<div style={{ fontSize: headerFontSize }}>
							<RichText 
								tagName="h2"
								value={header}
								className={styles.header}
								onChange={(title) => setAttributes({ title })} />
						</div>
						<div style={{ fontSize: contentFontSize }}>
							<RichText 
								tagName="p"
								value={content}
								className={styles.content}
								onChange={(content) => setAttributes({ content })} />
						</div>
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
