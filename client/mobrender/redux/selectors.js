
export default (state, props) => ({

  getMobilization: () => {
    const { list: { currentId, data } } = state.mobilizations
    return data.filter(mob => mob.id === currentId)[0]
  },

  hasMouseOver: (key, id) => {
    const { hover } = state.mobilizations
    if (key in hover) return hover[key] === id
    else return false
  },

  getBlocks: () => {
    const { blocks: { data } } = state.mobilizations
    return data
  },

  canMoveUp: () => {
    const { block } = props
    const { blocks: { data } } = state.mobilizations
    return data[0] && data[0].id !== block.id
  },

  canMoveDown: () => {
    const { block } = props
    const { blocks: { data } } = state.mobilizations
    const index = data.length-1
    return data[index] && data[index].id !== block.id
  }
})

export const getTemplate = (state, ownProps) => {
  const { list: { data }, templates: { list: { templateId } } } = state.mobilizations
  return data.filter(mob => mob.id === templateId)[0]
}

export const getList = state => state.mobilizations.list.data

export const getMenuActiveIndex = state => state.mobilizations.list.menuActiveIndex

export const isLoading = state => state.mobilizations.list.loading

export const isLoaded = state => state.mobilizations.list.isLoaded
