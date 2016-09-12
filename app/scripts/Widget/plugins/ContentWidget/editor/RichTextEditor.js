import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { Editor, EditorState, ContentState } from 'draft-js'
import { RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import { convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import RichTextToolbar from './RichTextToolbar'
import { decorator } from './LinkToolbar/Link'


class RichTextEditor extends Component {

  /**
   * Make editor state empty by default, when passed
   * props initialValue, a HTML in string format, the editor state
   * is created with a new content state.
   */
  constructor(props) {
    super(props)

    let editorState = EditorState.createEmpty(decorator)
    if (this.props.initialValue) {
      // initialValue is a string with syntax HTML, we need transform in contentState
      const contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.initialValue))
      editorState = EditorState.createWithContent(contentState, decorator)
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

  handleFocusOut() {
    this.disableEditor()
  }

  render() {
    const editorStyle = { outline: this.state.editing ? '1px solid #000' : null }

    return (
      <div className="rich-text">
        <div className={classnames('content-widget full-width',  { 'display-none': !this.state.editing })}>
          <RichTextToolbar
            className="absolute full-width top-0 left-0 bg-darken-4"
            buttonClassName="button button-transparent white p2"
            editorState={this.state.editorState}
            onChangeEditorState={::this.handleChange}
            style={{zIndex: 10000}}
          />
          <div className="fixed top-0 right-0 bottom-0 left-0" onClick={::this.handleFocusOut} style={{ zIndex: 9998 }} />
        </div>
        <div className=" relative" style={{ zIndex: 9999 }}>
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
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  initialValue: PropTypes.string,
  saveContent: PropTypes.func.isRequired
}

export default RichTextEditor
