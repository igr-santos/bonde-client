import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { EditorState, ContentState, SelectionState } from 'draft-js'

import { LinkBar } from '../../components'

describe('<LinkBar />', () => {

  let linkBar
  const contentState = ContentState.createFromText('Lorem ipsum dolor')
  const editorState = EditorState.createWithContent(contentState)
  const defaultProps = {
    editorState: editorState,
    onChange: (editorState) => {}
  }

  beforeEach(() => {
    linkBar = mount(<LinkBar {...defaultProps} />)
  })

  it('should renders link and unlink button', () => {
    const buttons = linkBar.find('IconButton')
    expect(buttons.length).to.equal(2)

    const iconClassList = ['fa fa-link', 'fa fa-unlink']
    buttons.map(button => {
      expect(iconClassList).to.contain(button.props().iconClass)
    })
  })

  it('should enable unlink button when type entity return "LINK"', () => {
    const entity = { type: 'LINK' }
    linkBar.setProps({ entity })

    const unlinkButton = linkBar.find('IconButton').at(1)
    expect(unlinkButton.props().disabled).to.equal(false)
  })

  describe('when selection.isCollapsed() is false', () => {

    beforeEach(() => {
      const newEditorState = {
        ...editorState,
        getSelection: () => ({
          ...editorState.getSelection(),
          isCollapsed: () => false
        })
      }
      linkBar.setProps({ editorState: newEditorState })
    })

    it('should enable link button', () => {
      const linkButton = linkBar.find('IconButton').at(0)
      expect(linkButton.props().disabled).to.equal(false)
    })

    it('should open dialog link when click to insert link', () => {
      const linkButton = linkBar.find('button').at(0)
      linkButton.simulate('click')
      expect(linkBar.find('input').length).to.equal(1)
    })

  })

  describe('when selection.isCollapsed() is true', () => {

    beforeEach(() => {
      const newEditorState = {
        ...editorState,
        getSelection: () => ({
          ...editorState.getSelection(),
          isCollapsed: () => true
        })
      }
      linkBar.setProps({ editorState: newEditorState })
    })

    it('should enable link button if entity.type is "LINK"', () => {
      const entity = { type: 'LINK' }
      linkBar.setProps({ entity })

      const linkButton = linkBar.find('IconButton').at(0)
      expect(linkButton.props().disabled).to.equal(false)
    })
  })
})
