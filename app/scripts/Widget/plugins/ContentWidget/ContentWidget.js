import React from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'

import { RichTextEditor } from './editor'
import * as WidgetActions from '../../actions'


const ContentWidget = ({ auth, mobilization, widget, dispatch }) => {

  const { header_font: headerFont, body_font: bodyFont } = mobilization
  const { settings: { content } } = widget

  const widgetActions = bindActionCreators(WidgetActions, dispatch)
  const handleSaveContent = (content) => {
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


  return (
    <div className={classnames("content-widget widget", `${headerFont}-header`, `${bodyFont}-body`)}>
      <RichTextEditor initialValue={content} saveContent={handleSaveContent} />
    </div>
  )
}

export default ContentWidget
