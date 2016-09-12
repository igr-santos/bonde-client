import React, { PropTypes } from 'react'
import classnames from 'classnames'


const StyleButton = ({ onToggle, label, iconClass, style, className, active, ...props }) => {

  const onClick = e => {
    e && e.preventDefault()
    onToggle()
  }

  // TODO: Change class active to 'active'
  const activeClassName = classnames(className, { 'bg-blue': active })

  return (
    <a onClick={onClick} title={label} className={activeClassName} {...props}>
      {iconClass ? <i className={iconClass}></i> : label}
    </a>
  )
}

StyleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  iconClass: PropTypes.string
}

StyleButton.defaultProps = {
  active: false
}

export default StyleButton
