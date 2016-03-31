import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as Paths from '../Paths'
import { FormWidgetMenu, Loading, CloseButton, Label } from './../components'
import {reduxForm} from 'redux-form'

function widgetFormValidation() {
  const errors = { valid: true }
  return errors
}

@connect(state => ({ form: state.widgetForm }))
@reduxForm('widgetForm', widgetFormValidation)
export default class FormWidgetForm extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      hasSubmitted: false,
      error: null
    }
    this.props.initializeForm({callToAction: null, buttonText: null, countText: null, emailText: null })
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)
    if (widget) {
      if (this.state.initializing) {
        const { call_to_action: callToAction, button_text: buttonText, count_text: countText, email_text: emailText } = (widget.settings || {call_to_action: null, button_text: null, count_text: null, email_text: null})
        this.props.initializeForm({callToAction, buttonText, countText, emailText})
        this.setState({initializing: false})
      }
      this.state.submitting && this.setState({submitting: false})
      this.state.submitting && this.setState({hasSubmitted: true})
    }
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const widget = this.widget()
    const { settings } = widget
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    this.setState({ submitting: true, hasSubmitted: false, error: null })
    if (valid) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...settings,
          call_to_action: data.callToAction,
          button_text: data.buttonText,
          count_text: data.countText,
          email_text: data.emailText
        } }
      })
      this.props.initializeForm({callToAction: data.callToAction, buttonText: data.buttonText, countText: data.countText, emailText: data.emailText })
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
      )
    }
  }

  renderForm() {
    const {
      data: { callToAction, buttonText, countText, emailText },
      errors: { callToAction: callToActionError, buttonText: buttonTextError, countText: countTextError, emailText: emailTextError },
      touched: { callToAction: callToActionTouched, buttonText: buttonTextTouched, countText: countTextTouched, emailText: emailTextTouched },
      handleChange,
      handleBlur,
      dirty
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit}>
        <Label htmlFor="formTitle">Título do formulário</Label>
        {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
        <textarea
          id="formTitle"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: Preencha o formulário abaixo para assinar a petição."
          style={{height: '160px'}}
          value={callToAction}
          onChange={handleChange('callToAction')}
          onBlur={handleBlur('callToAction')} />

        <Label htmlFor="buttonText">Botão</Label>
        {buttonTextError && buttonTextTouched && <span className="red ml2">{buttonTextError}</span>}
        <input
          id="buttonText"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Defina o texto do botão de confirmação do formulário."
          style={{height: '48px'}}
          value={buttonText}
          onChange={handleChange('buttonText')}
          onBlur={handleBlur('buttonText')} />

        <Label htmlFor="counterText">Contador</Label>
        {countTextError && countTextTouched && <span className="red ml2">{countTextError}</span>}
        <input
          id="counterText"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Defina o texto que ficará ao lado do número de pessoas que agiram."
          style={{height: '48px'}}
          value={countText}
          onChange={handleChange('countText')}
          onBlur={handleBlur('countText')} />

        <Label htmlFor="thankYouEmailText">Email de agradecimento</Label>
        {emailTextError && emailTextTouched && <span className="red ml2">{emailTextError}</span>}
        <textarea
          id="thankYouEmailText"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo. Um abraço."
          rows={5}
          value={emailText}
          onChange={handleChange('emailText')}
          onBlur={handleBlur('emailText')} />

        <div className="clearfix">
          <button
            className="caps button bg-darken-3 h3 mt1 mr2"
            disabled={this.state.submitting}
            onClick={::this.handleCancelClick}>
            Cancelar
          </button>
          <input
            type="submit"
            className={classnames('caps button bg-aqua h3 mt1')}
            disabled={this.state.submitting || (!dirty)}
            value={this.state.submitting ? 'Salvando...' : 'Salvar'} />
        </div>

        {::this.renderErrorMessage()}
        { this.state.hasSubmitted && !dirty &&
          <div className="green mt2">Configurações do formulário atualizadas!</div> }
      </form>
    )
  }

  renderPage() {
    const { widgets, dirty } = this.props
    const widget = widgets.data[widgets.data.map((w) => { return w.id.toString()}).indexOf(this.props.params.widget_id)]
    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <FormWidgetMenu {...this.props} widget={widget} />
        <div className="p3 flex-auto overflow-scroll">
          { !this.state.initializing && this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    return (this.props.widgets.data.length > 0 ? this.renderPage() : this.renderLoading())
  }
}
