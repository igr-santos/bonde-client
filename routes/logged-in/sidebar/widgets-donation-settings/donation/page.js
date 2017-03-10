import React, { PropTypes } from 'react'

import {
  FormRedux,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  RadioGroup,
  Radio,
  ColorPicker
} from '~components/forms'
import { HorizontalLayout } from '~components/grids'

const DonationSettingsPage = props => {
  const {
    dispatch,
    fields: {
      title_text, button_text, main_color, default_donation_value, donation_value1,
      donation_value2, donation_value3, donation_value4, donation_value5, recurring_period,
      payment_methods, payment_type
    },
    ...formProps
  } = props
  const { mobilization: { color_scheme: colorScheme } } = props
  const donationValueTitle = 'Clique para definir este valor como padrão.'

  return (
    <FormRedux
      {...formProps}
      className='transparent'
      floatButton='Salvar'
      onSubmit={values => {
        const { widget, asyncWidgetUpdate } = props
        const settings = widget.settings || {}
        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values }
        })
      }}
      successMessage='Formulário de doação configurado com sucesso!'
    >
      <FormGroup controlId='title-text-id' {...title_text}>
        <ControlLabel>Título do bloco de doação</ControlLabel>
        <FormControl type='text' placeholder='Ex.: Escolha um valor e contribua agora!' />
      </FormGroup>

      <FormGroup controlId='payment-type-id' {...payment_type}>
        <ControlLabel>Tipo de doação</ControlLabel>
        <RadioGroup>
          <Radio value='unique'>Única</Radio>
          <Radio value='recurring'>Recorrente</Radio>
          <Radio value='users_choice'>Usuário escolhe</Radio>
        </RadioGroup>
      </FormGroup>

      {(payment_type.value == 'recurring' || payment_type.value == 'users_choice') ?
        <FormGroup controlId='payment-type-id' {...recurring_period}>
          <ControlLabel>Intervalo da recorrência</ControlLabel>
          <RadioGroup>
            <Radio value='30'>Mensal</Radio>
            <Radio value='180'>Semestral</Radio>
            <Radio value='365'>Anual</Radio>
          </RadioGroup>
        </FormGroup> : ''}

      <FormGroup controlId='main-color-id' {...main_color}>
        <ControlLabel>Defina a cor da página de pagamento</ControlLabel>
        <HelpBlock>
          Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.
        </HelpBlock>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>

      <FormGroup controlId='default-donation-value' {...default_donation_value}>
        <ControlLabel>Defina os valores para o bloco de doação</ControlLabel>
        <HelpBlock>
          Você pode ter até 5 valores por bloco de doação. Preencha apenas com números
          inteiros (Ex: 50)
        </HelpBlock>
        <HorizontalLayout cols={5}>
          <FormGroup controlId='donation-value1-id' {...donation_value1}>
            <ControlLabel>Valor 1</ControlLabel>
            <FormControl type='number' placeholder='R$20' />
          </FormGroup>
          <FormGroup controlId='donation-value2-id' {...donation_value2}>
            <ControlLabel>Valor 2</ControlLabel>
            <FormControl type='number' placeholder='R$50' />
          </FormGroup>
          <FormGroup controlId='donation-value3-id' {...donation_value3}>
            <ControlLabel>Valor 3</ControlLabel>
            <FormControl type='number' placeholder='R$100' />
          </FormGroup>
          <FormGroup controlId='donation-value4-id' {...donation_value4}>
            <ControlLabel>Valor 4</ControlLabel>
            <FormControl type='number' placeholder='R$200' />
          </FormGroup>
          <FormGroup controlId='donation-value5-id' {...donation_value5}>
            <ControlLabel>Valor 5</ControlLabel>
            <FormControl type='number' placeholder='R$500' />
          </FormGroup>
        </HorizontalLayout>
        <RadioGroup className='flex flex-wrap' style={{marginTop: '-1rem' }}>
          <Radio className='col col-2' title={donationValueTitle} value='1'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='2'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='3'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='4'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='5'>Default</Radio>
        </RadioGroup>
        <HelpBlock>*todos os valores são em reais</HelpBlock>
      </FormGroup>

      <FormGroup controlId='button-text-id' {...button_text}>
        <ControlLabel>Texto do botão de doação</ControlLabel>
        <FormControl type='text' placeholder='Ex.: Doe agora!' />
      </FormGroup>

      <FormGroup controlId='payment-methods-id' {...payment_methods}>
        <ControlLabel>Habilitar pagamento por boleto?</ControlLabel>
        <HelpBlock>Cada boleto pago terá um custo adicional de R$3,00</HelpBlock>
        <RadioGroup>
          <Radio value='true'>Sim</Radio>
          <Radio value='false'>Não</Radio>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Conta bancária</ControlLabel>
        <HelpBlock>
          Este bloco de doação está associado à conta correspondente da cidade no Pagar.me.
        </HelpBlock>
      </FormGroup>
    </FormRedux>
  )
}

DonationSettingsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default DonationSettingsPage