import React, { PropTypes } from 'react'

import BlockStyleToolbar from './BlockStyleToolbar'
import InlineStyleToolbar from './InlineStyleToolbar'


const RichTextToolbar = ({ editorState, buttonClassName, ...props }) => {

  const { toggleBlockType, toggleInlineStyle, ...otherProps } = props

  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div {...otherProps}>
      <BlockStyleToolbar blockType={blockType} onToggle={toggleBlockType} buttonClassName={buttonClassName} />
      <InlineStyleToolbar currentStyle={currentStyle} onToggle={toggleInlineStyle} buttonClassName={buttonClassName} />
    </div>
  )
}

RichTextToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default RichTextToolbar
