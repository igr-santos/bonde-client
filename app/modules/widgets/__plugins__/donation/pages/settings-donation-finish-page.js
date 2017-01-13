import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { TellAFriend } from '../../../../../scripts/components'
import {
  FormRedux,
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel
} from '../../../../../scripts/Dashboard/Forms'
import { SettingsPageLayout, SettingsPageContentLayout } from '../../../../../components/Layout'
import Editor from '../../../../../scripts/RebooEditor'

// Parent module dependencies
import {
  actions as WidgetActions
} from '../../../../../modules/widgets'

// Current module dependencies
import { SettingsMenu } from '../components'

const SettingsDonationFinishPage = props => {
  const {
    fields: {
      donation_finish_message_type: donationFinishMessageType
    },
    mobilization,
    widget,
    donationFinishMessage,
    ...rest
  } = props
  const { color_scheme: colorScheme } = mobilization

  const handleSubmit = values => {
    const { asyncWidgetUpdate, widget } = props
    asyncWidgetUpdate({
      ...widget,
      settings: { ...widget.settings, ...values }
    })
  }

  return (
    <SettingsPageLayout>
      <SettingsMenu
        {...rest}
        mobilization={mobilization}
        widget={widget}
      />
      <SettingsPageContentLayout>
        <FormRedux
          {...rest}
          className='transparent'
          floatButton='Salvar'
          onSubmit={handleSubmit}
          successMessage='Formulário de doação configurado com sucesso!'
        >
          <FormGroup controlId='payment-type-id' {...donationFinishMessageType}>
            <ControlLabel>Tipo de doação</ControlLabel>
            <RadioGroup>
              <Radio value='share'>Compartilhar</Radio>
              <Radio value='custom'>Customizado</Radio>
            </RadioGroup>
          </FormGroup>

          <label className='h5 darkengray caps mb1 block'>Preview</label>
          {donationFinishMessageType.value === 'share' && (
            <TellAFriend
              mobilization={mobilization}
              message={'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'}
              href={Paths.mobilization(mobilization)}
            />
          )}
          {donationFinishMessageType.value === 'custom' && (
            <div className='relative'>
              <Editor
                value={JSON.parse(donationFinishMessage)}
                theme={colorScheme.replace('-scheme', '')}
                toolbarStyle={{ left: 0 }}
                containerStyle={{ minHeight: 130 }}
                focusStyle={{
                  border: '1px solid #51a7e8',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)',
                  top: 58
                }}
                editorStyle={{
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  border: '1px solid #efefef'
                }}
                handleSave={rawContent => {
                  const { widget, asyncWidgetUpdate } = props
                  const settings = widget.settings || {}
                  asyncWidgetUpdate({
                    ...widget,
                    settings: {
                      ...settings,
                      donation_finish_message: JSON.stringify(rawContent),
                      donation_finish_message_type: donationFinishMessageType.value
                    }
                  })
                }}
              />
            </div>
          )}
        </FormRedux>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

SettingsDonationFinishPage.propTypes = {
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

const fields = [
  'donation_finish_message_type'
]

const validate = values => {
  const errors = {}
  if (!values.donation_finish_message_type) {
    errors.donation_finish_message_type = 'Nenhum tipo de mensagem foi selecionado'
  }
  return errors
}

const mapStateToProps = (state, { widget: { settings } }) => ({
  initialValues: {
    donation_finish_message_type: settings.donation_finish_message_type || 'custom'
  },
  donationFinishMessage: settings.donation_finish_message || 'Clique aqui para editar...'
})

export default reduxForm(
  { form: 'settingsDonationFinishPage', fields, validate },
  mapStateToProps,
  WidgetActions
)(SettingsDonationFinishPage)
