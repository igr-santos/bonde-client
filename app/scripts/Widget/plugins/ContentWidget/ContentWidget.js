import React, { Component } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'

import { RichTextEditor } from './editor'
import * as WidgetActions from '../../actions'


class ContentWidget extends Component {

  handleSaveContent(content) {
    const { auth, mobilization, widget, dispatch } = this.props

    const widgetActions = bindActionCreators(WidgetActions, dispatch)
    widgetActions.editWidget({
      mobilization_id: mobilization.id,
      widget_id: widget.id,
      credentials: auth.credentials,
      widget: {
        ...widget,
        settings: {
          ...widget.settings,
          content
        }
      }
    })
  }

  render() {
    const { mobilization, widget, editable } = this.props
    const { header_font: headerFont, body_font: bodyFont } = mobilization
    const { settings: { content } } = widget

    return (
      <div className={classnames("content-widget widget", `${headerFont}-header`, `${bodyFont}-body`)}>
        {editable ?
          <RichTextEditor initialValue={content} saveContent={::this.handleSaveContent} /> :
          <div dangerouslySetInnerHTML={{__html: content}} />
        }
      </div>
    )
  }
}

export default ContentWidget
