import React from 'react'

import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as Paths from './../../Paths'
import MatchWidget from './MatchWidget'

describe('MatchWidget', () => {
  let component
  let sandbox
  let spy = {}

  let mockContext = {
    router: { transitionTo: sinon.spy() }
  }

  let props = {
    editable: true,
    mobilization: { id: 1 },
    widget: { widget: 1, settings: {
      choices1: 'Framboesa,Auxílio Terno',
      choicesA: 'Hospital,Escola',
      title_text: 'Foo Bar Widget Title!',
      labelChoices1: 'Foo Bar Choice1 Label!',
      labelChoicesA: 'Foo Bar ChoiceA Label!'
    }, match_list: [{
      first_choice: 'Framboesa',
      second_choice: 'Hospital',
      goal_image: 'test.img'
    }] }
  }

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    component = shallow(<MatchWidget {...props} />, { context: mockContext })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    it(`should call renderChoices method when it isn\'t combined`, () => {
      spy.renderChoices = sandbox.spy(MatchWidget.prototype, 'renderChoices')
      expect(spy.renderChoices).to.have.been.called
    })

    it(`should call renderShareButtons method when it is combined`, () => {
      component.setState({ combined: true })
      spy.renderShareButtons = sandbox.spy(MatchWidget.prototype, 'renderShareButtons')
      expect(spy.renderShareButtons).to.have.been.called
    })
  })

  describe('#renderChoices', () => {
    context('when passing props', () => {
      it('should render two <Choices> component', () => {
        expect(component.find('Choices').length).to.equal(2)
      })

      it('second choices should be disabled', () => {
        expect(component.find('Choices').at(1).props().disabled).to.equal(true)
      })

      it('match button should be disabled', () => {
        expect(component.find('button.match').props().disabled).to.equal(true)
      })

      it('should enable second choices after selects first choice', () => {
        const target = { value: props.widget.settings.choices1.split(',')[1] }
        component.find('Choices').at(0).simulate('change', { target })
        expect(component.find('Choices').at(1).props().disabled).to.equal(false)
      })

      it('should enable match button after selects first and second choices', () => {
        const { widget: { settings: { choices1, choicesA } } } = props

        let target
        target = { value: choices1.split(',')[1] }
        component.find('Choices').at(0).simulate('change', { target })

        target = { value: choicesA.split(',')[0] }
        component.find('Choices').at(1).simulate('change', { target })

        expect(component.find('button.match').props().disabled).to.equal(false)
      })

      it('should change combined state to true after match button is clicked', () => {
        const { widget: { settings: { choices1, choicesA } } } = props
        component.setState({
          selectedChoice1: choices1.split(',')[2],
          selectedChoiceA: choicesA.split(',')[1]
        })
        spy.setState = sandbox.spy(MatchWidget.prototype, 'setState')
        component.find('button.match').simulate('click')
        expect(spy.setState.called).to.be.true
        expect(spy.setState.calledWith({ combined: true })).to.be.true
      })

      it('should enable edit overlay block when mouseEnter', () => {
        component.simulate('mouseEnter')
        expect(component.find(''))
      })

      it('should render default list when settings choices1 or choicesA undefined', () => {
        component.setProps({ widget: { settings: {} } })
        expect(component).to.be.ok
      })
    })
  })

  describe('#redirectTo', () => {
    context('when overlay widget was clicked and it is editable', () => {
      before(() => {
        component.find('OverlayWidget').simulate('click')
      })

      it('should call transitionTo', () => {
        expect(mockContext.router.transitionTo.calledOnce).to.equal(true)
      })

      it('should transitionTo called with correct params', () => {
        const { mobilization, widget } = props
        const path = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
        expect(mockContext.router.transitionTo.calledWith(path)).to.equal(true)
      })
    })
  })

  describe('#renderShareButtons', () => {
    it('should render one <TellAFriend> component if choices it is combined', () => {
      component.setState({ combined: true })
      expect(component.find('TellAFriend')).to.have.length(1)
    })

    it('should render goal_image when match choices', () => {
      const match = props.widget.match_list[0]
      component.setState({ combined: true, selectedChoice1: match.first_choice, selectedChoiceA: match.second_choice})
      expect(component.find('TellAFriend').at(0).props().imageUrl).to.equal(match.goal_image)
    })
  })
})
