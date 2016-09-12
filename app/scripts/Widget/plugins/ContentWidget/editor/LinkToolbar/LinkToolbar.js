import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { RichUtils, Entity } from 'draft-js'
import { getSelectionEntity } from 'draftjs-utils'

import StyleButton from '../StyleButton'


class LinkToolbar extends Component {

  constructor(props) {
    super(props)

    this.state = { showURLInput: false, urlValue: '' }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps
    if (editorState !== this.props.editorState) {
      const nextEntityKey = getSelectionEntity(editorState)
      if (nextEntityKey) {
        const entityInstance = Entity.get(nextEntityKey)
        if (entityInstance && entityInstance.getType() === 'LINK') {
          this.setState({ showURLInput: true, urlValue: entityInstance.getData().href })
        } else {
          this.setState({ showURLInput: false, urlValue: '' })
        }
      } else {
        this.setState({ showURLInput: false, urlValue: '' })
      }
    }
  }

  confirmLink(e) {
    const { editorState, onChangeEditorState } = this.props

    const entitySelected = getSelectionEntity(editorState)
    let entity
    if (entitySelected && Entity.get(entitySelected).getType('LINK')) {
      entity = Entity.replaceData(entitySelected, { href: this.state.urlValue })
    } else {
      entity = Entity.create('LINK', 'MUTABLE', { href: this.state.urlValue })
    }

    const newEditorState = RichUtils.toggleLink(editorState, editorState.getSelection(), entity)
    onChangeEditorState(newEditorState)
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
