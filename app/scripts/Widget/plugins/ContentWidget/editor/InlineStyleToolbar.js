import React, { PropTypes } from 'react'

import StyleButton from './StyleButton'


var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', iconClass: 'fa fa-bold' },
  { label: 'Italic', style: 'ITALIC', iconClass: 'fa fa-italic' },
  { label: 'Underline', style: 'UNDERLINE', iconClass: 'fa fa-underline'},
  /*{ label: 'Monospace', style: 'CODE' },*/
]

const InlineStyleToolbar = ({ currentStyle, onToggle, buttonClassName, ...props }) => {

  return (
    <span {...props}>
      {INLINE_STYLES.map(type => {
        return (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            onToggle={onToggle}
            className={buttonClassName}
            {...type}
          />
        )
      })}
    </span>
  )
}

InlineStyleToolbar.propTypes = {
  currentStyle: PropTypes.shape({
    has: PropTypes.func.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default InlineStyleToolbar
