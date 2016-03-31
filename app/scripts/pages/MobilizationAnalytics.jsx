import React, { Component, PropTypes } from 'react'
import * as MobilizationActions from './../actions/MobilizationActions'
import * as Paths from '../Paths'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { CloseButton } from './../components'

function mobilizationAnalyticsValidation(data) {
  const errors = { valid: true }
  if (data.id && !/(UA|YT|MO)-\d+-\d+/i.test(data.id)) {
    errors.id = 'Informe uma ID válida'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationAnalytics }))
@reduxForm('mobilizationAnalytics', mobilizationAnalyticsValidation)
@reactMixin.decorate(Navigation)

export default class MobilizationAnalytics extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      error: null
    }
    props.initializeForm({id: props.mobilization.google_analytics_code})
  }

  componentWillReceiveProps() {
    this.state.initializing && this.setState({initializing: false})
    this.state.submitting && this.setState({submitting: false})
    this.state.submitting && this.setState({hasSubmitted: true})
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    touched: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    initializeForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    this.setState({ submitting: true, error: null, hasSubmitted: false })
    if (valid) {
      dispatch(MobilizationActions.editMobilization({
        id: mobilization.id,
        mobilization: {google_analytics_code: data.id},
        credentials: auth.credentials
      }))
      this.props.initializeForm({id: data.id})
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
      data: { id },
      errors: { id: idError },
      touched: { id: idTouched },
      handleChange,
      handleBlur
    } = this.props

    return (
      <form className="mt2 mb4" onSubmit={::this.handleSubmit}>
        <div className="mb1 h5 caps bold">
          <label
            style={{cursor: 'pointer'}}
            htmlFor="ga-code-input">
            ID do Google Analytics
          </label>
        </div>
        <div className="mb1">
          <input
            type="text"
            id="ga-code-input"
            placeholder="UA-00000000-0"
            className="field-light h3 mr1"
            onChange={handleChange('id')}
            onBlur={handleBlur('id')}
            value={id}
          />
          <input
            type="submit"
            className="caps button bg-aqua h4 p2"
            disabled={this.state.submitting || (this.state.hasSubmitted && !this.props.dirty)}
            value={this.state.submitting ? 'Confirmando...' : 'Confirmar'}
          />
        </div>
        {idError && idTouched && <span className="red block">{idError}</span>}
        {::this.renderErrorMessage()}
        { this.state.hasSubmitted && !this.props.dirty &&
          <div className="green">ID do Google Analytics confirmada!</div> }
      </form>
    )
  }

  render() {
    const { dirty } = this.props
    return (
      <div className="py3 px3 col col-8">
        <p className="h5">
          Para acompanhar os resultados da sua mobilização, você precisa configurar
          uma conta no Google Analytics. Siga os passos abaixo:
        </p>
        <ol className="h5">
          <li>
            Crie uma conta no Google Analytics
            <a href="http://www.google.com/analytics/" target="_blank"> clicando aqui</a>
          </li>
          <li>
            Obtenha sua ID de acompanhamento no Google Analytics. É um código
            que começa sempre com as letras UA, que você verá após criar sua conta lá.
          </li>
          <li>
            Copie a ID de acompanhamento e cole no campo abaixo:
            { !this.state.initializing && this.renderForm() }
          </li>
          <li>
            Pronto! Você já pode acompanhar as estatísticas da sua mobilização
            no Google Analytics!
          </li>
        </ol>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}
