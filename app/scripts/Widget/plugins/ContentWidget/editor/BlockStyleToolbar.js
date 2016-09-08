import React, { PropTypes } from 'react'

import StyleButton from './StyleButton'


const BLOCK_TYPES = [
  /*{label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},*/
  {label: 'UL', style: 'unordered-list-item', iconClass: 'fa fa-list-ul'},
  {label: 'OL', style: 'ordered-list-item', iconClass: 'fa fa-list-ol'},
  /*{label: 'Code Block', style: 'code-block'},*/
]

const BlockStyleToolbar = ({ blockType, onToggle, buttonClassName, ...props }) => {
  return (
    <span {...props}>
      {BLOCK_TYPES.map(type => {
        return (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            onToggle={onToggle}
            className={buttonClassName}
            {...type}
          />
        )
      })}
    </span>
  )
}

BlockStyleToolbar.propTypes = {
  blockType: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default BlockStyleToolbar
