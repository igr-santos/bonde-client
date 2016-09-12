import React, { PropTypes } from 'react'
import { RichUtils } from 'draft-js'

import StyleButton from './StyleButton'


var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', iconClass: 'fa fa-bold' },
  { label: 'Italic', style: 'ITALIC', iconClass: 'fa fa-italic' },
  { label: 'Underline', style: 'UNDERLINE', iconClass: 'fa fa-underline'},
]

const InlineStyleToolbar = ({ editorState, onChangeEditorState, buttonClassName, ...props }) => {

  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <span {...props}>
      {INLINE_STYLES.map(type => {
        return (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            onToggle={() => onChangeEditorState(RichUtils.toggleInlineStyle(editorState, type.style))}
            className={buttonClassName}
            {...type}
          />
        )
      })}
    </span>
  )
}

InlineStyleToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChangeEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default InlineStyleToolbar
