import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { EditorState, ContentState, SelectionState, Entity } from 'draft-js'
import { setLinkToSelection } from '../../../utils'

import { LinkBar } from '../../components'

describe('<LinkBar />', () => {

  let linkBar
  const contentState = ContentState.createFromText("Lorem ipsum dolor")
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
    const entity = { type: 'LINK', data: {} }
    linkBar.setProps({ entity })

    const unlinkButton = linkBar.find('IconButton').at(1)
    expect(unlinkButton.props().disabled).to.equal(false)
  })

  it('should close dialogLink if hasnt selection word', () => {
    linkBar.setState({ showDialogLink: true })
    linkBar.setProps({ editorState: EditorState.moveSelectionToEnd(editorState) })
    expect(linkBar.find('input').length).to.equal(0)
  })

  describe('when has selection', () => {

    beforeEach(() => {
      const blockKey = editorState.getCurrentContent().getFirstBlock().getKey()
      const selectionState = SelectionState.createEmpty(blockKey)
      const targetSelection = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 5
      })

      linkBar.setProps({ editorState: EditorState.forceSelection(editorState, targetSelection) })
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

    describe('when dialog link opened', () => {

      beforeEach(() => {
        // simulate click to open
        linkBar.find('button').at(0).simulate('click')
      })

      it('should close dialog if clicked again', () => {
        linkBar.find('button').at(0).simulate('click')
        expect(linkBar.find('input').length).to.equal(0)
      })

      it('should close dialog if clicked confirm button', () => {
        linkBar.find('button.doneDialog').simulate('click')
        expect(linkBar.find('input').length).to.equal(0)
      })

      it('should close dialog if not select word', () => {
        const _editorState = linkBar.props().editorState
        // Move cursor to final text
        linkBar.setProps({ editorState: EditorState.moveSelectionToEnd(_editorState) })
        expect(linkBar.find('input').length).to.equal(0)
      })

      it('should create entity if confirm button', () => {
        const href = 'http://ourcities.org'
        let _editorState
        linkBar.setProps({ onChange: editorState => { _editorState = editorState } })
        linkBar.setState({ href })
        linkBar.find('button.doneDialog').simulate('click')

        const blockState = _editorState.getCurrentContent().getFirstBlock()
        const entity = Entity.get(blockState.getEntityAt(0))
        expect(entity.getData()).to.deep.equal({ href })
      })
    })

  })

  describe('when hasnt selection word, but cursor on top link', () => {

    beforeEach(() => {
      const blockKey = editorState.getCurrentContent().getFirstBlock().getKey()
      const selectionState = SelectionState.createEmpty(blockKey)

      // Select word Lorem to make link
      const targetSelection = selectionState.merge({ anchorOffset: 0, focusOffset: 5 })
      let newEditorState = EditorState.forceSelection(editorState, targetSelection)
      newEditorState = setLinkToSelection(newEditorState, { href: 'http://ourcities.org' })
      // Move cursor to final block for tests
      linkBar.setProps({ editorState: EditorState.moveSelectionToEnd(newEditorState) })
    })

    it('should enable link button if entity.type is "LINK"', () => {
      const entity = { type: 'LINK', data: {} }
      linkBar.setProps({ entity })

      const linkButton = linkBar.find('IconButton').at(0)
      expect(linkButton.props().disabled).to.equal(false)
    })

    it('should set href state if entity passed', () => {
      const _editorState = linkBar.props().editorState
      const blockState = _editorState.getCurrentContent().getFirstBlock()
      const entity = Entity.get(blockState.getEntityAt(0))

      // Move selection to mock cursor
      const selectionState = SelectionState.createEmpty(blockState.getKey())
      const targetSelection = selectionState.merge({ anchorOffset: 1, focusOffset: 1 })

      linkBar.setProps({ editorState: EditorState.forceSelection(_editorState, targetSelection), entity })
      expect(linkBar.instance().state.href).to.equal('http://ourcities.org')
    })

    it('should change url to entity select', () => {
      const linkEditorState = linkBar.props().editorState
      const href = 'http://nossas.org'
      let _editorState
      linkBar.setProps({ onChange: editorState => { _editorState = editorState } })
      linkBar.setState({ showDialogLink: true, href })

      linkBar.find('button.doneDialog').simulate('click')

      expect(_editorState).to.deep.equal(setLinkToSelection(linkEditorState, { href }))
    })
  })
})
