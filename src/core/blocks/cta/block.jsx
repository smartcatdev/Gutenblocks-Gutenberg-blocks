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
	IconButton,
	FormToggle,
	BaseControl
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
		headerText: {
			source: 'children',
			selector: 'h2'
		},
		bodyContent: {
			source: 'children',
			selector: 'p'
		},
		background: {
			type: 'string'
		},
		textColor: {
			type: 'string',
			default: 'rgb(255,255,255)'
		},
		alignment: {
			type: 'string',
		},
		headerFontSize: {
			type: 'integer',
			default: 32
		},
		contentFontSize: {
			type: 'integer',
			default: 24
		},
		overlayOpacity: {
			type: 'integer',
			default: 0
		},
		overlayColor: {
			type: 'string',
			default: 'rgb(49,49,49)'
		},
		fixedBackground: {
			type: 'boolean'
		}
	}
	
	renderInspector = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			textColor,
			headerFontSize,
			contentFontSize,
			overlayOpacity,
			overlayColor,
			fixedBackground
		} = attributes
		return (
			<InspectorControls>
				<div>
					<h2>{ __('Backround Settings', 'gblx')}</h2>
					<BaseControl
						className="blocks-toggle-control"
						label={__('Fixed Background', 'gblx')}>
						<FormToggle 
							checked={fixedBackground}
							onChange={(e) => setAttributes({ fixedBackground: e.target.checked })}/>
					</BaseControl>
				</div>
				<PanelBody title={__('Background Color', 'gblx')}>
					<RangeControl
							min={0}
							max={100}
							value={overlayOpacity}
							label={__('Overlay Opacity', 'gblx')}
							onChange={(overlayOpacity) => setAttributes({ overlayOpacity })} />
					<ColorPalette 
						value={overlayColor} 
						onChange={(overlayColor) => setAttributes({ overlayColor })} />
				</PanelBody>
				<PanelBody title={__('Text Color', 'gblx')}>
					<ColorPalette 
						value={textColor} 
						onChange={(textColor) => setAttributes({ textColor })} />
				</PanelBody>
				<PanelBody title={__('Heading Settings', 'gblx')}>
					<RangeControl
						min={16}
						max={32}
						value={headerFontSize}
						label={__('Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(headerFontSize) => setAttributes({ headerFontSize })} />
				</PanelBody>
				<PanelBody title={__('Content Settings', 'gblx')}>
				<RangeControl
						min={12}
						max={24}
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
			bodyContent,
			headerText,
			headerFontSize,
			contentFontSize,
			overlayColor,
			overlayOpacity,
			fixedBackground
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
									[styles['has-parallax']]: fixedBackground,
									[styles['has-left-alignment']]: alignment === 'left',
									[styles['has-right-alignment']]: alignment === 'right',
								})} 
								style={{ 
									color: textColor,
									backgroundImage: `url(${background})`, 
								}}>
								<div 
									style={{ 
										background: overlayColor,
										opacity: overlayOpacity > 0 ? overlayOpacity / 100 : 0
									}} 
									className={styles['overlay']} />
								<RichText 
									tagName="h2"
									value={headerText}
									className={styles.header}
									style={{ 
										fontSize: `${headerFontSize}px`,
										lineHeight: `${headerFontSize}px` 
									}}
									placeholder={__('Heading Text', 'gblx')}
									onChange={(headerText) => setAttributes({ headerText })} />
								<RichText 
									tagName="p"
									value={bodyContent}
									className={styles.content}
									style={{ 
										fontSize: `${contentFontSize}px`,
										lineHeight: `${contentFontSize}px` 
									}}
									placeholder={__('Content Area', 'gblx')}
									onChange={(bodyContent) => setAttributes({ bodyContent })} />		
							</section>
				}
			</div>
		)
	}

	save = ({ attributes }) => {
		const {
			background,
			textColor,
			alignment,
			bodyContent,
			headerText,
			headerFontSize,
			contentFontSize,
			overlayColor,
			overlayOpacity
		} = attributes
		return (
			<section 
				style={{
					backgroundImage: `url(${background})`
				}}>
				<h2>{ headerText }</h2>
				<p>{ bodyContent }</p>
			</section>
		)
	}

}

export default registerBlockType('gblx/cta', new GblxCta())

console.log(wp)
