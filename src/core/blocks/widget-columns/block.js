import {
  __
} from '@wordpress/i18n'
import { 
  RichText,
  MediaUpload,
  InspectorControls,
  registerBlockType,
} from '@wordpress/blocks'
import {
  Button,
  IconButton,
  PanelBody
} from '@wordpress/components'
import {
  RangeControl
} from '@gblx/components'
import Range from 'lodash/range'
import classNames from 'classnames'
import Image from './image'
import Column from './column'
import Content from './content'
import Caption from './caption'
import './block.scss'

class WidgetColumnsBlock {
  title = __('Widget Columns', 'gblx')
	icon = 'columns'
	category = 'widgets'
	attributes = {
    columns: {
      type: 'integer',
      default: 3
    },
    caption1: {
      type: 'array'
    },
    caption2: {
      type: 'array'
    },
    caption3: {
      type: 'array'
    },
    caption4: {
      type: 'array'
    },
    content1: {
      type: 'array'
    },
    content2: {
      type: 'array'
    },
    content3: {
      type: 'array'
    },
    content4: {
      type: 'array'
    },
    image1: {
      type: 'string'
    },
    image2: {
      type: 'string'
    },
    image3: {
      type: 'string'
    },
    image4: {
      type: 'string'
    }
  }

  renderInspector = ({ attributes, setAttributes, isSelected }) => {
    if (!isSelected) {
      return null
    }
    const {
      columns
    } = attributes
    return (
      <InspectorControls>
        <PanelBody>
          <h2>{__('Layout Settings', 'gblx')}</h2>
          <RangeControl
            min={1}
            max={4}
            restrictEdit={true}
            value={columns}
            label={__('Columns', 'gblx')}
            onChange={(columns) => setAttributes({ columns })} />
        </PanelBody>
      </InspectorControls>
    )
  }

  edit = ({ attributes, setAttributes, isSelected }) => {
    const {
      columns
    } = attributes
    return (
      <div className="gblx-widget-columns">
        {this.renderInspector({ attributes, setAttributes, isSelected })}
        <div className="gblx-widget-columns__inner">
          {Range(columns).map(index => {
            let column = index + 1
            let image = attributes[`image${column}`]
            return (
              <Column className={column}>
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
                        <div>
                          {/* <IconButton 
                            icon="format-image" 
                            onClick={open}
                            className="gblx-widget-columns__edit-image"
                            /> */}
                          <Image src={image} />
                        </div>
                      )
                    }}
                    />
                  </div>
                <Caption>
                  <RichText 
                    placeholder={__('Image caption...', 'gblx')}
                    value={attributes[`caption${column}`]}
                    onChange={(caption) => setAttributes({ [`caption${column}`]: caption })} 
                    />
                </Caption>
                <Content>
                  <RichText    
                    placeholder={__('Type something...', 'gblx')}
                    value={attributes[`content${column}`]}
                    onChange={(content) => setAttributes({ [`content${column}`]: content })} 
                    />
                </Content>
              </Column>
            )
          })}
        </div>
      </div>
    )
  }

  save = ({ attributes }) => {
    const {
      widgets
    } = attributes
    return (
      <div className="gblx-widget-columns"> 
      </div>
    )
  }
}

registerBlockType('gblx/widget-columns', new WidgetColumnsBlock())

console.log(wp)