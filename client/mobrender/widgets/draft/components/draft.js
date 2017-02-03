import React from 'react'
import DraftButton from './draft-button'
import widgets from '~client/mobrender/widgets/config'

const Draft = ({ widget, update }) => {

  const updateKind = props => update({...widget, ...props})
  const widgetsConfig = widgets.filter(w => w.kind !== 'draft')

  return (
    <div className='draft-widget widget center rounded lightgray clearfix'>
      {widgetsConfig.map(wc => {
        const { component, ...props } = wc
        return <DraftButton updateKind={updateKind} {...props} />
      })}
    </div>
  )
}

export default Draft
