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
	Button,
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
		textAlignment: {
			type: 'string'
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
		},
		showPrimaryCta: {
			type: 'boolean'
		},
		showSecondaryCta: {
			type: 'boolean'
		},
		primaryCtaText: {
			source: 'children',
			selector: '.gblx-primary-cta'
		},
		secondaryCtaText: {
			source: 'children',
			selector: '.gblx-secondary-cta'
		},
		textBrightness: {
			type: 'integer',
			default: 100
		}
	}
	
	renderInspector = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			headerFontSize,
			contentFontSize,
			overlayOpacity,
			overlayColor,
			fixedBackground,
			textAlignment,
			textBrightness,
			showPrimaryCta,
			showSecondaryCta
		} = attributes
		return (
			<InspectorControls>
				<div>
					<h2>{ __('Display Settings', 'gblx')}</h2>
					<BaseControl
						id="gblx-primary-cta-toggle"
						className="blocks-toggle-control"
						label={__('Primary Callout', 'gblx')}>
						<FormToggle 
							id="gblx-primary-cta-toggle"
							checked={showPrimaryCta}
							onChange={(e) => setAttributes({ showPrimaryCta: e.target.checked })} />
					</BaseControl>
					<BaseControl
						id="gblx-secondary-cta-toggle"
						className="blocks-toggle-control"
						label={__('Secondary Callout', 'gblx')}>
							<FormToggle 
								id="gblx-secondary-cta-toggle"
								checked={showSecondaryCta}
								onChange={(e) => setAttributes({ showSecondaryCta: e.target.checked })} />
					</BaseControl>
				</div>
				<PanelBody title={__('Primary Color', 'gblx')}>
					<ColorPalette 
							value={overlayColor} 
							onChange={(overlayColor) => setAttributes({ overlayColor })} />
				</PanelBody>
				<PanelBody title={__('Secondary Color', 'gblx')}>
					<ColorPalette 
							value={overlayColor} 
							onChange={(overlayColor) => setAttributes({ overlayColor })} />
				</PanelBody>
				<PanelBody title={__('Callout Buttons', 'gblx')}>
				</PanelBody>
				<PanelBody title={__('Background Settings', 'gblx')}>
					<RangeControl
							min={0}
							max={100}
							value={overlayOpacity}
							label={__('Overlay Opacity', 'gblx')}
							onChange={(overlayOpacity) => setAttributes({ overlayOpacity })} />
					<ColorPalette 
						value={overlayColor} 
						onChange={(overlayColor) => setAttributes({ overlayColor })} />
					<BaseControl
						id="gblx-fixed-background-toggle"
						className="blocks-toggle-control"
						label={__('Fixed Background', 'gblx')}>
						<FormToggle 
							id="gblx-fixed-background-toggle"
							checked={fixedBackground}
							onChange={(e) => setAttributes({ fixedBackground: e.target.checked })}/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Text Settings', 'gblx')}>
					<RangeControl
						min={16}
						max={32}
						value={headerFontSize}
						label={__('Header Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(headerFontSize) => setAttributes({ headerFontSize })} />
					<RangeControl
						min={12}
						max={24}
						value={contentFontSize}
						label={__('Content Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(contentFontSize) => setAttributes({ contentFontSize })} />
					<RangeControl
						min={0}
						max={100}
						value={textBrightness}
						label={__('Brightness', 'gblx')}
						onChange={(textBrightness) => setAttributes({ textBrightness })} />
					<BaseControl
						label={__('Text Alignment', 'gblx')}>
						<AlignmentToolbar 
							value={textAlignment} 
							onChange={(textAlignment) => setAttributes({ textAlignment })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		)
	}

	renderToolbar = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			textAlignment,
			background
		} = attributes
		return (
			<BlockControls>
				{
					background 
					? <div>
							<AlignmentToolbar 
								value={textAlignment} 
								onChange={(textAlignment) => setAttributes({ textAlignment })} />
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
			bodyContent,
			headerText,
			headerFontSize,
			contentFontSize,
			overlayColor,
			overlayOpacity,
			fixedBackground,
			textAlignment,
			textBrightness,
			primaryCtaText,
			secondaryCtaText,
			showPrimaryCta,
			showSecondaryCta
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
									[styles['has-left-alignment']]: textAlignment === 'left',
									[styles['has-right-alignment']]: textAlignment === 'right',
								})} 
								style={{ 
									color: `hsl(0, 0%, ${textBrightness}%)`,
									backgroundImage: `url(${background})`, 
								}}>
								<div 
									style={{ 
										background: overlayColor,
										opacity: overlayOpacity > 0 ? overlayOpacity / 100 : 0
									}} 
									className={styles['overlay']} />
								<div className={styles.inner}>
									<RichText 
										tagName="h2"
										value={headerText}
										className={styles.header}
										style={{ 
											fontSize: `${headerFontSize}px`,
											lineHeight: `${headerFontSize}px`, 
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
									<div>
										{ showPrimaryCta 
												? <Button
														className={styles['primary-cta']}>
															<RichText 
																placeholder={__('Action 1', 'gblx')}
																value={primaryCtaText}
																onChange={(primaryCtaText) => setAttributes({ primaryCtaText })} />
													</Button>
												: null }
										{
											showSecondaryCta 
												? <Button
														className={styles['secondary-cta']}>
															<RichText 
																placeholder={__('Action 2', 'gblx')}
																value={secondaryCtaText}
																onChange={(secondaryCtaText) => setAttributes({ secondaryCtaText })} />
													</Button>
												: null }
									</div>
								</div>	
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
			overlayOpacity,
			primaryCtaText,
			secondaryCtaText
		} = attributes
		return (
			<section 
				style={{
					backgroundImage: `url(${background})`
				}}>
				<div>
					<h2>{ headerText }</h2>
					<p>{ bodyContent }</p>
				</div>
				<div>
					<Button 
						className="gblx-primary-cta">
						{ primaryCtaText }
					</Button>
					<Button 
						className="gblx-secondary-cta">
						{ secondaryCtaText }
					</Button>
				</div>
			</section>
		)
	}

}

export default registerBlockType('gblx/cta', new GblxCta())

console.log(wp)
