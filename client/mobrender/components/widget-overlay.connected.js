import { connect } from 'react-redux'
import WidgetOverlay from './widget-overlay'
import Selectors from '../redux/selectors'
import {
  handleMouseOver as onMouseOver,
  handleMouseOut as onMouseOut
} from '../redux/action-creators'

const mapStateToProps = (state, props) => ({
  hasMouseOver: Selectors(state, props).widgetHasMouseOver()
})

const mapActionsToProps = { onMouseOver, onMouseOut }

export default connect(mapStateToProps, mapActionsToProps)(WidgetOverlay)
