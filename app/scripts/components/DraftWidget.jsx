import React, { PropTypes } from 'react'
import { Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../Widget/actions'

export default class DraftWidget extends React.Component {
  static propTypes = {
    dispatch     : PropTypes.func.isRequired,
    auth         : PropTypes.object.isRequired,
    mobilization : PropTypes.object.isRequired,
    widget       : PropTypes.object.isRequired,
    editable     : PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  updateKind(kind) {
    const { dispatch, auth } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    let widgetParams = { kind }

    if (kind === 'form') {
      widgetParams = {
        ...widgetParams,
        settings: {email_text: 'Obrigado por apostar na força da ação coletiva '
          + 'em rede. Sua participação é muito importante e, agora, precisamos da '
          + 'sua ajuda para que mais gente colabore com esta mobilização. '
          + 'Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço'
        }
      }
    }

    if (kind === 'content') {
      widgetParams = {
        ...widgetParams,
        settings: { content: 'Clique aqui para editar...' }
      }
    }

    if (kind === 'match') {
      widgetParams = {
        ...widgetParams,
        settings: {
          title_text: 'Clique para configurar suas combinações...',
        }
      }
    }

    if (kind === 'pressure') {
      const { auth: { user } } = this.props
      widgetParams = {
        ...widgetParams,
        settings: {
          main_color: '#f23392',
          title_text: 'Envie um e-mail para quem pode tomar essa decisão',
          button_text: 'Enviar e-mail',
          reply_email: user.email
        }
      }
    }

    this.setState({loading: true})
    // TODO: change it to use the new pattern for reducer actions
    bindedWidgetActions.editWidget({
      mobilization_id: this.props.mobilization.id,
      widget_id: this.props.widget.id,
      widget: widgetParams,
      credentials: auth.credentials
    })
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  renderDraft() {
    if (this.props.editable) {
      return (
        <div className="widget border center p2" style={{borderStyle: 'dashed'}}>
          <h4>Escolha uma das opções abaixo</h4>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-content"
            onClick={() => this.updateKind('content')}>
            Texto
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-form"
            onClick={() => this.updateKind('form')}>
            Formulário
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-donation"
            onClick={() => this.updateKind('donation')}>
            Doação
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-match"
            onClick={() => this.updateKind('match')}>
            Match
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-pressure"
            onClick={() => this.updateKind('pressure')}>
            Pressão
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderDraft()}
        {this.renderLoading()}
      </div>
    )
  }
}
