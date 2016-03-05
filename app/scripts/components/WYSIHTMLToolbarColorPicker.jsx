import React from 'react'
import ColorSchemer from './Editor/ColorSchemer.jsx'

export default class WYSIHTMLToolbarColorPicker extends React.Component {
  constructor() {
    super()
    this.state = { color: "#000000" }
  }
  handleChange(color) {
    this.setState({ color: color })
  }

  render(){
    return(
      <div data-wysihtml5-dialog="foreColorStyle"
        style={{
          display: "none",
          top: "36px",
          right: "105px"
        }}
        className="white p2 absolute">
        <input
          type="text"
          data-wysihtml5-dialog-field="color"
          value={ this.state.color }
          onChange={ ::this.handleChange }
          className="hide" />
        <ColorSchemer onChange={ ::this.handleChange } />
        <div className="save-button bg-gray p1">
          <a data-wysihtml5-dialog-action="save" className="button block center bg-aqua">APLICAR COR</a>
        </div>
      </div>
    )
  }
}
