import React, { PropTypes } from 'react'
import classnames from 'classnames'
import $ from 'jquery'
import reactMixin from 'react-mixin'
import * as Paths from './../../Paths'
import { Navigation } from 'react-router'
import { bindActionCreators } from 'redux'
import * as FormEntryActions from './../../actions/FormEntryActions'
import { FormWidgetInput, FormWidgetButton } from './../'
import TellAFriend from './../shared/TellAFriend.jsx'

// Unrestrictive email regex. See http://is.gd/7n5YOk
const emailRegEx = /[^@]+@[^@]+/

@reactMixin.decorate(Navigation)

export default class FormWidget extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    configurable: PropTypes.bool,
    hasNewField: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      loading: false,
      success: false,
      errors: []
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  fields() {
    const { settings } = this.props.widget
    return (settings && settings.fields ? settings.fields : [])
  }

  handleMouseEnter() {
    this.setState({hasMouseOver: true})
  }

  handleMouseLeave() {
    this.setState({hasMouseOver: false})
  }

  handleClick() {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      this.transitionTo(Paths.fieldsMobilizationWidget(mobilization.id, widget.id))
    }
  }

  submit() {
    if (!this.props.editable) {
      const { dispatch, mobilization, widget } = this.props
      const { settings } = widget
      const { fields } = settings
      const bindedFormEntryActions = bindActionCreators(FormEntryActions, dispatch)
      const fieldsWithValue = fields.map((field) => {
        return {...field, value: $('#input-' + field.uid).val()}
      })
      const errors = this.validate(fieldsWithValue)
      this.setState({errors: errors})

      if (errors.length === 0) {
        this.setState({loading: true})
        bindedFormEntryActions.addFormEntry({
          mobilization_id: mobilization.id,
          form_entry: {
            widget_id: widget.id,
            fields: JSON.stringify(fieldsWithValue)
          }
        })
      }
    }
  }

  validate(fieldsWithValue) {
    const errors = []
    fieldsWithValue.forEach((field) => {
      if (field.required === 'true' && field.value === '') {
        errors.push(`${field.label} não pode ficar em branco`)
      } else if (field.value !== '' && field.kind === 'email' && !field.value.match(emailRegEx)) {
        errors.push(`${field.label} inválido`)
      }
    })
    return errors
  }

  renderCallToAction() {
    const { configurable, widget } = this.props
    let callToAction = widget.settings && widget.settings.call_to_action ? widget.settings.call_to_action : 'Clique para configurar seu formulário...'
    callToAction = callToAction.replace('\n', '<br/><br/>')
    if (!configurable) {
      return <h2 className="mt0 mb3 center" dangerouslySetInnerHTML={{__html: callToAction}} />
    }
  }

  renderFields() {
    const fields = this.fields()
    return fields.map((field, index) => {
      return (
        <FormWidgetInput
          {...this.props}
          key={field.uid}
          uid={field.uid}
          canMoveUp={index !== 0}
          canMoveDown={index !== fields.length - 1}
          initializeEditing={this.props.hasNewField && index === fields.length - 1}
          field={field} />
      )
    })
  }

  renderButton() {
    const { configurable, widget } = this.props
    const { loading, success } = this.state

    if (!configurable) {
      return (
        <FormWidgetButton
          buttonText={(widget.settings ? (widget.settings.button_text || 'Enviar') : 'Enviar')} {...this.props}
          handleClick={::this.submit}
          loading={loading}
          success={success} />
      )
    }
  }

  renderCount() {
    const { configurable, widget, mobilization: { body_font: bodyFont }} = this.props
    if (!configurable) {
      return (
        <div className={classnames('mt2 h3 center', `${bodyFont}-body`)}>
          {widget.form_entries_count}
          &nbsp;
          {widget.settings && widget.settings.count_text ? widget.settings.count_text : 'assinaturas'}
        </div>
      )
    }
  }

  renderOverlay() {
    const { editable, configurable } = this.props
    if (editable && !configurable && this.state.hasMouseOver) {
      return (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold flex flex-center"
          style={{zIndex: 9998}}>
          <div className="center full-width white">Clique para editar</div>
        </div>
      )
    }
  }

  renderErrors() {
    const { errors } = this.state

    return (
      errors.length > 0 &&
      <div className="red bold mb1">
        {
          errors.map((error) => {
            return(
              <div
                className="p1 border-left border-red mb1 rounded-right"
                style={{backgroundColor: '#F9CACE', borderWidth: '8px'}}>
                {error}
              </div>
            )
          })
        }
      </div>
    )
  }

  renderShareButtons() {
    const fields = this.fields()
    let message = ''
    fields.map((field) => {
      if (field.kind === 'greetings') {
        message = field.placeholder
      }
    })
    if (message === '') {
      return <TellAFriend {...this.props} message="Formulário submetido com sucesso!" />
    } else {
      return <p className="center p2 bg-darken-3">{message}</p>
    }
  }

  renderForm() {
    const { editable, configurable } = this.props
    const className = classnames({'p3 bg-darken-3 relative': editable || !configurable})

    return (
      <div>
        <div className={className}>
          { this.renderCallToAction() }
          { this.renderFields() }
          { this.renderErrors() }
          { this.renderButton() }
          { this.renderOverlay() }
        </div>
      </div>
    )
  }

  render() {
    const {
      editable,
      mobilization: { header_font: headerFont }
    } = this.props

    const { success } = this.state

    return (
      <div>
        <div
          className={`widget ${headerFont}-header`}
          style={(editable ? {cursor: 'pointer'} : null)}
          onMouseEnter={::this.handleMouseEnter}
          onMouseLeave={::this.handleMouseLeave}
          onClick={::this.handleClick}>
          { success ? this.renderShareButtons() : this.renderForm() }
          { this.renderCount() }
        </div>
      </div>
    )
  }
}
