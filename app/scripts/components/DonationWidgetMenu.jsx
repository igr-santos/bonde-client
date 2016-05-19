import React from 'react'
import * as Paths from '../Paths'
import { TabMenuItem } from './'

export default class DonationWidgetMenu extends React.Component {
  render () {
    const { mobilization, widget, location } = this.props
    const donationPath = Paths.donationMobilizationWidget(mobilization.id, widget.id)
    const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)
    const exportPath = Paths.exportDonations(mobilization.id, widget.id)

    return (
      <div className='bg-white px3 clearfix'>
        <h2 className="mb3">Configure o bloco de doação</h2>
        <div>
          <ul className='list-reset mb0'>
            <TabMenuItem
              path={donationPath}
              text='Ajustes'
              isActive={donationPath === location.pathname} />
            <TabMenuItem
              path={autofirePath}
              text='Mensagem agradecimento'
              isActive={autofirePath === location.pathname} />
            <TabMenuItem
              path={exportPath}
              text='Exportar dados de doações para CSV'
              isActive={exportPath === location.pathname} />
          </ul>
        </div>
      </div>
    )
  }
}
