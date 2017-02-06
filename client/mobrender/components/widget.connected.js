import { connect } from 'react-redux'
import { asyncUpdateWidget, handleMouseOver, handleMouseOut } from '../action-creators'
import Widget from './widget'

const mapStateToProps = (state, props) => ({
 saving: state.widgets.saving,
 hasMouseOver: state.widgets.overId === props.widget.id
})

const mapActionsToProps = {
  update: asyncUpdateWidget,
  onMouseOver: handleMouseOver,
  onMouseOut: handleMouseOut
}

export default connect(mapStateToProps, mapActionsToProps)(Widget)
