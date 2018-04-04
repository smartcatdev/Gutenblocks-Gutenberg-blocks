import {
  __
} from '@wordpress/i18n'
import { 
  RichText,
  MediaUpload,
  InspectorControls,
  registerBlockType,
  ColorPalette
} from '@wordpress/blocks'
import {
  Button,
  IconButton,
  PanelBody,
  ButtonGroup,
  BaseControl,
  FormToggle,
  Dashicon
} from '@wordpress/components'
import {
  RangeControl
} from '@gblx/components'
import Range from 'lodash/range'
import classNames from 'classnames'
import Image from './image'
import Column from './column'
import Blurb from './blurb'
import Caption from './caption'
import Wrapper from './wrapper'
import './block.scss'

class WidgetColumnsBlock {
  title = __('Widget Columns', 'gblx')
	icon = 'columns'
	category = 'widgets'
	attributes = {
    spacing: {
      type: 'integer',
      default: 15
    },
    columns: {
      type: 'integer',
      default: 3
    },
    columnMargin: {
      type: 'integer',
      default: 10
    },
    columnPadding: {
      type: 'integer',
      default: 5
    },
    backgroundColor: {
      type: 'string'
    },
    captionFontSize: {
      type: 'integer',
      default: 14
    },
    contentFontSize: {
      type: 'integer',
      default: 16
    },
    captionBrightness: {
      type: 'integer',
      default: 60
    },
    contentBrightness: {
      type: 'integer',
      default: 10
    },
    blockQuote: {
      type: 'boolean',
      default: false
    },
    caption1: {
      source: 'children',
      selector: '.gblx-widget-columns__column__1 .gblx-widget-columns__caption'
    },
    caption2: {
      source: 'children',
      selector: '.gblx-widget-columns__column__2 .gblx-widget-columns__caption'
    },
    caption3: {
      source: 'children',
      selector: '.gblx-widget-columns__column__3 .gblx-widget-columns__caption'
    },
    caption4: {
      source: 'children',
      selector: '.gblx-widget-columns__column__4 .gblx-widget-columns__caption'
    },
    content1: {
      source: 'children',
      selector: '.gblx-widget-columns__column__1 .gblx-widget-columns__blurb'
    },
    content2: {
      source: 'children',
      selector: '.gblx-widget-columns__column__2 .gblx-widget-columns__blurb'
    },
    content3: {
      source: 'children',
      selector: '.gblx-widget-columns__column__3 .gblx-widget-columns__blurb'
    },
    content4: {
      source: 'children',
      selector: '.gblx-widget-columns__column__4 .gblx-widget-columns__blurb'
    },
    image1: {
      source: 'attribute',
      selector: '.gblx-widget-columns__column__1 .gblx-widget-columns__image img',
      attribute: 'src'
    },
    image2: {
      source: 'attribute',
      selector: '.gblx-widget-columns__column__2 .gblx-widget-columns__image img',
      attribute: 'src'
    },
    image3: {
      source: 'attribute',
      selector: '.gblx-widget-columns__column__3 .gblx-widget-columns__image img',
      attribute: 'src'
    },
    image4: {
      source: 'attribute',
      selector: '.gblx-widget-columns__column__4 .gblx-widget-columns__image img',
      attribute: 'src'
    }
  }

