import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Entity, RichUtils } from 'draft-js'

import { setLinkToSelection, unsetLinkToSelection } from '../../utils'

import IconButton from './IconButton'


class LinkBar extends Component {

  constructor(props) {
    super(props)
    this.state = { showDialogLink: false, href: '' }
  }

  hasSelection(editorState, entity) {
    const  selection = editorState.getSelection()
    return (!selection.isCollapsed() || this.isCursorOnLink(entity))
  }

  isCursorOnLink(entity) {
    return (entity != null && entity.type === 'LINK')
  }

  componentWillReceiveProps(nextProps) {
    const { editorState, entity } = nextProps
    const isCursorOnLink = this.isCursorOnLink(entity)

    if (editorState !== this.props.editorState) {
      if (entity) {
        if (isCursorOnLink) {
          this.setState({ href: entity.data.href })
        } else {
          this.setState({ showDialogLink: false, href: '' })
        }
      } else {
        this.setState({ showDialogLink: false, href: '' })
      }
    }
  }

  _resetStateLinkBar() {
    this.setState({ showDialogLink: false, href: '' })
  }

  _toggleDialogLink() {
    const toggleDialog = !this.state.showDialogLink
    this.setState(
      { showDialogLink: toggleDialog },
      toggleDialog ? () => setTimeout(() => this.refs.hrefInput.focus(), 0) : null
    )
  }

  _confirmDialogLink(e) {
    e && e.preventDefault()

    const { href } = this.state
    const { editorState, onChange } = this.props

    const newEditorState = setLinkToSelection(editorState, { href })
    this._resetStateLinkBar()

    onChange(newEditorState)
  }

  _removeLink() {
    const { editorState, onChange } = this.props
    const newEditorState = unsetLinkToSelection(editorState)
    this._resetStateLinkBar()

    onChange(newEditorState)
  }

  _renderDialogLink() {
    return (
      <div className={classnames("p1 flex left", { "bg-blue": this.state.showDialogLink })}>
        <input
          style={{ height: '2rem' }}
          className="field-light mr1"
          onChange={e => this.setState({ href: e.target.value })}
          ref="hrefInput"
          type="text"
          value={this.state.href}
        />
        <button type="button" className="button doneDialog" onClick={::this._confirmDialogLink}>OK</button>
      </div>
    )
  }

  render() {
    const { showDialogLink } = this.state
    const { buttonClassName, editorState, entity } = this.props

    return (
      <div className="flex left">
        <IconButton
          iconClass="fa fa-link"
          className={buttonClassName}
          active={this.state.showDialogLink || this.isCursorOnLink(entity)}
          onClick={::this._toggleDialogLink}
          disabled={!this.hasSelection(editorState, entity)}
        />
        {showDialogLink && this._renderDialogLink()}
        <IconButton
          iconClass="fa fa-unlink"
          className={buttonClassName}
          onClick={::this._removeLink}
          disabled={!this.isCursorOnLink(entity)}
        />
      </div>
    )
  }
}

LinkBar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  entity: PropTypes.object,

  buttonClassName: PropTypes.string,
}

export default LinkBar
