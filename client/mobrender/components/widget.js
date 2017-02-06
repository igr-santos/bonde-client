import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Loading } from '~client/components/await'
import WidgetOverlay from './widget-overlay'
import widgets from '../widgets/config'

const Widget = ({ editable, widget, update, saving }) => {
  // Resize column widget
  const { sm_size, md_size, lg_size } = widget
  const className = classnames(
    `px2 col mb4 md-mb0 col-${sm_size}`,
    `sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`
  )
  
  const widgetConfig = widgets.filter(w => w.kind === widget.kind)[0]
  const { component: Component } = widgetConfig

  const widgetComponent = <Component widget={widget} update={update} />
 

  return (
    <div className={className}>
      {saving && <Loading />}
      {editable ? (
        <WidgetOverlay>
          {widgetComponent}
        </WidgetOverlay>
      ) : widgetComponent}
    </div>
  )
}

Widget.propTypes = {
  widget: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  editable: PropTypes.bool
}

export default Widget
