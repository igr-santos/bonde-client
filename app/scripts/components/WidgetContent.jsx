import React from 'react'
import WYSIHTMLToolbar from './../components/WYSIHTMLToolbar.jsx'
import classnames from 'classnames'

export default class WidgetContent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      editor: null,
      content: (props.widget.settings ? props.widget.settings.content : 'Clique para editar...'),
      toolbarId: "wysihtml5-toolbar-" + this.props.widget.id
    }
  }

  componentDidMount() {
    const editor = new wysihtml5.Editor(
      React.findDOMNode(this.refs.content), {
        toolbar: this.state.toolbarId,
        parserRules: wysihtml5ParserRules
      }
    ).on("focus", ::this.handleEditorFocus)
    this.setState({editor: editor})
  }

  handleEditorFocus(){
    this.setState({editing: true})
  }

  handleOverlayClick(){
    if(this.hasChanged()){
      if(confirm("Você deseja salvar suas alterações?")){
        this.save()
      } else {
        this.state.editor.setValue(this.state.content)
      }
    }
    this.setState({editing: false})
  }

  save(){
    this.setState({
      content: this.state.editor.getValue(),
      editing: false
    })
    // TODO: call editWidget action
  }

  hasChanged(){
    return this.state.content != this.state.editor.getValue()
  }

  render(){
    const { toolbarId, editing } = this.state
    return (
      <div>
        <div className={classnames("full-width", {"display-none": !editing})}>
          <WYSIHTMLToolbar
            elementId={toolbarId}
            className="absolute full-width top-0 left-0 bg-silver"
            style={{zIndex: 9999}}/>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleOverlayClick}
            style={{zIndex: 9998}} />
        </div>
        <div style={{zIndex: editing ? 9999 : 0}} className="relative">
          <div
            className="widget"
            dangerouslySetInnerHTML={{__html: this.state.content}}
            ref="content" />
          <div className={classnames("right", {"display-none": !editing})}>
            <button
              onClick={::this.save}
              className="button button-transparent bg-silver rounded">
                <i className="fa fa-cloud-upload mr1" />
                Salvar
              </button>
          </div>
        </div>
      </div>
    )
  }
}
