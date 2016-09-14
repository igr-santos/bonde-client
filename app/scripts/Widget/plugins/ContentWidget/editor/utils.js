import { EditorState, SelectionState, ContentBlock, CharacterMetadata, Entity, Modifier } from 'draft-js'

const createEntity = (type, mutability, data) => {
  return Entity.create(type, mutability, data)
}

export const setLinkToSelection = (editorState, data) => {
  const currentContent = editorState.getCurrentContent()
  const entity = getEntityAtCursor(editorState)

  let entityKey
  let targetSelection

  if (!entity) {
    entityKey = Entity.create('LINK', 'MUTABLE', data)
    targetSelection = editorState.getSelection()
  } else {
    const { blockKey, entityKey, startOffset, endOffset } = entity
    Entity.mergeData(entityKey, data)
    // Select all the entity to apply remake
    const selectionState = SelectionState.createEmpty(blockKey)
    targetSelection = selectionState.merge({ anchorOffset: startOffset, focusOffset: endOffset })
  }

  const newContentState = Modifier.applyEntity(currentContent, targetSelection, entityKey)
  return EditorState.push(editorState, newContentState, 'apply-entity')
}

export const unsetLinkToSelection = (editorState) => {
  const currentContent = editorState.getCurrentContent()
  const entity = getEntityAtCursor(editorState)
  if (entity) {
    const { blockKey, startOffset, endOffset } = entity
    const selectionState = SelectionState.createEmpty(blockKey)
    const targetSelection = selectionState.merge({ anchorOffset: startOffset, focusOffset: endOffset })
    // TODO: Check if not remove all entities between the selection
    const newContentState = Modifier.applyEntity(currentContent, targetSelection, null)
    return EditorState.push(editorState, newContentState, 'apply-entity')
  }
  console.warn('Reboo:', 'unset link to selection without link, disable button when unselect link')
}

const getEntityAtOffset = (block, offset) => {
  let entityKey = block.getEntityAt(offset)
  if (entityKey == null) {
    return null
  }
  let startOffset = offset
  while (startOffset > 0 && block.getEntityAt(startOffset - 1) === entityKey) {
    startOffset -= 1
  }
  let endOffset = startOffset
  let blockLength = block.getLength()
  while (endOffset < blockLength && block.getEntityAt(endOffset + 1) === entityKey) {
    endOffset += 1
  }
  return {
    entityKey,
    blockKey: block.getKey(),
    startOffset,
    endOffset: endOffset + 1,
  }
}

export const getEntityAtCursor = editorState => {
  let selection = editorState.getSelection()
  let startKey = selection.getStartKey()
  let startBlock = editorState.getCurrentContent().getBlockForKey(startKey)
  let startOffset = selection.getStartOffset()
  if (selection.isCollapsed()) {
    // Get the entity before the cursor (unless the cursor is at the start).
    return getEntityAtOffset(startBlock, startOffset === 0 ? startOffset : startOffset - 1)
  }
  if (startKey !== selection.getEndKey()) {
    return null
  }
  let endOffset = selection.getEndOffset()
  let startEntityKey = startBlock.getEntityAt(startOffset);
  for (let i = startOffset; i < endOffset; i++) {
    let entityKey = startBlock.getEntityAt(i)
    if (entityKey == null || entityKey !== startEntityKey) {
      return null
    }
  }
  return {
    entityKey: startEntityKey,
    blockKey: startBlock.getKey(),
    startOffset: startOffset,
    endOffset: endOffset,
  }
}

export const clearEntityForRange = (editorState, blockKey, startOffset, endOffset) => {
  let contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  let block = blockMap.get(blockKey)
  let charList = block.getCharacterList()
  let newCharList = charList.map((char, i) => {
    if (i >= startOffset && i < endOffset) {
      return CharacterMetadata.applyEntity(char, null)
    }
    return char
  })
  let newBlock = block.set('characterList', newCharList)
  let newBlockMap = blockMap.set(blockKey, newBlock)
  let newContentState = contentState.set('blockMap', newBlockMap)
  return EditorState.push(editorState, newContentState, 'apply-entity')
}
