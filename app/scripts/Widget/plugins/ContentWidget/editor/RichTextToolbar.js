import React, { PropTypes } from 'react'

import BlockStyleToolbar from './BlockStyleToolbar'
import InlineStyleToolbar from './InlineStyleToolbar'
import LinkToolbar from './LinkToolbar/LinkToolbar'


const RichTextToolbar = ({ editorState, onChangeEditorState, buttonClassName, ...props }) => {

  const toolbarProps = { editorState, onChangeEditorState, buttonClassName }

  return (
    <div {...props}>
      <LinkToolbar className="flex left" {...toolbarProps} />
      <BlockStyleToolbar className="flex left" {...toolbarProps} />
      <InlineStyleToolbar className="flex left" {...toolbarProps} />
    </div>
  )
}

RichTextToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChangeEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default RichTextToolbar
