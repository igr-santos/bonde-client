import React from 'react'
import { bindActionCreators } from 'redux'
import { DonationWidgetMenu } from './../../components'
import * as DonationActions from './../../actions/DonationActions'

export default class DonationsExport extends React.Component {
  widget (props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString() }).indexOf(this.props.params.widget_id)]
  }

  handleClick(e) {
    e.preventDefault()
    const { dispatch, mobilization } = this.props
    const bindedDonationActions = bindActionCreators(DonationActions, dispatch)

    bindedDonationActions.exportDonations({ mobilization_id: mobilization.id })
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
          <a onClick={ ::this.handleClick } className="button bg-aqua h3 caps">Exportar</a>
        </div>
      </div>
    )
  }
}
