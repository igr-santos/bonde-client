import { connect } from 'react-redux'
import { asyncUpdateWidget as update } from '../action-creators'
import Widget from './widget'

const mapStateToProps = (state, props) => ({
 saving: state.widgets.saving,
})

const mapActionsToProps = { update }

export default connect(mapStateToProps, mapActionsToProps)(Widget)
