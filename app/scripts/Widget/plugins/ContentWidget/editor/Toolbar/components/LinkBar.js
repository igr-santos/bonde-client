import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { IconButton } from './'


class LinkBar extends Component {

  constructor(props) {
    super(props)
    this.state = { showDialogLink: false, href: '' }
  }

  _openDialogLink() {
    this.setState(
      { showDialogLink: true },
      () => setTimeout(() => this.refs.hrefInput.focus(), 0)
    )
  }

  _confirmDialogLink(e) {
    e && e.preventDefault()
    console.log('TODO:', 'create entity to set link')
  }

  _removeLink() {
    console.log('TODO:', 'unset link in selection')
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
        <button className="button" onClick={::this._confirmDialogLink}>OK</button>
      </div>
    )
  }

  render() {
    const { showDialogLink } = this.state
    const { buttonClassName, editorState, entity } = this.props

    let selection = editorState.getSelection()
    let hasSelection = !selection.isCollapsed()

    const isCursorOnLink = (entity != null && entity.type === 'LINK')
    const shouldShowLinkButton = hasSelection || isCursorOnLink

    return (
      <div className="flex left">
        <IconButton
          iconClass="fa fa-link"
          className={buttonClassName}
          active={this.state.showLinkInput}
          onClick={::this._openDialogLink}
          disabled={!shouldShowLinkButton}
        />
        {showDialogLink && this._renderDialogLink()}
        <IconButton
          iconClass="fa fa-unlink"
          className={buttonClassName}
          onClick={::this._removeLink}
          disabled={!isCursorOnLink}
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

LinkBar.propTypes = {
  hasSelection: false,
}

export default LinkBar
