import { Draft } from './draft/components'
import { Content } from './content/components'

export default [
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
      content: 'Clique aqui para editar'
    }
  }
]