  renderInspector = ({ attributes, setAttributes, isSelected }) => {
    if (!isSelected) {
      return null
    }
    const {
      backgroundColor,
      blockQuote,
      columns,
      columnMargin,
      columnPadding,
      captionFontSize,
      contentFontSize,
      captionBrightness,
      contentBrightness,
      spacing
    } = attributes
    return (
      <InspectorControls>
        <PanelBody title={__('Layout Settings', 'gblx')}>
          <RangeControl
            min={1}
            max={4}
            restrictEdit={true}
            value={columns}
            label={__('Columns', 'gblx')}
            onChange={(columns) => setAttributes({ columns })} />
          <RangeControl
						min={0}
						max={30}
						value={spacing}
						label={__('Spacing', 'gblx')}
						onChange={(spacing) => setAttributes({ spacing })} />
          <RangeControl
            min={0}
            max={15}
            value={columnMargin}
            label={__('Margin', 'gblx')}
            onChange={(columnMargin) => setAttributes({ columnMargin })} />
          <RangeControl
            min={0}
            max={15}
            value={columnPadding}
            label={__('Padding', 'gblx')}
            onChange={(columnPadding) => setAttributes({ columnPadding })} />
        </PanelBody>
        <PanelBody title={__('Background Color', 'gblx')}>
          <ColorPalette
            value={backgroundColor}
            onChange={(backgroundColor) => setAttributes({ backgroundColor })}
          />
        </PanelBody>
        <PanelBody title={__('Caption Text', 'gblx')}>
          <div className="blocks-font-size__main">
            <ButtonGroup>
              <Button 
                onClick={() => setAttributes({ captionFontSize: 14 })}
                isToggled={captionFontSize === 14}
                isPrimary={captionFontSize === 14}
                isLarge>
                {__('S', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ captionFontSize: 16 })}
                isToggled={captionFontSize === 16}
                isPrimary={captionFontSize === 16}
                isLarge>
                {__('M', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ captionFontSize: 36 })}
                isToggled={captionFontSize === 36}
                isPrimary={captionFontSize === 36}
                isLarge>
                {__('L', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ captionFontSize: 48 })}
                isToggled={captionFontSize === 48}
                isPrimary={captionFontSize === 48}
                isLarge>
                {__('XL', 'gblx')}
              </Button>
            </ButtonGroup>
            <Button
              onClick={() => setAttributes({ captionFontSize: '' })}
              isLarge>
              {__('Reset', 'gblx')}
            </Button>
          </div>
          <RangeControl
            min={12}
            max={48}
            value={captionFontSize}
            label={__('Custom Size', 'gblx')}
            beforeIcon="editor-textcolor"
            afterIcon="editor-textcolor"
            onChange={(captionFontSize) => setAttributes({ captionFontSize })} />
          <RangeControl
            min={0}
            max={100}
            value={captionBrightness}
            label={__('Brightness', 'gblx')}
            onChange={(captionBrightness) => setAttributes({ captionBrightness })} />
        </PanelBody>
        <PanelBody title={__('Content Text', 'gblx')}>
          <div className="blocks-font-size__main">
            <ButtonGroup>
              <Button
                onClick={() => setAttributes({ contentFontSize: 14 })}
                isToggled={contentFontSize === 14}
                isPrimary={contentFontSize === 14}
                isLarge>
                {__('S', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ contentFontSize: 16 })}
                isToggled={contentFontSize === 16}
                isPrimary={contentFontSize === 16}
                isLarge>
                {__('M', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ contentFontSize: 36 })}
                isToggled={contentFontSize === 36}
                isPrimary={contentFontSize === 36}
                isLarge>
                {__('L', 'gblx')}
              </Button>
              <Button
                onClick={() => setAttributes({ contentFontSize: 48 })}
                isToggled={contentFontSize === 48}
                isPrimary={contentFontSize === 48}
                isLarge>
                {__('XL', 'gblx')}
              </Button>
            </ButtonGroup>
            <Button
              onClick={() => setAttributes({ contentFontSize: '' })}
              isLarge>
              {__('Reset', 'gblx')}
            </Button>
          </div>
          <RangeControl
            min={12}
            max={48}
            value={contentFontSize}
            label={__('Custom Size', 'gblx')}
            beforeIcon="editor-textcolor"
            afterIcon="editor-textcolor"
            onChange={(contentFontSize) => setAttributes({ contentFontSize })} />
          <RangeControl
            min={0}
            max={100}
            value={contentBrightness}
            label={__('Brightness', 'gblx')}
            onChange={(contentBrightness) => setAttributes({ contentBrightness })} />
          <BaseControl	
            id="gblx-wiget-columns__block-quote-toggle"
						className="components-toggle-control"
						label={__('Block Quote', 'gblx')}>
						<FormToggle 
							id="gblx-wiget-columns__block-quote-toggle"
							checked={blockQuote}
							onChange={(e) => setAttributes({ blockQuote: e.target.checked })}/>
          </BaseControl>
        </PanelBody>
      </InspectorControls>
    )
  }

  edit = ({ attributes, setAttributes, isSelected }) => {
    const {
      backgroundColor,
      contentFontSize,
      captionFontSize,
      captionBrightness,
      contentBrightness,
      blockQuote,
      columns,
      columnMargin,
      columnPadding
    } = attributes
    return (
      <Wrapper {...attributes}>
        {this.renderInspector({ attributes, setAttributes, isSelected })}
        <div className="gblx-widget-columns__inner">
          {Range(columns).map(index => {
            let column = index + 1
            let image = attributes[`image${column}`]
            return (
              <Column 
                margin={columnMargin}
                padding={columnPadding}
                background={backgroundColor}
                className={column}>
                <div className={classNames(
                  'gblx-widget-columns__image-wrapper', 
                  { 'has-image': !!image }
                )}>
                  <MediaUpload   
                    type="image"
                    onSelect={(media) => setAttributes({ [`image${column}`]: media.url })}
                    render={({ open }) => {
                      if (!attributes[`image${column}`]) {
                        return (
                          <IconButton 
                            icon="format-image"  
                            onClick={open} 
                            className="gblx-widget-columns__add-image" 
                            />
                        )
                      }
                      return (
                        <div className="gblx-widget-columns__image-wrapper__preview"> 
                          <IconButton 
                            icon="edit" 
                            onClick={open}
                            className="gblx-widget-columns__edit-image"
                            />
                          <Image src={image} />
                        </div>
                      )
                    }}
                    />
                  </div>
                <div className="gblx-widget-columns__column__content">
                  <Caption
                    fontSize={captionFontSize}
                    brightness={captionBrightness}>
                    <RichText 
                      placeholder={__('Image caption...', 'gblx')}
                      value={attributes[`caption${column}`]}
                      onChange={(caption) => setAttributes({ [`caption${column}`]: caption })} 
                      />
                  </Caption>
                  <Blurb
                    blockQuote={blockQuote}
                    fontSize={contentFontSize}
                    brightness={contentBrightness}>
                    <RichText    
                      placeholder={__('Type something...', 'gblx')}
                      value={attributes[`content${column}`]}
                      onChange={(content) => setAttributes({ [`content${column}`]: content })} 
                      />
                  </Blurb>
                </div>
              </Column>
            )
          })}
        </div>
      </Wrapper>
    )
  }

  save = ({ attributes }) => {
    const {
      backgroundColor,
      contentFontSize,
      captionFontSize,
      captionBrightness,
      contentBrightness,
      blockQuote,
      columns,
      columnMargin,
      columnPadding
    } = attributes
    return (
      <Wrapper {...attributes}> 
       <div className="gblx-widget-columns__inner">
        {Range(columns).map(index => {
          let column = index + 1
          let image = attributes[`image${column}`]
          return (
            <Column 
              margin={columnMargin}
              padding={columnPadding}
              background={backgroundColor}
              className={column}>
              <div className="gblx-widget-columns__image-wrapper">
                {image 
                  ? <Image src={image} />
                  : <div className="gblx-widget-columns__image-placeholder">
                      <Dashicon icon="format-image" />
                    </div>
                }
              </div>
              <div className="gblx-widget-columns__column__content">
                <Caption
                  fontSize={captionFontSize}
                  brightness={captionBrightness}>
                  {attributes[`caption${column}`]}
                </Caption>
                  <Blurb
                    blockQuote={blockQuote}
                    fontSize={contentFontSize}
                    brightness={contentBrightness}>
                    {attributes[`content${column}`]}
                  </Blurb>
                </div>
            </Column>
          )
        })}
       </div>
      </Wrapper>
    )
  }
}

registerBlockType('gblx/widget-columns', new WidgetColumnsBlock())