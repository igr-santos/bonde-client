import React from 'react'
import { Entity } from 'draft-js'


const Link = ({ children, entityKey }) => {

  const { href } = Entity.get(entityKey).getData()

  return (
    <a href={href} title={`Link: ${href}`}>{children}</a>
  )
}

export const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

export default Link
