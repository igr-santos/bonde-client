import React, { Component, PropTypes } from 'react'

import { Entity } from 'draft-js'
import { getEntityAtCursor } from '../../utils'

import { LinkBar } from './components'


class Toolbar extends Component {

  _getEntityAtCursor() {
    const { editorState } = this.props
    const entity = getEntityAtCursor(editorState)
    return (entity == null) ? null : Entity.get(entity.entityKey)
  }

  render() {
    const { className, style, ...toolbarProps } = this.props
    const { editorState, onChange } = this.props

    const entity = this._getEntityAtCursor()

    return (
      <div className={className} style={style}>
        <LinkBar {...toolbarProps} entity={entity} />
        <IconButton iconClass="fa fa-link" className={buttonClassName} onClick={::this._openDialogLink} />
        <IconButton iconClass="fa fa-unlink" className={buttonClassName} onClick={::this._removeLink} />
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

export default Toolbar
