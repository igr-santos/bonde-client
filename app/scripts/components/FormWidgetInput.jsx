import React from 'react'
import TransitionGroup from 'react-addons-transition-group'
import classnames from 'classnames'
import { FormWidgetInputForm } from './'

export default class FormWidgetInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editing: this.props.initializeEditing
    }
  }

  handleMouseOver() {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut() {
    this.setState({hasMouseOver: false})
  }

  handleClick(event) {
    if (this.props.configurable) {
      event.stopPropagation()
      event.preventDefault()
      this.setState({editing: true})
    }
  }

  handleCloseForm() {
    this.setState({editing: false})
  }

  renderForm() {
    const { uid } = this.props
    return (
      <TransitionGroup>
        <FormWidgetInputForm {...this.props} onClose={::this.handleCloseForm} key={'form-' + uid} />
      </TransitionGroup>
    )
  }

  renderInstructions() {
    const { configurable } = this.props
    if (configurable && this.state.hasMouseOver) {
      return (
        <div className="right">
          <i className="fa fa-pencil-square-o mr1" />
          Clique para editar
        </div>
      )
    }
  }

  renderFieldKind() {
    const { field, uid, editable, configurable } = this.props

    if (field.kind === 'dropdown') {
      return (<select
        id={'input-' + uid}
        className="field-light block full-width h3"
        style={(editable || configurable ? {cursor: 'pointer'} : null)}
      >
        <option value="">Selecione...</option>
        {
          field.placeholder.split(',').map(function(v) {
            return <option>{v}</option>
          })
        }
      </select>)
    } else if (field.kind === 'greetings') {
      return (
        editable || configurable
        ? <p className="block full-width">
          <strong>Mensagem de sucesso alterada para:</strong>
          <br/>{field.placeholder}
          </p>
        : null
      )
    } else {
      return (<input
        id={'input-' + uid}
        className="field-light block full-width h3"
        style={(editable || configurable ? {cursor: 'pointer'} : null)}
        placeholder={field.placeholder}
        type='text'
      />)
    }
  }

  renderInput() {
    const {
      field,
      editable,
      configurable,
      mobilization: {
        body_font: bodyFont
      }
    } = this.props

    return (
      <div
        className={classnames('mb3', `${bodyFont}-form`)}
        onMouseEnter={::this.handleMouseOver}
        onMouseLeave={::this.handleMouseOut}
        style={(editable || configurable ? {cursor: 'pointer'} : null)}
        onClick={::this.handleClick}>
        <label
          className="h4 caps bold mb1"
          style={(editable || configurable ? {cursor: 'pointer'} : null)}>
          {field.label}{field.required === 'true' ? ' *' : null}
        </label>
        { this.renderInstructions() }
        { this.renderFieldKind() }
      </div>
    )
  }

  render() {
    return (this.state.editing ? this.renderForm() : this.renderInput())
  }
}
