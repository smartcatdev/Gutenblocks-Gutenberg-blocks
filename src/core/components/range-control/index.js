import { 
  __ 
} from '@wordpress/i18n'
import { 
  BaseControl, 
  Button, 
  Dashicon,
  withInstanceId 
} from '@wordpress/components'

const RangeControl = ({ 
  label, 
  value, 
  instanceId, 
  onChange, 
  beforeIcon, 
  afterIcon, 
  help, 
	allowReset, 
	restrictEdit,
  ...props 
}) => {
	const id = `inspector-range-control-${instanceId}`
	const onChangeValue = (event) => onChange(Number(event.target.value))
	return (
    <BaseControl 
      id={id}
      label={label}  
      help={help} 
      className="components-range-control">
			{beforeIcon && <Dashicon icon={beforeIcon} size={20} />}
			<input
        id={id}
        value={value}
        type="range"
				className="components-range-control__slider"
				onChange={onChangeValue}
				aria-describedby={!!help ? `${id}__help` : undefined}
				{...props} />
			{afterIcon && <Dashicon icon={afterIcon} /> }
			<input
      	type="number"
				className="components-range-control__number"
				onChange={onChangeValue}
				aria-label={label}
				value={value}
				readOnly={restrictEdit}
				{...props}
			/>
			{allowReset &&
				<Button onClick={() => onChange()} disabled={value === undefined}>
					{__( 'Reset' )}
				</Button>
			}
		</BaseControl>
	)
}

export default withInstanceId(RangeControl)