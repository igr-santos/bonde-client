import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

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
      // initialValue is a string with syntax HTML, we need transform in contentState
      const contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.initialValue))
      editorState = EditorState.createWithContent(contentState)
    }
    this.state = { editorState, editing: false }
  }

  handleFocus() {
    this.refs.editor.focus()  // Set focus for Editor
    this.setState({ editing: true })
  }

  handleBlur() {
    this.setState({ editing: false })
  }

  handleChange(editorState) {
    this.setState({ editorState })
  }

  handleKeyBindingFn(e) {
    // Create command to save content `[Ctrl + S]`
    if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'save-content'
    }
    // Apply commands default like `[Ctrl + Z]`
    return getDefaultKeyBinding(e)
  }

  disableEditor() {
    this.refs.editor.blur()
    this.setState({ editing: false })
  }

  handleSaveContent(evt) {
    evt && evt.preventDefault()

    const { initialValue, saveContent } = this.props
    const contentHTML = stateToHTML(this.state.editorState.getCurrentContent())
    if (contentHTML !== initialValue) {
      saveContent(contentHTML)
    }
    this.disableEditor()
  }

  handleKeyCommand(command) {
    if (command === 'save-content') {
      return this.handleSaveContent()
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
    const editorStyle = { outline: this.state.editing ? '1px solid #000' : null }

    return (
      <div className="rich-text">
        <div className="rich-text-editor" onClick={::this.handleFocus} style={editorStyle}>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={::this.handleChange}
            handleKeyCommand={::this.handleKeyCommand}
            keyBindingFn={::this.handleKeyBindingFn}
            disabled={!this.state.editing}
          />
        </div>
        <div className={classnames("right mt1", { 'display-none': !this.state.editing })}>
          <button className="button button-transparent caps bg-darken-4 white rounded" onClick={::this.handleSaveContent}>
            Salvar
          </button>
        </div>
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  initialValue: PropTypes.string,
  saveContent: PropTypes.func.isRequired
}

export default RichTextEditor
