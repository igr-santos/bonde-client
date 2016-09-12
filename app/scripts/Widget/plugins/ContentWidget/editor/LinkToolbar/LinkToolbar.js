import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { RichUtils, Entity } from 'draft-js'

import StyleButton from '../StyleButton'
import { findLinkEntities } from './Link'


class LinkToolbar extends Component {

  constructor(props) {
    super(props)

    this.state = { showURLInput: false, urlValue: '' }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps

    if (editorState !== this.props.editorState) {
      const selection = editorState.getSelection()
      const contentState = editorState.getCurrentContent()
      const contentBlock = contentState.getBlockForKey(selection.getAnchorKey())
      const entityKey = contentBlock.getEntityAt(selection.getStartOffset())
      if (entityKey) {
        const entityInstance = Entity.get(entityKey)
        if (entityInstance.type === 'LINK') {
          this.setState({ showURLInput: true, urlValue: entityInstance.getData().href })
        }
      } else {
        this.setState({ showURLInput: false, urlValue: '' })
      }
    }
  }

  confirmLink(e) {
    const { onChangeEditorState, editorState } = this.props

    const entityKey = Entity.create('LINK', 'MUTABLE', { href: this.state.urlValue })
    const newEditorState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
    onChangeEditorState(newEditorState)

    this.setState({ showURLInput: false, urlValue: '' })
  }

  promptForLink() {
    const { editorState } = this.props

    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.setState(
        { showURLInput: true, urlValue: '' },
        () => setTimeout(() => this.refs.url.focus(), 0)
      )
    }
  }

  removeLink() {
    const { editorState, onChangeEditorState } = this.props
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChangeEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  render() {
    const { editorState, buttonClassName, ...props } = this.props

    let urlInput
    if (this.state.showURLInput) {
      urlInput = (
        <div className={classnames("p1 flex left", "bg-blue" ? this.state.showURLInput : null )}>
          <input
            style={{ height: '2rem' }}
            className="field-light mr1"
            onChange={e => this.setState({ urlValue: e.target.value })}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={e => e.which === 13 && this.confirmLink(e)}
          />
          <button className="button" onClick={::this.confirmLink}>Confirm</button>
        </div>
      )
    }

    return (
      <span {...props}>
        <StyleButton
          label="Link"
          style="link"
          active={this.state.showURLInput}
          onToggle={() => this.promptForLink()}
          className={buttonClassName}
          iconClass="fa fa-link"
        />
        {urlInput}
        <StyleButton
          label="Unlink"
          style="unlink"
          onToggle={() => this.removeLink()}
          className={buttonClassName}
          iconClass="fa fa-unlink"
        />
      </span>
    )
  }
}

LinkToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChangeEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
}

export default LinkToolbar
