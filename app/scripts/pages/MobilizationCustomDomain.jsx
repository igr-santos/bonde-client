import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as Paths from '../Paths'
import { Label, SaveButton, CloseButton } from './../components'
import { editMobilization } from './../reducers/mobilizations'

const validateCustomDomain = (data) => {
  const errors = { valid: true }
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
  if (data.customDomain && !regex.test(data.customDomain)) {
    errors.customDomain = 'Informe um domínio válido'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationCustomDomain }))
@reduxForm('mobilizationCustomDomain', validateCustomDomain)

export default class MobilizationCustomDomain extends Component {
  static propTypes = {
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    mobilizations: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    touchAll: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = { edited: false }
    props.initializeForm({customDomain: props.mobilization.custom_domain})
  }

  componentWillReceiveProps(nextProps) {
    const { mobilizations } = this.props
    if (mobilizations.editing !== nextProps.mobilizations.editing) {
      this.setState({
        edited: mobilizations.editing && !nextProps.mobilizations.editing
      })
    }
  }

  handleSubmit(event) {
    const { dispatch, data, auth, mobilization, initializeForm, valid, touchAll } = this.props
    event.preventDefault()

    if (valid) {
      dispatch(editMobilization({
        credentials: auth.credentials,
        id: mobilization.id,
        mobilization: {
          custom_domain: data.customDomain
        }
      }))
      initializeForm(data)
    } else {
      touchAll()
    }
  }

  render() {
    const {
      handleChange,
      handleBlur,
      data,
      mobilizations,
      mobilization,
      dirty,
      errors,
      touched
    } = this.props

    return (
      <div className="py3 px3 col col-8">
        <p className="h5">
          Você pode personalizar o endereço da sua mobilização caso já tenha um domínio.
          Preencha o campo abaixo e clique em Salvar.
          <form onSubmit={::this.handleSubmit}>
            <div className='mb1'>
              <Label>Domínio personalizado</Label>
            </div>
            <input
              type='text'
              className='field-light mr1'
              style={{width: '250px'}}
              placeholder='www.meudominio.com.br'
              onChange={handleChange('customDomain')}
              onBlur={handleBlur('customDomain')}
              value={data.customDomain}
            />
            <SaveButton
              saving={mobilizations.editing}
              saved={this.state.edited && !dirty}
              handleClick={::this.handleSubmit}
            />
            {errors.customDomain
              && touched.customDomain
              && <span className="red block">{errors.customDomain}</span>}
          </form>
        </p>
        <p>
          <strong>Atenção</strong>: você ainda precisa configurar o seu domínio no servidor de registro para que ele seja redirecionado para a página da sua mobilização. Para isso, utilize as informações abaixo.
        </p>
        <table>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Dados</th>
          </tr>
          <tr>
            <td><code>{data.customDomain}</code></td>
            <td><code>CNAME</code></td>
            <td><code>{mobilization.slug}.reboo.org</code></td>
          </tr>
        </table>
        <CloseButton dirty={dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}
