import React, { Component, PropTypes } from 'react'

import { Editor, EditorState, ContentState } from 'draft-js'
import { RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import { convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'


class RichTextEditor extends Component {

  /**
   * Make editor state empty by default, when passed
   * props initialValue, a HTML in string format, the editor state
   * is created with a new content state.
   */
  constructor(props) {
    super(props)

    let editorState = EditorState.createEmpty()
    if (this.props.initialValue) {
      const contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.initialValue))
      editorState = EditorState.createWithContent(contentState)
    }
    this.state = { editorState }
  }

  handleChange(editorState) {
    this.setState({ editorState })
  }

  handleKeyBindingFn(e) {
    // Simulate `[Ctrl + S]`
    if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'save-content'
    }
    // Apply commands default like `[Ctrl + Z]`
    return getDefaultKeyBinding(e)
  }

  handleKeyCommand(command) {
    const { saveContent } = this.props
    if (command === 'save-content') {
      const contentState = this.state.editorState.getCurrentContent()
      return saveContent(stateToHTML(contentState))
    }

    // RichUtils command like Bold and Italic
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.handleChange(newState)
      return true
    }
    return false
  }

  render() {
    return (
      <div className="rich-text-editor">
        <Editor
          editorState={this.state.editorState}
          onChange={::this.handleChange}
          handleKeyCommand={::this.handleKeyCommand}
          keyBindingFn={::this.handleKeyBindingFn}
        />
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  initialValue: PropTypes.object,
  saveContent: PropTypes.func.isRequired
}

export default RichTextEditor
