import React, { Component, PropTypes } from 'react'

import * as Paths from './../../Paths'
import { OverlayWidget } from '../OverlayWidget'
import { TellAFriend } from './../'
import Choices from './Choices'

class MatchWidget extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      numberSelected: undefined,
      letterSelected: undefined,
      combined: false,
    }
  }

  redirectTo(e) {
    const { mobilization, widget, editable } = this.props
    if (e) e.preventDefault()
    if (editable) {
      this.context.router.transitionTo(
        Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
      )
    }
  }

  handleCombineClick(e) {
    if (e) e.preventDefault()
    this.setState({ combined: true })
  }

  renderChoices() {
    const { selectedChoice1, selectedChoiceA } = this.state
    const { editable, loading } = this.props
    const { widget: { settings: {
        title_text,
        labelChoices1,
        labelChoicesA,
        choices1,
        choicesA
      } }
    } = this.props
    const optionsChoices1 = choices1 ? choices1.split(',') : []
    const optionsChoicesA = choicesA ? choicesA.split(',') : []

    return (
      <OverlayWidget editable={editable} onClick={::this.redirectTo}>
        <div className="match-widget p3 bg-darken-3 relative">
          <h2 className="mt0 mb3 center">{title_text}</h2>
          <Choices
            title={labelChoices1}
            selected={this.state.numberSelected}
            options={optionsChoices1}
            disabled={false}
            onChange={(option) => {
              this.setState({ selectedChoice1: option.target.value })
            }}
            classNames={['mb2']}
          />
          <Choices
            { ...this.props }
            title={labelChoicesA}
            selected={this.state.letterSelected}
            options={optionsChoicesA}
            disabled={!(selectedChoice1)}
            onChange={(option) => {
              this.setState({ selectedChoiceA: option.target.value })
            }}
            classNames={['mb2']}
          />
          <button
            className="match caps button bg-darken-4 p2 full-width mt1 mb2"
            onClick={::this.handleCombineClick}
            disabled={loading || !(selectedChoice1 && selectedChoiceA)}>
            {loading ? 'Combinando...' : 'Combinar' }
          </button>
        </div>
      </OverlayWidget>
    )
  }

  findMatchItem() {
    const { widget } = this.props
    const matchList = widget.match_list.filter((match) => {
      return match.first_choice === this.state.selectedChoice1 && match.second_choice === this.state.selectedChoiceA
    })
    if (matchList && matchList.length > 0) {
      return matchList[0]
    }
  }

  renderShareButtons() {
    ////
    // @todo
    // - talvez prop `message` configurável?
    // - injetar caminho da imagem da combinação de acordo com as opções
    //   selecionadas (selectedChoice1 + selectedChoiceA).
    ////
    const matchItem = this.findMatchItem()
    let combinationImageUrl = 'https://s3.amazonaws.com/hub-central-dev/uploads/1467831827_nossascidades.jpg'
    if (matchItem) {
      combinationImageUrl = matchItem.goal_image
    }
    const { selectedChoice1, selectedChoiceA } = this.state
    return <TellAFriend {...this.props}
      message="Resultado da sua combinação"
      href={combinationImageUrl}
      imageUrl={combinationImageUrl}
      imageWidth="100%" />
  }

  render() {
    const { combined } = this.state
    return (
      <div>
        { combined ? this.renderShareButtons() : this.renderChoices() }
      </div>
    )
  }
}

MatchWidget.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

MatchWidget.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default MatchWidget
