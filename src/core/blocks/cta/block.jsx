import classNames from 'classnames'
import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	ImagePlaceholder,
	InspectorControls,
	registerBlockType,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	MediaUpload
} from '@wordpress/blocks'
import {
	PanelBody,
	RangeControl,
	Toolbar,
	IconButton
} from '@wordpress/components'
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
				<PanelBody title={__('Callout Settings', 'gblx')}>
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
				{
					background 
					? <div>
							<AlignmentToolbar 
								value={alignment} 
								onChange={(alignment) => setAttributes({ alignment })} />
							<Toolbar>
								<MediaUpload
									type="image"
									render={({ open }) => (
										<IconButton 
											icon="format-image" 
											onClick={open}
											tooltip={__('Edit Image', 'gblx')} />
									)} 
									onSelect={(media) => setAttributes({ background: media.url })} />
							</Toolbar>
						</div>	
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
				{ !background 
						?	<ImagePlaceholder onSelectImage={(media) => setAttributes({ background: media.url })} />
						: <section 
								className={classNames({
									[styles['cta-background']]: true,
									[styles['has-left-alignment']]: alignment === 'left',
									[styles['has-right-alignment']]: alignment === 'right',
								})} 
								style={{ 
									color: textColor,
									backgroundImage: `url(${background})`, 
								}}>
							<RichText 
								tagName="h2"
								value={header}
								className={styles.header}
								style={{ 
									fontSize: headerFontSize,
									lineHeight: `${headerFontSize}px` 
								}}
								placeholder={__('Heading Text', 'gblx')}
								onChange={(title) => setAttributes({ title })} />
							<RichText 
								tagName="p"
								value={content}
								className={styles.content}
								style={{ 
									fontSize: contentFontSize,
									lineHeight: `${contentFontSize}px` 
								}}
								placeholder={__('Content Area', 'gblx')}
								onChange={(content) => setAttributes({ content })} />
							</section>
				}
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
