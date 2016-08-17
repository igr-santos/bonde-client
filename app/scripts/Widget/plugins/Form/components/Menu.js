import React, { PropTypes } from 'react'
import * as Paths from './../../../../Paths'
import { TabMenuItem } from './../../../../components'

const Menu = ({ mobilization, widget, location }) => {
  const fieldsPath = Paths.fieldsMobilizationWidget(mobilization.id, widget.id)
  const formPath = Paths.formMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)
  const exportPath = Paths.exportWidgetData(mobilization.id, widget.id)

  return (
    <div className='bg-white px3 clearfix'>
      <h2 className='mb3'>Configure o formulário da sua ação</h2>
      <div>
        <ul className='list-reset mb0'>
          <TabMenuItem
            path={fieldsPath}
            text='Campos do formulário'
            isActive={fieldsPath === location.pathname} />
          <TabMenuItem
            path={formPath}
            text='Ajustes'
            isActive={formPath === location.pathname} />
          <TabMenuItem
            path={autofirePath}
            text='Mensagem agradecimento'
            isActive={autofirePath === location.pathname} />
          <TabMenuItem
            path={exportPath}
            text='Relatório'
            isActive={exportPath === location.pathname} />
        </ul>
      </div>
    </div>
  )
}

Menu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Menu