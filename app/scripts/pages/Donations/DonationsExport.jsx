import React from 'react'
import { DonationWidgetMenu, Loading } from './../../components'
import { Link, Navigation } from 'react-router'

export default class DonationsExport extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  widget (props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString() }).indexOf(this.props.params.widget_id)]
  }

  render() {
    const widgetId = this.widget().id
    const mobilizationId = this.props.mobilization.id
    const path = '/mobilizations/' + mobilizationId + '/widgets/' + widgetId + '/donations.csv'
    return (
      <div className="flex flex-auto flex-column bg-silver gray relative">
        <DonationWidgetMenu {...this.props } widget={ this.widget() } />

        <div className="p3 flex-auto overflow-scroll">
          <p className="h5">Clique no botão abaixo para exportar os dados de doações para CSV:</p>
          <Link to={ path } className="button bg-aqua h3 caps">Exportar</Link>
        </div>
      </div>
    )
  }
}
