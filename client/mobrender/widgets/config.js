import { Draft } from './draft/components'
import {
  Pressure,
  Form,
  Content,
  Donation
} from '~client/mobilizations/widgets/__plugins__'
import { createEditorContent } from '~client/mobilizations/widgets/__plugins__/content/components/editor-slate'
import * as Paths from '~client/paths'

export default (mobilization, widget) => [
  {
    component: Draft,
    kind: 'draft',
    settings: {}
  },
  {
    component: Content,
    kind: 'content',
    icon: 'font',
    label: 'Texto',
    settings: {
      content: createEditorContent('Clique aqui para editar...')
    }
  },
  {
    component: Form,
    kind: 'form',
    icon: 'list',
    label: 'Formulário',
    settings: {
      email_text: `Obrigado por apostar na força da ação coletiva em
      rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que
      mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um
      dos links abaixo.\n\nUm abraço`
    },
    redirect: Paths.formMobilizationWidget(mobilization.id, widget.id)
  },
  {
    component: Pressure,
    kind: 'pressure',
    icon: 'bullseye',
    label: 'Pressão',
    settings: {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail'
      /* reply_email: user.email */
    },
    redirect: Paths.pressure(mobilization.id, widget.id)
  },
  {
    component: Donation,
    kind: 'donation',
    icon: 'money',
    label: 'Doação',
    redirect: Paths.donation(mobilization.id, widget.id)
  }
]
