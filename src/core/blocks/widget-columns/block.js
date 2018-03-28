import {
  __
} from '@wordpress/i18n'
import { 
  InspectorControls,
	registerBlockType
} from '@wordpress/blocks'
import {
	PanelBody,
	RangeControl
} from '@wordpress/components'
import {
  resizeArray
} from '@gblx/utils/collections'
import Column from './column'
import './block.scss'

class WidgetColumnsBlock {
  title = __('Widget Columns', 'gblx')
	icon = 'columns'
	category = 'widgets'
	attributes = {
    columnsCount: {
      type: 'integer',
      default: 3
    },
    borderRadius: {
      type: 'integer',
      default: 100
    },
    widgets: {
      type: 'array',
      default: resizeArray([], 3, {})
    }
  }
  renderInspector = ({ attributes, setAttributes, isSelected }) => {
    if (!isSelected) {
      return null
    }
    const {
      columnsCount,
      widgets
    } = attributes
    return (
      <InspectorControls>
        <PanelBody>
          <h2>{__('Layout Settings', 'gblx')}</h2>
          <RangeControl
            min={1}
            max={5}
            value={columnsCount}
            label={__('Columns', 'gblx')}
            onChange={(columnsCount) => setAttributes({ 
              columnsCount,
              widgets: resizeArray(widgets, columnsCount, {})
            })} />
        </PanelBody>
      </InspectorControls>
    )
  }
  edit = ({ attributes, setAttributes, isSelected }) => {
    const {
      widgets
    } = attributes
    return (
      <div className="gblx-widget-columns">
        {this.renderInspector({ attributes, setAttributes, isSelected })}
        <div className="gblx-widget-columns__inner">
          {widgets.map(widget => 
            <Column>
              Widget
            </Column>
          )}
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