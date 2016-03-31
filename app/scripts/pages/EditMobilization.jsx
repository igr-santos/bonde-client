import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Block, Loading, Navbar } from './../components'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from '../Paths'
import { connect } from 'react-redux'
import { fetchWidgets } from './../reducers/widgets'

@connect(state => ({
  scrolledToBottom: false,
  widgetsCount: state.widgets.length,
  mobilizationEditor: state.mobilizationEditor
}))

@reactMixin.decorate(Navigation)

export default class EditMobilization extends Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolledToBottom: props.scrolledToBottom,
      widgetsCount: props.widgetsCount
    }
  }

  componentDidMount() {
    const {dispatch, mobilization} = this.props
    dispatch(fetchWidgets({mobilization_id: mobilization.id}))
  }

  componentDidUpdate() {
    const { mobilization, blocks, widgets } = this.props
    if (!this.newBlock() && blocks.data.length === 0 && blocks.loaded === true) {
      this.transitionTo(Paths.newMobilizationBlock(mobilization.id))
    }
    if (!this.state.scrolledToBottom &&
        this.newBlock() &&
        blocks.data.length > 0 &&
        widgets.data.length > 0 &&
        widgets.data.length > this.state.widgetsCount
        ) {
      window.scrollTo(0, document.body.scrollHeight)
      this.setState({scrolledToBottom: true})
    }
  }

  newBlock() {
    const {location} = this.props
    return location.query && location.query.newBlock && location.query.newBlock === 'true'
  }

  renderBlocks() {
    const { mobilization, blocks, mobilizationEditor } = this.props
    const { color_scheme: colorScheme } = mobilization

    return (
      <div className={classnames(colorScheme, 'flex flex-column flex-auto relative')}>
        {
          !mobilizationEditor.isEditingBlock
            && <Navbar {...this.props} editable />
        }
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {
            blocks.data.map(function(block, index) {
              return (
                <Block
                  {...this.props}
                  key={'block-' + block.id}
                  block={block}
                  canMoveUp={index !== 0}
                  canMoveDown={index !== blocks.length - 1}
                  editable
                />
              )
            }.bind(this))
          }
        </div>
      </div>
    )
  }

  renderLoader() {
    return <Loading />
  }

  render() {
    return this.props.blocks.loaded === true
      ? this.renderBlocks()
      : this.renderLoader()
  }
}
