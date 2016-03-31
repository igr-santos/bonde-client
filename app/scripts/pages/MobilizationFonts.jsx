import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'
import * as Paths from '../Paths'
import * as MobilizationActions from './../actions/MobilizationActions'
import { TabMenuItem, CloseButton } from '../components'

function mobilizationFontsValidation(data) {
  const errors = { valid: true }
  if (!data.headerFont) {
    errors.headerFont = 'Você deve escolher uma fonte para títulos'
    errors.valid = false
  }
  if (!data.bodyFont) {
    errors.bodyFont = 'Você deve escolher uma fonte para textos'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationFonts }))
@reduxForm('mobilizationFonts', mobilizationFontsValidation)

export default class MobilizationFonts extends Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      submitting: false,
      hasSubmitted: false,
      error: null
    }
    this.initializeForm()
  }

  componentWillReceiveProps() {
    this.state.submitting && this.setState({submitting: false})
    this.state.submitting && this.setState({hasSubmitted: true})
  }

  initializeForm() {
    const { initializeForm, mobilization: { header_font: headerFont, body_font: bodyFont } } = this.props

    initializeForm({
      headerFont: headerFont,
      bodyFont: bodyFont
    })
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.initializeForm()
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization, auth, initializeForm } = this.props
    this.setState({ submitting: true, hasSubmitted: false, error: null })

    if (valid) {
      dispatch(MobilizationActions.editMobilization({
        id: mobilization.id,
        credentials: auth.credentials,
        mobilization: {
          header_font: data.headerFont,
          body_font: data.bodyFont
        }
      }))
      initializeForm(data)
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderMenu() {
    const { mobilization, location } = this.props
    const fontsMobilizationPath = Paths.fontsMobilization(mobilization.id)

    return (
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Estilo da Página</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={fontsMobilizationPath}
              text="Fontes"
              isActive={fontsMobilizationPath === location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }

  renderCancelButton() {
    return (
      <button
        className="caps button bg-darken-3 h3 mt1 mr2"
        disabled={this.state.submitting}
        onClick={::this.handleCancelClick}>
        Cancelar
      </button>
    )
  }

  renderFontSelect(field, value) {
    const { handleChange, handleBlur } = this.props

    return (
      <select
        className="field-light block h3 mt1 mb2"
        style={{height: '48px'}}
        onChange={handleChange(field)}
        onBlur={handleBlur(field)}
        value={value}>
        <option value="armata">Armata</option>
        <option value="arvo">Arvo</option>
        <option value="dosis">Dosis</option>
        <option value="glegoo">Glegoo</option>
        <option value="lato">Lato</option>
        <option value="merriweather">Merriweather</option>
        <option value="merriweather-sans">Merriweather Sans</option>
        <option value="open-sans">Open Sans</option>
        <option value="oswald">Oswald</option>
        <option value="pfdin">PF Din</option>
        <option value="proxima-nova">Proxima Nova</option>
        <option value="pt-mono">PT Mono</option>
        <option value="ubuntu">Ubuntu</option>
      </select>
    )
  }

  renderForm() {
    const {
      data: { headerFont, bodyFont },
      errors: { headerFont: headerFontError, bodyFont: bodyFontError },
      touched: { headerFont: headerFontTouched, bodyFont: bodyFontTouched },
      dirty
    } = this.props

    return (
      <form onSubmit={ ::this.handleSubmit }>
        <label className="block h4 caps bold mb1">Fonte dos títulos</label>
        { headerFontError && headerFontTouched && <span className="h5 red bold">{headerFontError}</span> }

        { this.renderFontSelect('headerFont', headerFont) }

        <div className={classnames('bg-white border rounded p2 mb3 lg-col-6', `${headerFont}-header`)}>
          <h1 className="m0">Os títulos ficarão assim</h1>
        </div>

        <label className="block h4 caps bold mb1">Fonte do texto</label>
        { bodyFontError && bodyFontTouched && <span className="h5 red bold">{bodyFontError}</span> }

        { this.renderFontSelect('bodyFont', bodyFont) }

        <div className={classnames('bg-white border rounded p2 mb3 lg-col-6', `${bodyFont}-body`)}>
          <p className="m0">Os textos ficarão assim.</p>
        </div>

        <div className="clearfix">
          { this.renderCancelButton() }
          <input
            type="submit"
            className="caps button bg-aqua h3 mt1"
            disabled={this.state.submitting || (!dirty)}
            value={this.state.submitting ? 'Salvando...' : 'Salvar'} />
        </div>

        { this.state.hasSubmitted && !dirty &&
          <div className="green mt2">Configurações de fontes atualizadas!</div> }
      </form>
    )
  }

  render() {
    const { mobilization, dirty } = this.props
    return (
      <div className="flex-auto bg-silver gray relative">
        { this.renderMenu() }
        <div className="py3 px4">
          { this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}
