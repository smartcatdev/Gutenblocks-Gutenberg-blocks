import classNames from 'classnames'
import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	PlainText,
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
import {
	Component
} from '@wordpress/element'
import {
	relativeRange 
} from '@gblx/utils/math'
import Wrapper from './wrapper'
import Header from './header'
import Content from './content'
import Callout from './callout'
import './block.scss'

/**
 * GBLX Call To Action Module.
 * 
 * @since 1.0.0
 */
class GblxCta extends Component {
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
		verticalAlignment: {
			type: 'integer',
			default: 50
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
		showSecondaryCallout: {
			type: 'boolean'
		},
		primaryCalloutText: {
			source: 'children',
			selector: '.primary-cta'
		},
		secondaryCalloutText: {
			source: 'children',
			selector: '.secondary-cta'
		},
		primaryCalloutURL: {
			type: 'text' 
		},
		secondaryCalloutURL: {
			type: 'text'
		},
		textBrightness: {
			type: 'integer',
			default: 100
		},
		primaryColor: {
			type: 'string'
		},
		accentColor: {
			type: 'string'
		},
		calloutBorder: {
			type: 'integer',
			default: 2
		},
		calloutBorderRadius: {
			type: 'integer',
			default: 4
		},
		calloutShowBackground: {
			type: 'boolean',
			default: true
		},
		calloutTransformText: {
			type: 'boolean',
			default: true
		},
		calloutMargin: {
			type: 'integer',
			default: 5
		},
		calloutPadding: {
			type: 'integer',
			default: 5
		},
		calloutFontSize: {
			type: 'integer',
			default: 18
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
			showSecondaryCallout,
			primaryColor,
			accentColor,
			calloutFontSize,
			calloutMargin,
			calloutPadding,
			calloutBorder,
			calloutBorderRadius,
			calloutShowBackground,
			calloutTransformText,
			verticalAlignment,
			primaryCalloutURL,
			secondaryCalloutURL
		} = attributes
		return (
			<InspectorControls>
				<div>
					<h2>{ __('Display Settings', 'gblx')}</h2>
					<BaseControl
						id="gblx-secondary-cta-toggle"
						className="blocks-toggle-control"
						label={__('Secondary Callout', 'gblx')}>
						<FormToggle 
							id="gblx-secondary-cta-toggle"
							checked={showSecondaryCallout}
							onChange={(e) => setAttributes({ showSecondaryCallout: e.target.checked })} />
					</BaseControl>
					<RangeControl
						min={0}
						max={100}
						value={verticalAlignment}
						label={__('Vertical Alignment', 'gblx')}
						onChange={(verticalAlignment) => setAttributes({ verticalAlignment })} />
					<div className="links">
						<BaseControl
							id="gblx-cta-primary-link"
							label={__('Primary Callout Link', 'gblx')}>
							<input
								type="url"
								id="gblx-cta-primary-link"
								value={primaryCalloutURL}
								onChange={(e) => setAttributes({ primaryCalloutURL: e.target.value })} />
						</BaseControl>
						{ showSecondaryCallout 
						? <BaseControl
								id="gblx-cta-secondary-link"
								label={__('Secondary Callout Link', 'gblx')}>
								<input
									type="url"
									id="gblx-cta-secondary-link"
									value={secondaryCalloutURL}
									onChange={(e) => setAttributes({ secondaryCalloutURL: e.target.value })} />
							</BaseControl>
						: null }
					</div>
				</div>
				<PanelBody title={__('Primary Color', 'gblx')}>
					<ColorPalette 
							value={primaryColor} 
							onChange={(primaryColor) => setAttributes({ primaryColor })} />
				</PanelBody>
				<PanelBody title={__('Accent Color', 'gblx')}>
					<ColorPalette 
						value={accentColor} 
						onChange={(accentColor) => setAttributes({ accentColor })} />
				</PanelBody>
				<PanelBody title={__('Callout Buttons', 'gblx')}>
					<BaseControl
						id="gblx-cta-background-toggle"
						className="blocks-toggle-control"
						label={__('Show Background', 'gblx')}>
							<FormToggle 
								id="gblx-cta-background-toggle"
								checked={calloutShowBackground}
								onChange={(e) => setAttributes({ calloutShowBackground: e.target.checked })} />
					</BaseControl>
					<BaseControl
						id="gblx-cta-transform-text-toggle"
						className="blocks-toggle-control"
						label={__('Transform Text', 'gblx')}>
							<FormToggle 
								id="gblx-cta-transform-text-toggle"
								checked={calloutTransformText}
								onChange={(e) => setAttributes({ calloutTransformText: e.target.checked })} />
					</BaseControl>
					<RangeControl
						min={0}
						max={4}
						value={calloutBorder}
						label={__('Border Thickness', 'gblx')}
						onChange={(calloutBorder) => setAttributes({ calloutBorder })} />
					<RangeControl
						min={0}
						max={100}
						value={calloutBorderRadius}
						label={__('Border Radius', 'gblx')}
						onChange={(calloutBorderRadius) => setAttributes({ calloutBorderRadius })} />
					{ showSecondaryCallout 
							? <RangeControl
									min={5}
									max={30}
									value={calloutMargin}
									label={__('Margin', 'gblx')}
									onChange={(calloutMargin) => setAttributes({ calloutMargin })} />
							: null
					}
					<RangeControl
						min={5}
						max={30}
						value={calloutPadding}
						label={__('Padding', 'gblx')}
						onChange={(calloutPadding) => setAttributes({ calloutPadding })} />
					<RangeControl
						min={14}
						max={24}
						value={calloutFontSize}
						beforeIcon="editor-textcolor"
						label={__('Font Size', 'gblx')}
						onChange={(calloutFontSize) => setAttributes({ calloutFontSize })} />
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
				{ background 
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
			primaryCalloutText,
			secondaryCalloutText,
			showSecondaryCallout,
			primaryColor,
			accentColor,
			calloutFontSize,
			calloutBorder,
			calloutBorderRadius,
			calloutShowBackground,
			calloutTransformText,
			calloutMargin,
			calloutPadding
		} = attributes
		const props = {
			editor,
			border: calloutBorder,
			color: primaryColor,
			accentColor: accentColor,
			padding: calloutPadding,
			margin: calloutMargin,
			fontSize: calloutFontSize,
			borderRadius: calloutBorderRadius,
			transformText: calloutTransformText,
			showBackground: calloutShowBackground
		}
		const margin = `${calloutMargin > 0 ? calloutMargin / 2 : 0}px`;
		return (
			<div>
				{this.renderInspector(isSelected, attributes, setAttributes)}
				{this.renderToolbar(isSelected, attributes, setAttributes)}
				{ !background 
						?	<ImagePlaceholder onSelectImage={(media) => setAttributes({ background: media.url })} />
						: <Wrapper {...attributes}>
								<Header fontSize={headerFontSize}>
									<RichText 
										tagName="h2"
										value={headerText}
										placeholder={__('Heading Text', 'gblx')}
										onChange={(headerText) => setAttributes({ headerText })} />
								</Header>
								<Content fontSize={contentFontSize}>
									<RichText 
										tagName="p"
										value={bodyContent}
										placeholder={__('Content Area', 'gblx')}
										onChange={(bodyContent) => setAttributes({ bodyContent })} />	
								</Content>
								<div className="callouts">
									<Callout {...props}>
										<RichText
											className="primary-cta"
											value={primaryCalloutText}
											placeholder={__('Action 1', 'gblx')}
											onChange={(primaryCalloutText) => setAttributes({ primaryCalloutText })} />
									</Callout>
									{
										showSecondaryCallout 
											? <Callout {...props}>
													<RichText
														className="secondary-cta"
														value={secondaryCalloutText}
														placeholder={__('Action 2', 'gblx')}
														onChange={(secondaryCalloutText) => setAttributes({ secondaryCalloutText })}	/>
												</Callout>
											: null }
								</div>
							</Wrapper>
				}
			</div>
		)
	}

	save = ({ attributes }) => {
		const {
			headerText,
			bodyContent,
			primaryCalloutURL,
			primaryCalloutText,
			secondaryCalloutURL,
			secondaryCalloutText,
			headerFontSize,
			contentFontSize,
			accentColor,
			primaryColor,
			calloutPadding,
			calloutMargin,
			calloutFontSize,
			calloutBorder,
			calloutBorderRadius,
			calloutTransformText,
			calloutShowBackground,
			showSecondaryCallout
		} = attributes
		const props = {
			accentColor: accentColor,
			color: primaryColor,
			padding: calloutPadding,
			margin: calloutMargin,
			fontSize: calloutFontSize,
			border: calloutBorder,
			borderRadius: calloutBorderRadius,
			transformText: calloutTransformText,
			showBackground: calloutShowBackground
		}
		return (
			<Wrapper {...attributes}>
					<Header fontSize={headerFontSize}>
						<h2>{headerText}</h2>
					</Header>
					<Content fontSize={contentFontSize}>
						<p>{bodyContent}</p>
					</Content>
				<div className="callouts">
					<Callout
						{...props}
						href={primaryCalloutURL}>
						<span	className="primary-cta"> 
							{primaryCalloutText}
						</span>
					</Callout>
					{ showSecondaryCallout 
							? <Callout
									{...props}
									href={secondaryCalloutURL}>
									<span className="secondary-cta">
										{secondaryCalloutText}
									</span>
								</Callout>
							: null }
				</div>
			</Wrapper>
		) 
	}

}

export default registerBlockType('gblx/cta', new GblxCta())

console.log(wp)
